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
