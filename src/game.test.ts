import { beforeEach, describe, expect, it, vi } from "vitest";
import { categories, createRound } from "./game";

describe("createRound", () => {
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
    localStorage.clear();
  });

  it("creates the requested number of unique impostors", () => {
    const round = createRound(["comida"], 7, 2);

    expect(round.impostorIndexes).toHaveLength(2);
    expect(new Set(round.impostorIndexes).size).toBe(2);
    expect(round.impostorIndexes.every((index) => index >= 0 && index < 7)).toBe(true);
  });

  it("uses only selected categories", () => {
    const round = createRound(["animales"], 5, 1);

    expect(round.category.id).toBe("animales");
    expect(categories.find((category) => category.id === "animales")?.words).toContain(round.word);
  });

  it("stores used words to reduce repetition", () => {
    const round = createRound(["cine"], 5, 1);
    const history = JSON.parse(localStorage.getItem("impostor-word-history") ?? "[]");

    expect(history).toContain(`cine:${round.word}`);
  });

  it("provides a broad catalogue without duplicates inside categories", () => {
    expect(categories).toHaveLength(8);
    expect(categories.every((category) => category.words.length >= 50)).toBe(true);
    expect(
      categories.every(
        (category) =>
          new Set(category.words.map((word) => word.toLocaleLowerCase("es"))).size ===
          category.words.length,
      ),
    ).toBe(true);
  });
});
