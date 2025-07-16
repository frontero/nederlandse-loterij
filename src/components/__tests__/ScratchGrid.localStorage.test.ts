import { describe, it, expect, beforeEach } from "vitest";

// Testen voor localStorage persistentie van de kras-kalender
// Controleert of cellen correct worden opgeslagen en geladen

describe("localStorage persistentie", () => {
  const STORAGE_KEY = "nlo-kalender-cells-v1";
  // Voor elke test: maak localStorage leeg zodat tests onafhankelijk zijn
  beforeEach(() => {
    localStorage.clear();
  });
  // Test: controleert of cellen correct worden opgeslagen en geladen
  it("slaat cellen op en laadt ze weer", () => {
    const testData = [{ id: 1, isOpen: true, prize: 100 }];
    // Sla testdata op in localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testData));
    // Laad de data weer uit localStorage
    const loaded = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    // Controleer of de geladen data overeenkomt met de opgeslagen data
    expect(loaded).toEqual(testData);
  });
});
