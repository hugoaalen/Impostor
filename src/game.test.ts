import { beforeEach, describe, expect, it, vi } from "vitest";
import { categories, createRound, getWordHistorySize, resetWordHistory } from "./game";

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

  it("gives impostors a category hint", () => {
    const round = createRound(["videojuegos"], 5, 1);

    expect(round.impostorHint).toContain("gaming");
  });

  it("can give impostors a similar word", () => {
    const round = createRound(["comida"], 5, 1, { impostorClueMode: "similar" });

    expect(round.impostorWord).toBeTruthy();
    expect(round.impostorWord).not.toBe(round.word);
  });

  it("can disable recent word history", () => {
    createRound(["cine"], 5, 1, { avoidRecentWords: false });

    expect(localStorage.getItem("impostor-word-history")).toBeNull();
  });

  it("can reset word history", () => {
    createRound(["cine"], 5, 1);

    expect(getWordHistorySize()).toBe(1);

    resetWordHistory();

    expect(getWordHistorySize()).toBe(0);
  });

  it("still allows recent impostors to repeat", () => {
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);
    localStorage.setItem("impostor-player-history", JSON.stringify([0]));

    const round = createRound(["comida"], 4, 1);

    expect(round.impostorIndexes).toEqual([0]);
    randomSpy.mockRestore();
  });

  it("provides a broad catalogue without duplicates inside categories", () => {
    expect(categories).toHaveLength(17);
    expect(categories.every((category) => category.words.length >= 50)).toBe(true);
    expect(categories.reduce((total, category) => total + category.words.length, 0)).toBeGreaterThanOrEqual(940);
    expect(
      categories.every(
        (category) =>
          new Set(category.words.map((word) => word.toLocaleLowerCase("es"))).size ===
          category.words.length,
      ),
    ).toBe(true);
  });
});
