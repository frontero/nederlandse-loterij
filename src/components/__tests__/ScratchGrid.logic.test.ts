import { describe, it, expect } from "vitest";
import { generatePrizeDistribution } from "../../utils/scratchGridUtils";

// Testen voor de generatePrizeDistribution utility
// Controleert de correcte verdeling van hoofdprijs, troostprijzen en geen prijs

describe("generatePrizeDistribution", () => {
  // Test: controleert of de verdeling van prijzen klopt
  it("verdeelt 1 hoofdprijs, 100 troostprijzen en de rest geen prijs", () => {
    const cells = generatePrizeDistribution();
    const hoofdprijs = cells.filter((c: any) => c.prize === 25000);
    const troostprijzen = cells.filter((c: any) => c.prize === 100);
    const geenPrijs = cells.filter((c: any) => c.prize === null);
    // Controleer het totaal aantal cellen
    expect(cells.length).toBe(10000);
    // Controleer of er precies 1 hoofdprijs is
    expect(hoofdprijs.length).toBe(1);
    // Controleer of er precies 100 troostprijzen zijn
    expect(troostprijzen.length).toBe(100);
    // Controleer of de rest geen prijs heeft
    expect(geenPrijs.length).toBe(9899);
  });
});
