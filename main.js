// Importar Firebase desde CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, set, onValue, update, remove, onDisconnect } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBwhu1ADnzo1SuZnh5RpKU-sRb2ySmhfbs",
    authDomain: "impostor-434e5.firebaseapp.com",
    databaseURL: "https://impostor-434e5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "impostor-434e5",
    storageBucket: "impostor-434e5.firebasestorage.app",
    messagingSenderId: "756952455092",
    appId: "1:756952455092:web:9c7f714efb88cd615b84e1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Estado global
let currentRoom = null;
let currentPlayer = null;
let isHost = false;
let debateTimer = null;

// Utilidades
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    if (screenId === 'screen-debate') {
        startDebateTimer();
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function calculateImpostors(playerCount) {
    if (playerCount <= 4) return 1;
    if (playerCount <= 7) return 2;
    return 3;
}

// Exponer funciones globalmente
window.showCreateRoom = function() {
    showScreen('screen-create');
};

window.showJoinRoom = function() {
    showScreen('screen-join');
};

window.showScreen = showScreen;

// Crear sala
window.createRoom = async function() {
    const name = document.getElementById('host-name').value.trim();
    if (!name) {
        showToast('Por favor ingresa tu nombre');
        return;
    }

    const roomCode = generateRoomCode();
    const playerId = Date.now().toString();

    currentRoom = roomCode;
    currentPlayer = { id: playerId, name, isHost: true };
    isHost = true;

    const roomRef = ref(database, `rooms/${roomCode}`);
    await set(roomRef, {
        host: playerId,
        theme: 'futbolistas',
        customTheme: '',
        state: 'lobby',
        players: {
            [playerId]: { name, isHost: true }
        }
    });

    // Configurar desconexión
    onDisconnect(ref(database, `rooms/${roomCode}/players/${playerId}`)).remove();

    setupRoomListener();
    showLobby();
};

// Unirse a sala
window.joinRoom = async function() {
    const roomCode = document.getElementById('join-code').value.trim().toUpperCase();
    const name = document.getElementById('player-name').value.trim();

    if (!roomCode || !name) {
        showToast('Por favor completa todos los campos');
        return;
    }

    const roomRef = ref(database, `rooms/${roomCode}`);
    
    // Verificar que la sala existe
    const snapshot = await new Promise(resolve => {
        onValue(roomRef, resolve, { onlyOnce: true });
    });

    if (!snapshot.exists()) {
        showToast('Sala no encontrada');
        return;
    }

    const playerId = Date.now().toString();
    currentRoom = roomCode;
    currentPlayer = { id: playerId, name, isHost: false };
    isHost = false;

    await set(ref(database, `rooms/${roomCode}/players/${playerId}`), {
        name,
        isHost: false
    });

    // Configurar desconexión
    onDisconnect(ref(database, `rooms/${roomCode}/players/${playerId}`)).remove();

    setupRoomListener();
    showLobby();
};

// Mostrar lobby
function showLobby() {
    document.getElementById('room-code-display').textContent = currentRoom;
    
    if (isHost) {
        document.getElementById('start-game-btn').style.display = 'block';
        document.getElementById('theme-section').style.display = 'block';
    } else {
        document.getElementById('start-game-btn').style.display = 'none';
        document.getElementById('theme-section').style.display = 'none';
    }

    showScreen('screen-lobby');
}

// Configurar listeners de la sala
function setupRoomListener() {
    const roomRef = ref(database, `rooms/${currentRoom}`);
    
    onValue(roomRef, (snapshot) => {
        const room = snapshot.val();
        if (!room) return;

        // Actualizar lista de jugadores
        const playersList = document.getElementById('players-list');
        playersList.innerHTML = '';
        
        const players = room.players || {};
        let count = 0;
        
        for (const [id, player] of Object.entries(players)) {
            count++;
            const div = document.createElement('div');
            div.className = `player-item ${player.isHost ? 'host' : ''}`;
            div.innerHTML = `
                <span>${player.name}</span>
                ${player.isHost ? '<span class="player-badge">Host</span>' : ''}
            `;
            playersList.appendChild(div);
        }
        
        document.getElementById('player-count').textContent = count;

        // Actualizar tema
        if (room.theme) {
            document.getElementById('theme-select').value = room.theme;
            if (room.theme === 'personalizado') {
                document.getElementById('custom-theme').style.display = 'block';
                document.getElementById('custom-theme').value = room.customTheme || '';
            }
        }

        // Cambiar estado del juego
        if (room.state === 'playing' && room.gameData) {
            assignRoleToPlayer(room.gameData);
        } else if (room.state === 'voting') {
            showVotingScreen(players);
        } else if (room.state === 'results') {
            showResultsScreen(room.results);
        }
    });
}

// Copiar código de sala
window.copyRoomCode = function() {
    navigator.clipboard.writeText(currentRoom);
    showToast('Código copiado al portapapeles');
};

// Actualizar tema
window.updateTheme = async function() {
    const theme = document.getElementById('theme-select').value;
    const customThemeInput = document.getElementById('custom-theme');
    
    if (theme === 'personalizado') {
        customThemeInput.style.display = 'block';
    } else {
        customThemeInput.style.display = 'none';
    }

    await update(ref(database, `rooms/${currentRoom}`), {
        theme,
        customTheme: customThemeInput.value
    });
};

// Iniciar juego
window.startGame = async function() {
    const roomRef = ref(database, `rooms/${currentRoom}`);
    const snapshot = await new Promise(resolve => {
        onValue(roomRef, resolve, { onlyOnce: true });
    });
    
    const room = snapshot.val();
    const players = room.players || {};
    const playerIds = Object.keys(players);
    
    if (playerIds.length < 3) {
        showToast('Se necesitan al menos 3 jugadores');
        return;
    }

    document.getElementById('loading').style.display = 'flex';

    try {
        // Generar palabras con IA
        const theme = room.theme === 'personalizado' ? room.customTheme : room.theme;
        const words = await generateWords(theme);

        // Asignar roles
        const impostorCount = calculateImpostors(playerIds.length);
        const shuffled = [...playerIds].sort(() => Math.random() - 0.5);
        const impostors = shuffled.slice(0, impostorCount);

        const gameData = {};
        playerIds.forEach(id => {
            gameData[id] = {
                role: impostors.includes(id) ? 'impostor' : 'ciudadano',
                word: impostors.includes(id) ? words.palabra_impostor : words.palabra_jugadores
            };
        });

        await update(ref(database, `rooms/${currentRoom}`), {
            state: 'playing',
            gameData,
            words,
            impostors
        });

    } catch (error) {
        console.error('Error al iniciar juego:', error);
        showToast('Error al generar palabras. Intenta de nuevo.');
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
};

// Generar palabras con IA (llamar al servidor backend)
async function generateWords(theme) {
    try {
        const response = await fetch('/api/generate-words', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ theme })
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.fallback) {
            return getFallbackWords(theme);
        }
        
        return data;
    } catch (error) {
        console.error('Error con IA:', error);
        return getFallbackWords(theme);
    }
}

