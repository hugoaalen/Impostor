import { categories } from "./game";

export type GameSettings = {
  players: number;
  impostors: number;
  selectedCategories: string[];
  customPlayerNames: string[];
};

export const DEFAULT_SETTINGS: GameSettings = {
  players: 5,
  impostors: 1,
  selectedCategories: ["comida", "animales", "cine"],
  customPlayerNames: Array.from({ length: 14 }, () => ""),
};

const SETTINGS_KEY = "impostor-settings-v1";

export function loadSettings(): GameSettings {
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "{}") as Partial<GameSettings>;
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
