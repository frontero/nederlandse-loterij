// Definitie van een gridcel voor de verrassingskalender
export interface Cell {
  /** Unieke index van de cel */
  id: number;
  /** Of de cel open is (true) of nog dicht (false) */
  isOpen: boolean;
  /** Prijs in de cel: 25000 (hoofdprijs), 100 (troostprijs) of null (geen prijs) */
  prize: number | null;
}

/**
 * Genereert een prijsverdeling voor het grid:
 * - 1 hoofdprijs (25.000 euro)
 * - 100 troostprijzen (100 euro)
 * - De rest is leeg (null)
 * De prijzen worden willekeurig verdeeld over het grid.
 * @param gridSize - Aantal rijen/kolommen (standaard 100)
 * @returns Array van Cell-objecten met prijsverdeling
 */
export function generatePrizeDistribution(gridSize: number = 100): Cell[] {
  const totalCells: number = gridSize * gridSize;
  // Maak een array van lege cellen
  const arr: Cell[] = Array.from({ length: totalCells }, (_, i) => ({
    id: i,
    isOpen: false,
    prize: null,
  }));
  // Maak een lijst met alle indices en shuffle deze
  const indices: number[] = Array.from({ length: totalCells }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  // Wijs de hoofdprijs toe aan de eerste index
  arr[indices[0]].prize = 25000;
  // Wijs de troostprijzen toe aan de volgende 100 indices
  const consolationPrizeCount = 100;
  for (let i = 1; i <= consolationPrizeCount; i++) {
    arr[indices[i]].prize = 100;
  }
  // De rest blijft null (geen prijs)
  return arr;
}