// Palabras de respaldo
function getFallbackWords(theme) {
    const fallbacks = {
        'futbolistas': { palabra_jugadores: 'Messi', palabra_impostor: 'Deportista' },
        'actores': { palabra_jugadores: 'Tom Hanks', palabra_impostor: 'Artista' },
        'comidas': { palabra_jugadores: 'Pizza', palabra_impostor: 'Comida italiana' },
        'famosos': { palabra_jugadores: 'Beyoncé', palabra_impostor: 'Cantante' },
        'animales': { palabra_jugadores: 'León', palabra_impostor: 'Felino' }
    };
    
    return fallbacks[theme] || { palabra_jugadores: 'Cosa', palabra_impostor: 'Objeto' };
}

// Asignar rol al jugador
function assignRoleToPlayer(gameData) {
    const playerData = gameData[currentPlayer.id];
    
    const roleCard = document.getElementById('role-card');
    const roleBadge = document.getElementById('role-badge');
    const wordDisplay = document.getElementById('word-display');

    if (playerData.role === 'impostor') {
        roleBadge.className = 'role-badge impostor';
        roleBadge.textContent = '🎭 IMPOSTOR';
        roleCard.style.background = 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)';
    } else {
        roleBadge.className = 'role-badge ciudadano';
        roleBadge.textContent = '👤 CIUDADANO';
        roleCard.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
    }

    wordDisplay.textContent = playerData.word;
    showScreen('screen-role');
}

