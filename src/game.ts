export type Category = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  words: string[];
};

export type Round = {
  category: Category;
  word: string;
  impostorIndexes: number[];
  startingPlayer: number;
};

export const categories: Category[] = [
  {
    id: "comida",
    name: "Comida",
    emoji: "🍕",
    color: "#f46b35",
    description: "Platos, ingredientes y antojos",
    words: ["Paella", "Croqueta", "Sushi", "Tortilla", "Hamburguesa", "Gazpacho", "Pizza", "Ramen", "Churros", "Lasaña", "Tacos", "Ceviche", "Curry", "Falafel", "Risotto", "Empanada", "Kebab", "Brownie", "Nachos", "Burrito", "Albóndigas", "Guacamole", "Macarrones", "Donut", "Ensaladilla", "Fabada", "Helado", "Hummus", "Migas", "Pancakes", "Pisto", "Salmorejo", "Sandwich", "Tiramisú", "Crepes", "Fondue", "Gofre", "Fajitas", "Moussaka", "Nuggets", "Perrito caliente", "Pulpo a la gallega", "Quiche", "Tarta de queso", "Tempura", "Bacalao", "Flan", "Mermelada", "Aceitunas", "Palomitas"],
  },
  {
    id: "animales",
    name: "Animales",
    emoji: "🦊",
    color: "#e89c32",
    description: "De la granja al fondo del mar",
    words: ["Delfín", "Jirafa", "Pingüino", "Camaleón", "Pulpo", "Canguro", "Erizo", "Flamenco", "Ornitorrinco", "Koala", "Tiburón", "Mapache", "Nutria", "Panda", "Avestruz", "Perezoso", "Rinoceronte", "Medusa", "Suricata", "Búho", "Águila", "Alpaca", "Ardilla", "Ballena", "Caballito de mar", "Capibara", "Caracol", "Castor", "Cebra", "Cocodrilo", "Elefante", "Foca", "Gorila", "Hipopótamo", "Hormiga", "Iguana", "Leopardo", "Lobo", "Loro", "Mantis religiosa", "Mariquita", "Murciélago", "Pavo real", "Rana", "Tortuga", "Zorro", "Escorpión", "Morsa", "Cangrejo", "Chimpancé"],
  },
  {
    id: "cine",
    name: "Cine y series",
    emoji: "🎬",
    color: "#9f72df",
    description: "Personajes, películas y televisión",
    words: ["Titanic", "Shrek", "Gladiator", "Matrix", "Barbie", "Rocky", "Avatar", "Batman", "Frozen", "Friends", "Coco", "Joker", "Narcos", "Wednesday", "Toy Story", "Los Simpson", "Stranger Things", "Jurassic Park", "Harry Potter", "Star Wars", "El Rey León", "Regreso al futuro", "La Casa de Papel", "Juego de Tronos", "Breaking Bad", "Los Vengadores", "Buscando a Nemo", "El Padrino", "E.T.", "Forrest Gump", "Indiana Jones", "Kill Bill", "La Sirenita", "Miércoles", "Monstruos S.A.", "Piratas del Caribe", "Ratatouille", "Sherlock", "Superman", "Terminator", "The Office", "Up", "WALL-E", "Los Cazafantasmas", "El Señor de los Anillos", "Deadpool", "Grease", "La Máscara", "Marte", "Peaky Blinders"],
  },
  {
    id: "lugares",
    name: "Lugares",
    emoji: "🌍",
    color: "#3c9d79",
    description: "Países, ciudades y rincones",
    words: ["París", "Desierto", "Nueva York", "Pirámide", "Tokio", "Amazonas", "Venecia", "Islandia", "Sahara", "Londres", "Machu Picchu", "Ámsterdam", "Caribe", "Alpes", "Roma", "Santorini", "Australia", "Barcelona", "Tailandia", "Las Vegas", "Antártida", "Bali", "Berlín", "Biblioteca", "Bosque", "Cámping", "Cancún", "Cataratas del Niágara", "China", "Coliseo", "Estadio", "Groenlandia", "Hawái", "Hospital", "Ibiza", "India", "Isla desierta", "La Alhambra", "Madrid", "Marte", "Monte Everest", "Museo", "Playa", "Polo Norte", "Praga", "Río de Janeiro", "Sabana", "Selva", "Sídney", "Torre Eiffel"],
  },
  {
    id: "objetos",
    name: "Objetos",
    emoji: "💡",
    color: "#e8bf3f",
    description: "Cosas cotidianas, más o menos",
    words: ["Paraguas", "Brújula", "Tostadora", "Martillo", "Mochila", "Espejo", "Semáforo", "Sacacorchos", "Linterna", "Reloj", "Cremallera", "Prismáticos", "Extintor", "Imán", "Termómetro", "Candado", "Telescopio", "Altavoz", "Ventilador", "Balanza", "Abrelatas", "Auriculares", "Batería", "Bolígrafo", "Calculadora", "Cámara", "Cepillo de dientes", "Colador", "Cometa", "Destornillador", "Enchufe", "Escoba", "Gafas de sol", "Grapadora", "Hucha", "Lámpara", "Maleta", "Micrófono", "Nevera", "Percha", "Piano", "Plancha", "Radiador", "Regadera", "Secador", "Silla", "Tijeras", "Trípode", "Walkie-talkie", "Zapatilla"],
  },
  {
    id: "profesiones",
    name: "Profesiones",
    emoji: "🧑‍🚀",
    color: "#478bc4",
    description: "Trabajos conocidos y curiosos",
    words: ["Astronauta", "Bombero", "Dentista", "Detective", "Chef", "Arquitecto", "Piloto", "Veterinario", "Fotógrafo", "Socorrista", "Juez", "Periodista", "Carpintero", "Cirujano", "Mago", "Arqueólogo", "Actor", "Jardinero", "Científico", "Guía turístico", "Abogado", "Árbitro", "Azafata", "Bibliotecario", "Camarero", "Cantante", "Carnicero", "Cartero", "Conductor", "Diseñador", "Electricista", "Entrenador", "Enfermero", "Escritor", "Farmacéutico", "Fontanero", "Forense", "Guardabosques", "Ingeniero", "Locutor", "Maestro", "Mecánico", "Meteorólogo", "Peluquero", "Policía", "Programador", "Psicólogo", "Taxista", "Traductor", "Youtuber"],
  },
  {
    id: "deportes",
    name: "Deportes",
    emoji: "🏀",
    color: "#dc574d",
    description: "Juegos, atletas y competición",
    words: ["Fútbol", "Tenis", "Baloncesto", "Surf", "Boxeo", "Ciclismo", "Esquí", "Voleibol", "Golf", "Rugby", "Patinaje", "Natación", "Escalada", "Béisbol", "Atletismo", "Pádel", "Karate", "Hockey", "Gimnasia", "Piragüismo", "Bádminton", "Balonmano", "Bolos", "Buceo", "Crossfit", "Dardos", "Esgrima", "Fórmula 1", "Fútbol americano", "Hípica", "Judo", "Motociclismo", "Paracaidismo", "Parkour", "Ping-pong", "Remo", "Salto de trampolín", "Skate", "Snowboard", "Squash", "Taekwondo", "Tiro con arco", "Triatlón", "Waterpolo", "Windsurf", "Ajedrez", "Billar", "Maratón", "Lucha libre", "Curling"],
  },
  {
    id: "fiesta",
    name: "Fiesta",
    emoji: "🎉",
    color: "#d4579d",
    description: "Para grupos con ganas de lío",
    words: ["Karaoke", "Discoteca", "Confeti", "Resaca", "Cumpleaños", "Festival", "Boda", "Champán", "Disfraz", "DJ", "Photocall", "Verbena", "Piñata", "Cóctel", "Globo", "Despedida", "Concierto", "Fuegos artificiales", "Brindis", "After", "Altavoz", "Amigo invisible", "Barra libre", "Bengala", "Bingo", "Cabalgata", "Campanadas", "Carnaval", "Cena de empresa", "Chupito", "Cotillón", "Cumpleaños sorpresa", "Decoración", "Entrada VIP", "Espuma", "Fiesta de pijamas", "Guirnalda", "Invitación", "Luces de neón", "Madrugada", "Nochevieja", "Pista de baile", "Ponche", "Pulsera", "Regalo", "Reunión", "Serpentina", "Tarta", "Terraza", "Vacaciones"],
  },
  {
    id: "musica",
    name: "Música",
    emoji: "🎵",
    color: "#ef4f91",
    description: "Artistas, canciones e instrumentos",
    words: [
      "Adele", "Aitana", "Alejandro Sanz", "Bad Bunny", "Beyoncé", "Billie Eilish",
      "Bizarrap", "Bruno Mars", "C. Tangana", "Coldplay", "Dua Lipa", "Ed Sheeran",
      "Elton John", "Estopa", "Freddie Mercury", "Imagine Dragons", "Karol G",
      "La Oreja de Van Gogh", "Lady Gaga", "Lola Índigo", "Maluma", "Maná",
      "Michael Jackson", "Miley Cyrus", "Pablo Alborán", "Quevedo", "Queen",
      "Rauw Alejandro", "Rihanna", "Rosalía", "Shakira", "Taylor Swift", "The Beatles",
      "The Weeknd", "U2", "Viva la Vida", "Despacito", "Bohemian Rhapsody",
      "Macarena", "Aserejé", "Bailando", "Mediterráneo", "La Bachata", "Tusa",
      "Guitarra", "Piano", "Batería", "Violín", "Saxofón", "Trompeta", "Flauta",
      "Ukelele", "Arpa", "Acordeón", "Micrófono", "Vinilo", "Festival", "Karaoke",
      "Orquesta", "Reguetón",
    ],
  },
  {
    id: "videojuegos",
    name: "Videojuegos",
    emoji: "🎮",
    color: "#7357e6",
    description: "Juegos, personajes, consolas y objetos",
    words: [
      "Minecraft", "Fortnite", "Grand Theft Auto", "Mario Kart", "Pokémon",
      "The Legend of Zelda", "The Last of Us", "God of War", "FIFA", "Among Us",
      "Animal Crossing", "Call of Duty", "Clash Royale", "League of Legends",
      "Valorant", "Roblox", "The Sims", "Fall Guys", "Rocket League", "Tetris",
      "Sonic", "Pac-Man", "Street Fighter", "Red Dead Redemption", "Resident Evil",
      "Assassin's Creed", "Elden Ring", "Hogwarts Legacy", "Candy Crush", "Wii Sports",
      "Super Mario", "Pikachu", "Link", "Kratos", "Lara Croft", "Master Chief",
      "Steve", "Creeper", "Peach", "Bowser", "Kirby", "Donkey Kong", "Crash Bandicoot",
      "PlayStation", "Xbox", "Nintendo Switch", "Game Boy", "Steam Deck", "Mando",
      "Joystick", "Poción", "Espada legendaria", "Cofre", "Moneda", "Checkpoint",
      "Vida extra", "Pantalla de carga", "Jefe final", "Modo multijugador", "Respawn",
    ],
  },
  {
    id: "famosos",
    name: "Famosos",
    emoji: "🌟",
    color: "#e8ae35",
    description: "Actores, deportistas y celebridades",
    words: [
      "Angelina Jolie", "Antonio Banderas", "Brad Pitt", "Chris Hemsworth",
      "Dwayne Johnson", "Emma Stone", "George Clooney", "Jennifer Aniston",
      "Jennifer Lawrence", "Johnny Depp", "Julia Roberts", "Leonardo DiCaprio",
      "Margot Robbie", "Morgan Freeman", "Penélope Cruz", "Pedro Pascal",
      "Ryan Gosling", "Scarlett Johansson", "Tom Cruise", "Tom Holland",
      "Will Smith", "Zendaya", "Cristiano Ronaldo", "Kylian Mbappé", "Leo Messi",
      "Luka Modrić", "Michael Jordan", "Nadal", "Neymar", "Pau Gasol",
      "Roger Federer", "Serena Williams", "Fernando Alonso", "Carlos Alcaraz",
      "Simone Biles", "Lewis Hamilton", "David Beckham", "Usain Bolt",
      "Kim Kardashian", "Paris Hilton", "Oprah Winfrey", "Gordon Ramsay",
      "David Broncano", "Pablo Motos", "Belén Esteban", "Jordi Évole",
      "Chenoa", "Georgina Rodríguez", "Tamara Falcó", "Alaska", "Risto Mejide",
      "Anne Igartiburu", "Jesús Calleja", "Arturo Valls", "Eva Hache",
      "Santiago Segura", "Mario Casas", "Úrsula Corberó", "Ester Expósito",
      "Miguel Ángel Silvestre",
    ],
  },
  {
    id: "internet",
    name: "Internet",
    emoji: "📱",
    color: "#35a7d8",
    description: "Creadores, streamers, redes y memes",
    words: [
      "Ibai Llanos", "El Rubius", "AuronPlay", "TheGrefg", "IlloJuan", "Mikecrack",
      "DjMaRiiO", "Cristinini", "Rivers", "Gemita", "Xokas", "Nil Ojeda", "Masi",
      "Mister Jägger", "Alexby", "Willyrex", "Vegetta777", "Luzu", "Juan Guarnizo",
      "Ari Gameplays", "Spreen", "Coscu", "WestCOL", "Nimu", "El Mariana",
      "MrBeast", "IShowSpeed", "Kai Cenat", "Ninja", "Pokimane", "xQc",
      "Charli D'Amelio", "Khaby Lame", "Dulceida", "María Pombo", "Lola Lolita",
      "TikTok", "Twitch", "YouTube", "Instagram", "Discord", "Podcast", "Directo",
      "Suscriptor", "Unboxing", "Tutorial", "Story time", "Challenge", "Selfie",
      "Hashtag", "Meme", "Hilo", "Troleo", "Stalkear", "Cringe", "Rizz",
      "NPC", "POV", "F en el chat", "Se tenía que decir",
    ],
  },
  {
    id: "marcas",
    name: "Marcas",
    emoji: "🏷️",
    color: "#e65f4c",
    description: "Logos y nombres que ves cada día",
    words: [
      "Adidas", "Amazon", "Apple", "Balenciaga", "BMW", "Burger King", "Carrefour",
      "Cartier", "Chanel", "Coca-Cola", "Converse", "Decathlon", "Disney",
      "Domino's Pizza", "Doritos", "Ferrari", "Figma", "Ford", "Google", "Gucci",
      "H&M", "Haribo", "HBO", "IKEA", "Instagram", "Lacoste", "Lego", "Levi's",
      "Lidl", "Louis Vuitton", "McDonald's", "Mercedes-Benz", "Microsoft",
      "Netflix", "New Balance", "Nike", "Nintendo", "Nivea", "Nutella", "Oreo",
      "Pepsi", "PlayStation", "Pringles", "Pull&Bear", "Puma", "Red Bull",
      "Rolex", "Samsung", "Seat", "Shein", "Spotify", "Starbucks", "Tesla",
      "TikTok", "Toyota", "Vans", "WhatsApp", "Xiaomi", "Zara", "YouTube",
    ],
  },
  {
    id: "personajes",
    name: "Personajes ficticios",
    emoji: "🦸",
    color: "#cf594f",
    description: "Héroes, dibujos y leyendas de ficción",
    words: [
      "Aladdín", "Alicia", "Ariel", "Astérix", "Batman", "Buzz Lightyear",
      "Capitán América", "Cenicienta", "Darth Vader", "Doraemon", "Drácula",
      "Elsa", "Gandalf", "Garfield", "Goku", "Hannibal Lecter", "Harley Quinn",
      "Harry Potter", "Hello Kitty", "Hércules", "Homer Simpson", "Indiana Jones",
      "Iron Man", "Jack Sparrow", "James Bond", "Joker", "Katniss Everdeen",
      "King Kong", "Lara Croft", "Luke Skywalker", "Mafalda", "Mario", "Mary Poppins",
      "Mickey Mouse", "Mortadelo", "Mulan", "Naruto", "Obélix", "Peter Pan",
      "Pikachu", "Pinocho", "Rapunzel", "Robin Hood", "Scooby-Doo", "Sherlock Holmes",
      "Shrek", "Simba", "Snoopy", "Sonic", "Spider-Man", "Superman", "Tarzán",
      "Thor", "Tintín", "Totoro", "Voldemort", "Wally", "Winnie the Pooh",
      "Wonder Woman", "Yoda",
    ],
  },
  {
    id: "tecnologia",
    name: "Tecnología",
    emoji: "💻",
    color: "#4b91ca",
    description: "Apps, dispositivos y vida digital",
    words: [
      "AirDrop", "AirPods", "Algoritmo", "Altavoz inteligente", "Android",
      "Aplicación", "Asistente virtual", "Bluetooth", "Cargador", "Código QR",
      "Contraseña", "Cookie", "Copia de seguridad", "Correo electrónico", "Dron",
      "Emoji", "Escáner", "Fibra óptica", "Filtro", "GPS", "Hashtag", "Impresora 3D",
      "Inteligencia artificial", "iPhone", "Modo avión", "Nube", "Pantalla táctil",
      "Pendrive", "Podcast", "Portátil", "Realidad virtual", "Reconocimiento facial",
      "Robot", "Router", "Smartwatch", "Streaming", "Tablet", "Videollamada", "Wifi",
      "Wikipedia", "WhatsApp", "Google Maps", "ChatGPT", "Spotify", "Netflix",
      "TikTok", "Twitch", "YouTube", "Instagram", "Zoom", "Captcha", "Memoria USB",
      "Batería externa", "Ciberataque", "Código de barras", "Modo oscuro",
      "Notificación", "Captura de pantalla", "Actualización", "Autocorrector",
    ],
  },
  {
    id: "espana",
    name: "España",
    emoji: "🇪🇸",
    color: "#d74d45",
    description: "Lugares, costumbres y cultura popular",
    words: [
      "Alhambra", "Andalucía", "Barcelona", "Benidorm", "Bilbao", "Camino de Santiago",
      "Canarias", "Cibeles", "Costa del Sol", "El Retiro", "Galicia", "Gran Vía",
      "Ibiza", "La Manga", "Madrid", "Mallorca", "Museo del Prado", "País Vasco",
      "Plaza Mayor", "Puerta del Sol", "Sagrada Familia", "Salamanca", "San Sebastián",
      "Sevilla", "Sierra Nevada", "Toledo", "Valencia", "Zaragoza", "Chiringuito",
      "Feria de Abril", "Flamenco", "Fallas", "San Fermín", "Semana Santa",
      "Sobremesa", "Siesta", "Tapas", "Vermú", "Verbena", "Campanadas", "Cabalgata",
      "Paella", "Tortilla de patatas", "Jamón", "Churros", "Gazpacho", "Croqueta",
      "Rosalía", "Almodóvar", "Lola Flores", "Paco de Lucía", "Camarón",
      "Don Quijote", "El Cid", "Las Meninas", "La Roja", "Eurovisión", "AVE",
      "Mercadona", "Estanco",
    ],
  },
  {
    id: "nostalgia",
    name: "Nostalgia",
    emoji: "📼",
    color: "#9a72c7",
    description: "Dibujos, juguetes y recuerdos de los 90/2000",
    words: [
      "Action Man", "Beyblade", "Bollycao", "Boomerang", "Bratz", "Buzz Lightyear",
      "Caballeros del Zodiaco", "Canicas", "Casete", "Chiquipark", "Ciber", "Digimon",
      "Discman", "Dragon Ball", "El Príncipe de Bel-Air", "Furby", "Game Boy",
      "Gormiti", "Harry Potter", "Hot Wheels", "Messenger", "Mighty Max", "MP3",
      "Nokia 3310", "Operación Triunfo", "Pokémon", "Power Rangers", "Recreativos",
      "Reproductor VHS", "Sailor Moon", "Scalextric", "Sims", "Sony Ericsson",
      "Super Mario", "Tamagotchi", "Tazos", "Tetris", "Toy Story", "Tuenti",
      "Walkman", "Wii", "Windows XP", "Yu-Gi-Oh!", "Yo-yo", "Barbie", "Chupa Chups",
      "Club Penguin", "Código Lyoko", "Doraemon", "Fotolog", "High School Musical",
      "Los Serrano", "Mocos locos", "Nintendogs", "Patito Feo", "Polly Pocket",
      "Rebelde Way", "Snake", "Trolls de colores", "Wacky Races",
    ],
  },
];

const HISTORY_KEY = "impostor-word-history";

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function getHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function saveHistory(history: string[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // El historial es una mejora, nunca debe impedir que empiece una partida.
  }
}

function shuffledIndexes(length: number): number[] {
  const indexes = Array.from({ length }, (_, index) => index);

  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [indexes[index], indexes[swapIndex]] = [indexes[swapIndex], indexes[index]];
  }

  return indexes;
}

export function createRound(
  selectedCategoryIds: string[],
  playerCount: number,
  impostorCount: number,
): Round {
  const availableCategories = categories.filter((category) =>
    selectedCategoryIds.includes(category.id),
  );
  const category = randomItem(
    availableCategories.length ? availableCategories : categories,
  );

  const history = getHistory();
  const freshWords = category.words.filter(
    (word) => !history.includes(`${category.id}:${word}`),
  );
  const word = randomItem(freshWords.length ? freshWords : category.words);
  const updatedHistory = [...history, `${category.id}:${word}`].slice(-240);
  saveHistory(updatedHistory);

  const impostorIndexes = shuffledIndexes(playerCount).slice(0, impostorCount);

  return {
    category,
    word,
    impostorIndexes,
    startingPlayer: Math.floor(Math.random() * playerCount),
  };
}
