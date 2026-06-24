import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from "./settings";

describe("saved settings", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
      clear: () => values.clear(),
      key: (index: number) => [...values.keys()][index] ?? null,
      get length() {
        return values.size;
      },
    });
  });

  it("restores a valid saved configuration", () => {
    saveSettings({
      players: 7,
      impostors: 2,
      impostorClueMode: "similar",
      wordDifficulty: "hard",
      roundDuration: 180,
      avoidRecentWords: false,
      contentMode: "adult",
      selectedCategories: ["lugares", "deportes"],
      customPlayerNames: ["Hugo", "Ana", ...Array.from({ length: 12 }, () => "")],
    });

    const settings = loadSettings();

    expect(settings).toMatchObject({
      players: 7,
      impostors: 2,
      impostorClueMode: "similar",
      wordDifficulty: "hard",
      roundDuration: 180,
      avoidRecentWords: false,
      contentMode: "adult",
      selectedCategories: ["lugares", "deportes"],
    });
    expect(settings.customPlayerNames.slice(0, 2)).toEqual(["Hugo", "Ana"]);
  });

  it("falls back safely when saved data is invalid", () => {
    localStorage.setItem("impostor-settings-v1", "{not valid json");

    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it("discards categories that no longer exist", () => {
    localStorage.setItem(
      "impostor-settings-v1",
      JSON.stringify({
        players: 4,
        impostors: 1,
        impostorClueMode: "hint",
        selectedCategories: ["inventada", "comida"],
        customPlayerNames: [],
      }),
    );

    expect(loadSettings().selectedCategories).toEqual(["comida"]);
  });

  it("migrates the old impostor hint toggle", () => {
    localStorage.setItem(
      "impostor-settings-v1",
      JSON.stringify({
        players: 5,
        impostors: 1,
        impostorHintsEnabled: false,
        selectedCategories: ["comida"],
        customPlayerNames: [],
      }),
    );

    expect(loadSettings().impostorClueMode).toBe("none");
  });
});