// Temporizador de debate
function startDebateTimer() {
    let seconds = 180; // 3 minutos
    const timerDisplay = document.getElementById('timer-display');
    
    if (debateTimer) clearInterval(debateTimer);
    
    debateTimer = setInterval(() => {
        seconds--;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        if (seconds <= 0) {
            clearInterval(debateTimer);
            showToast('¡Tiempo terminado! Procedan a votar');
        }
    }, 1000);
}

// Mostrar votación
window.showVoting = async function() {
    if (isHost) {
        await update(ref(database, `rooms/${currentRoom}`), { state: 'voting' });
    }
    showScreen('screen-voting');
};

function showVotingScreen(players) {
    const votingList = document.getElementById('voting-list');
    votingList.innerHTML = '';

    for (const [id, player] of Object.entries(players)) {
        if (id === currentPlayer.id) continue;

        const button = document.createElement('button');
        button.className = 'vote-button';
        button.textContent = player.name;
        button.onclick = () => vote(id);
        votingList.appendChild(button);
    }

    showScreen('screen-voting');
}

// Votar
async function vote(votedPlayerId) {
    await set(ref(database, `rooms/${currentRoom}/votes/${currentPlayer.id}`), votedPlayerId);
    
    document.querySelectorAll('.vote-button').forEach(btn => btn.classList.remove('voted'));
    event.target.classList.add('voted');
    
    document.getElementById('vote-status').innerHTML = '<strong>✓ Voto registrado</strong>';

    if (isHost) {
        checkAllVoted();
    }
}

// Verificar si todos votaron
async function checkAllVoted() {
    const roomRef = ref(database, `rooms/${currentRoom}`);
    const snapshot = await new Promise(resolve => {
        onValue(roomRef, resolve, { onlyOnce: true });
    });
    
    const room = snapshot.val();
    const playerCount = Object.keys(room.players || {}).length;
    const voteCount = Object.keys(room.votes || {}).length;

    if (voteCount === playerCount) {
        setTimeout(() => calculateResults(room), 2000);
    }
}

// Calcular resultados
async function calculateResults(room) {
    const votes = room.votes || {};
    const voteCounts = {};

    Object.values(votes).forEach(votedId => {
        voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
    });

    let maxVotes = 0;
    let votedOut = null;
    
    for (const [id, count] of Object.entries(voteCounts)) {
        if (count > maxVotes) {
            maxVotes = count;
            votedOut = id;
        }
    }

    const results = {
        votedOut,
        votedPlayer: room.players[votedOut],
        impostors: room.impostors,
        words: room.words,
        votes: voteCounts
    };

    await update(ref(database, `rooms/${currentRoom}`), {
        state: 'results',
        results
    });
}

// Mostrar resultados
function showResultsScreen(results) {
    const resultsContent = document.getElementById('results-content');
    
    const isImpostor = results.impostors.includes(results.votedOut);
    const impostorNames = results.impostors.map(id => 
        results.votedPlayer?.name || 'Desconocido'
    ).join(', ');

    resultsContent.innerHTML = `
        <div class="impostor-reveal">
            🎭 Los impostores eran: ${impostorNames}
        </div>
        <div class="word-reveal">
            <strong>Palabra Ciudadanos:</strong> ${results.words.palabra_jugadores}
        </div>
        <div class="word-reveal">
            <strong>Palabra Impostores:</strong> ${results.words.palabra_impostor}
        </div>
        <div class="word-reveal">
            <strong>Jugador eliminado:</strong> ${results.votedPlayer?.name}
            ${isImpostor ? '✅ (Era impostor)' : '❌ (No era impostor)'}
        </div>
    `;

    showScreen('screen-results');
}

// Jugar otra ronda
window.playAgain = async function() {
    if (isHost) {
        await update(ref(database, `rooms/${currentRoom}`), {
            state: 'lobby',
            gameData: null,
            votes: null,
            results: null
        });
        showLobby();
    } else {
        showToast('Solo el host puede iniciar otra ronda');
    }
};

// Volver al lobby
window.backToLobby = function() {
    if (isHost) {
        playAgain();
    } else {
        showLobby();
    }
};

// Salir de la sala
window.leaveRoom = async function() {
    if (currentRoom && currentPlayer) {
        await remove(ref(database, `rooms/${currentRoom}/players/${currentPlayer.id}`));
        
        if (isHost) {
            await remove(ref(database, `rooms/${currentRoom}`));
        }
    }
    
    currentRoom = null;
    currentPlayer = null;
    isHost = false;
    showScreen('screen-start');
};
