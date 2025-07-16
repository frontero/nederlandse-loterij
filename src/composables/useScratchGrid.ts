import { ref, computed, nextTick, watch, onMounted, type Ref } from "vue";
import { useVirtualizer } from "@tanstack/vue-virtual";
import {
  generatePrizeDistribution,
  type Cell,
} from "../utils/scratchGridUtils.ts";

/**
 * Constants voor gridconfiguratie en localStorage
 */
const GRID_SIZE = 100;
const CELL_SIZE = 44;
const STORAGE_KEY = "nlo-kalender-cells-v1";
const SCRATCHED_KEY = "nlo-kalender-scratched-v1";
const CONSOLATION_PRIZE_COUNT = 100;

/**
 * Simuleer andere gebruikers door een aantal random vakjes te openen
 * @param cells - Array van cellen
 * @param count - Aantal te openen cellen (standaard 100)
 * @returns Array van cellen met random open cellen
 */
function simulateOtherUsers(
  cells: Cell[],
  count: number = CONSOLATION_PRIZE_COUNT,
): Cell[] {
  const closed = cells.filter((c) => !c.isOpen);
  const indices = closed.map((c) => c.id);
  for (let i = 0; i < count; i++) {
    const idx = indices.splice(
      Math.floor(Math.random() * indices.length),
      1,
    )[0];
    if (idx !== undefined) cells[idx].isOpen = true;
  }
  return cells;
}

/**
 * Composable voor alle grid-logica van de verrassingskalender
 */
export function useScratchGrid() {
  // Reactieve state voor cellen, scratch-status, animatie, melding en gebruikersindex
  const gridSize = GRID_SIZE;
  const cellSize = CELL_SIZE;

  const cells: Ref<Cell[]> = ref<Cell[]>([]);
  const alreadyScratched: Ref<boolean> = ref(false);
  const animateIndex: Ref<number | null> = ref<number | null>(null);
  const visibleMessage: Ref<string> = ref("");
  const userScratchedIndex: Ref<number | null> = ref<number | null>(null);
  const parentRef: Ref<HTMLElement | null> = ref<HTMLElement | null>(null);
  const activeIndex: Ref<number> = ref(0);
  const liveMessage: Ref<string> = ref("");

  // Bij laden: haal data uit localStorage of initialiseer
  onMounted((): void => {
    const saved: string | null = localStorage.getItem(STORAGE_KEY);
    const scratched: string | null = localStorage.getItem(SCRATCHED_KEY);
    if (saved) {
      cells.value = JSON.parse(saved) as Cell[];
      alreadyScratched.value = !!scratched;
      const userIdx: string | null = localStorage.getItem(
        "nlo-kalender-user-index",
      );
      userScratchedIndex.value = userIdx ? parseInt(userIdx) : null;
    } else {
      let arr: Cell[] = generatePrizeDistribution();
      arr = simulateOtherUsers(arr);
      cells.value = arr;
      alreadyScratched.value = false;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    }
  });

  // Sla cellen op in localStorage bij elke wijziging
  watch(
    cells,
    (val: Cell[]): void => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    },
    { deep: true },
  );

  /**
   * Bereken de index in de cellen-array op basis van rij en kolom
   */
  function getIndex(row: number, col: number): number {
    return row * gridSize + col;
  }

  /**
   * Genereer een unieke id voor een cel
   */
  const getCellId = (idx: number): string => `cell-${idx}`;

  /**
   * Berekent de id van de actieve cel
   */
  const activeCellId = computed<string>(() => getCellId(activeIndex.value));

  /**
   * Controleer of een cell-id daadwerkelijk in de DOM staat (voor aria-activedescendant)
   */
  function cellExists(id: string): boolean {
    return !!(typeof window !== "undefined" && document.getElementById(id));
  }

  /**
   * Haal een cel op uit de cellen-array
   */
  function getCell(row: number, col: number): Cell {
    return cells.value[getIndex(row, col)];
  }

  /**
   * Zet de actieve index en focus het bijbehorende element
   */
  function setActiveIndex(idx: number): void {
    activeIndex.value = idx;
    nextTick(() => {
      const el = document.getElementById(getCellId(idx));
      if (el) el.focus();
    });
  }

  /**
   * Kras een vakje open, update state en meldingen
   */
  function handleScratch(idx: number): void {
    if (alreadyScratched.value) return;
    if (!cells.value[idx].isOpen) {
      cells.value[idx].isOpen = true;
      animateIndex.value = idx;
      localStorage.setItem(SCRATCHED_KEY, "1");
      alreadyScratched.value = true;
      userScratchedIndex.value = idx;
      localStorage.setItem("nlo-kalender-user-index", idx.toString());
      if (cells.value[idx].prize === 25000) {
        liveMessage.value = "Hoofdprijs gevonden! 25.000 euro.";
        setTimeout(() => {
          visibleMessage.value =
            "Gefeliciteerd! Je hebt de hoofdprijs gewonnen: \u20ac25.000!";
        }, 2000);
      } else if (cells.value[idx].prize === 100) {
        liveMessage.value = "Troostprijs gevonden! 100 euro.";
        setTimeout(() => {
          visibleMessage.value =
            "Gefeliciteerd! Je hebt een troostprijs gewonnen: \u20ac100!";
        }, 2000);
      } else {
        liveMessage.value = "Geen prijs.";
        setTimeout(() => {
          visibleMessage.value =
            "Helaas, geen prijs. Probeer het volgend jaar weer!";
        }, 2000);
      }
      setTimeout(() => {
        liveMessage.value = "";
      }, 2000);
      setTimeout(() => {
        animateIndex.value = null;
      }, 1200);
    }
  }

  /**
   * Reset het spel (verwijder localStorage en herlaad)
   */
  function resetGame(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SCRATCHED_KEY);
    window.location.reload();
  }

  // Virtualisatie setup voor rijen en kolommen
  const rowVirtualizer = useVirtualizer({
    count: gridSize,
    getScrollElement: (): HTMLElement | null => parentRef.value,
    estimateSize: (): number => cellSize,
    overscan: 5,
  });
  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: gridSize,
    getScrollElement: (): HTMLElement | null => parentRef.value,
    estimateSize: (): number => cellSize,
    overscan: 5,
  });
  const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());
  const virtualColumns = computed(() =>
    columnVirtualizer.value.getVirtualItems(),
  );
  const totalSizeRows = computed(() => rowVirtualizer.value.getTotalSize());
  const totalSizeColumns = computed(() =>
    columnVirtualizer.value.getTotalSize(),
  );

  return {
    gridSize,
    totalSizeRows,
    totalSizeColumns,
    virtualRows,
    virtualColumns,
    getCell,
    getCellId,
    getIndex,
    activeIndex,
    setActiveIndex,
    activeCellId,
    cellExists,
    animateIndex,
    alreadyScratched,
    userScratchedIndex,
    visibleMessage,
    liveMessage,
    handleScratch,
    resetGame,
    parentRef,
  };
}
