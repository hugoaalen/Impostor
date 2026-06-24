import { categories } from "./game";

export type ImpostorClueMode = "none" | "hint" | "similar";
export type WordDifficulty = "easy" | "normal" | "hard";
export type ContentMode = "family" | "adult";
export type RoundDuration = number;

export type GameSettings = {
  players: number;
  impostors: number;
  impostorClueMode: ImpostorClueMode;
  wordDifficulty: WordDifficulty;
  roundDuration: RoundDuration;
  avoidRecentWords: boolean;
  contentMode: ContentMode;
  selectedCategories: string[];
  customPlayerNames: string[];
};

export const DEFAULT_SETTINGS: GameSettings = {
  players: 5,
  impostors: 1,
  impostorClueMode: "hint",
  wordDifficulty: "normal",
  roundDuration: 0,
  avoidRecentWords: true,
  contentMode: "family",
  selectedCategories: ["comida", "animales", "cine"],
  customPlayerNames: Array.from({ length: 14 }, () => ""),
};

const SETTINGS_KEY = "impostor-settings-v1";

function parseImpostorClueMode(stored: Partial<GameSettings> & { impostorHintsEnabled?: boolean }) {
  if (stored.impostorClueMode === "none" || stored.impostorClueMode === "hint" || stored.impostorClueMode === "similar") {
    return stored.impostorClueMode;
  }

  return stored.impostorHintsEnabled === false ? "none" : DEFAULT_SETTINGS.impostorClueMode;
}

function parseWordDifficulty(value: unknown): WordDifficulty {
  return value === "easy" || value === "hard" ? value : DEFAULT_SETTINGS.wordDifficulty;
}

function parseRoundDuration(value: unknown): RoundDuration {
  const duration = Math.round(Number(value));
  return Number.isFinite(duration)
    ? Math.min(60 * 60, Math.max(0, duration))
    : DEFAULT_SETTINGS.roundDuration;
}

function parseContentMode(value: unknown): ContentMode {
  return value === "adult" ? "adult" : DEFAULT_SETTINGS.contentMode;
}

export function loadSettings(): GameSettings {
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "{}") as Partial<GameSettings> & {
      impostorHintsEnabled?: boolean;
    };
    const players = Math.min(14, Math.max(3, Number(stored.players) || DEFAULT_SETTINGS.players));
    const impostors = Math.min(
      Math.max(1, Number(stored.impostors) || DEFAULT_SETTINGS.impostors),
      players - 2,
    );
    const validCategoryIds = new Set(categories.map((category) => category.id));
    const selectedCategories = Array.isArray(stored.selectedCategories)
      ? stored.selectedCategories.filter(
          (id): id is string => typeof id === "string" && validCategoryIds.has(id),
        )
      : [];
    const storedNames = Array.isArray(stored.customPlayerNames)
      ? stored.customPlayerNames
      : [];
    const customPlayerNames = Array.from({ length: 14 }, (_, index) =>
      typeof storedNames[index] === "string" ? storedNames[index].slice(0, 24) : "",
    );

    return {
      players,
      impostors,
      impostorClueMode: parseImpostorClueMode(stored),
      wordDifficulty: parseWordDifficulty(stored.wordDifficulty),
      roundDuration: parseRoundDuration(stored.roundDuration),
      avoidRecentWords: stored.avoidRecentWords !== false,
      contentMode: parseContentMode(stored.contentMode),
      selectedCategories: selectedCategories.length
        ? selectedCategories
        : DEFAULT_SETTINGS.selectedCategories,
      customPlayerNames,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // La partida sigue funcionando aunque el navegador bloquee almacenamiento.
  }
}
