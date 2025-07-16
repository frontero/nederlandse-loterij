<template>
  <div
    class="max-w-full p-4 bg-nl-orange/10 rounded-2xl border border-nl-orange shadow-lg"
  >
    <!-- Zichtbare melding voor prijs of geen prijs -->
    <ScratchMessage :message="visibleMessage" />
    <div
      ref="parentRef"
      tabindex="0"
      class="scratch-grid-container mx-auto md:max-w-[80vw] h-[60vh] w-full overflow-auto outline-none"
      @keydown="onGridKeydown"
      role="grid"
      aria-label="Verrassingskalender, 100 bij 100 vakjes"
      :aria-rowcount="gridSize"
      :aria-colcount="gridSize"
      :aria-activedescendant="
        cellExists(activeCellId) ? activeCellId : undefined
      "
      aria-describedby="grid-instructions"
    >
      <div
        :style="{
          height: `${totalSizeRows}px`,
          width: `${totalSizeColumns}px`,
          position: 'relative',
        }"
      >
        <!-- Render alleen de zichtbare cellen via virtualisatie -->
        <template v-for="virtualRow in virtualRows" :key="virtualRow.index">
          <template
            v-for="virtualColumn in virtualColumns"
            :key="virtualColumn.index"
          >
            <ScratchCell
              :id="getCellId(getIndex(virtualRow.index, virtualColumn.index))"
              :style="{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${virtualColumn.size}px`,
                height: `${virtualRow.size}px`,
                transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                boxSizing: 'border-box',
                userSelect: 'none',
              }"
              :isOpen="getCell(virtualRow.index, virtualColumn.index).isOpen"
              :prize="
                [25000, 100].includes(
                  getCell(virtualRow.index, virtualColumn.index).prize ?? -1,
                )
                  ? (getCell(virtualRow.index, virtualColumn.index).prize as
                      | 100
                      | 25000)
                  : null
              "
              :index="getIndex(virtualRow.index, virtualColumn.index)"
              :tabindex="
                activeIndex === getIndex(virtualRow.index, virtualColumn.index)
                  ? 0
                  : -1
              "
              :isActive="
                activeIndex === getIndex(virtualRow.index, virtualColumn.index)
              "
              :ariaRowindex="virtualRow.index + 1"
              :ariaColindex="virtualColumn.index + 1"
              :animateScratch="
                animateIndex === getIndex(virtualRow.index, virtualColumn.index)
              "
              :disabled="alreadyScratched"
              :isUserCell="
                userScratchedIndex ===
                getIndex(virtualRow.index, virtualColumn.index)
              "
              :alreadyScratched="alreadyScratched"
              role="gridcell"
              aria-live="off"
              @focus="
                setActiveIndex(getIndex(virtualRow.index, virtualColumn.index))
              "
              @scratch="handleScratch"
              @keydown.enter.stop.prevent="
                handleScratch(getIndex(virtualRow.index, virtualColumn.index))
              "
              @keydown.space.stop.prevent="
                handleScratch(getIndex(virtualRow.index, virtualColumn.index))
              "
            />
          </template>
        </template>
      </div>
    </div>
    <!-- Resetknop, alleen zichtbaar als gebruiker al gekrast heeft -->
    <ScratchResetButton v-if="alreadyScratched" @click="resetGame" />
    <!-- Live regio voor screenreaders -->
    <ScratchLiveRegion :message="liveMessage" />
  </div>
</template>

<script setup lang="ts">
// Importeer Vue en benodigde componenten
import ScratchCell from "./ScratchCell.vue";
import ScratchMessage from "./ScratchMessage.vue";
import ScratchResetButton from "./ScratchResetButton.vue";
import ScratchLiveRegion from "./ScratchLiveRegion.vue";
import { useScratchGrid } from "../composables/useScratchGrid.ts";

// Props voor ScratchGrid component
defineProps<{ disableSimulateUsers?: boolean }>();

// Gebruik de composable voor alle grid-logica
type UseScratchGridReturn = ReturnType<typeof useScratchGrid>;
const {
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
}: UseScratchGridReturn = useScratchGrid();

/**
 * Keyboardnavigatie voor het grid (pijltjestoetsen)
 * @param e - KeyboardEvent
 */
function onGridKeydown(e: KeyboardEvent): void {
  let idx = activeIndex.value;
  if (e.key === "ArrowRight" && idx < gridSize * gridSize - 1) {
    setActiveIndex(idx + 1);
    e.preventDefault();
  }
  if (e.key === "ArrowLeft" && idx > 0) {
    setActiveIndex(idx - 1);
    e.preventDefault();
  }
  if (e.key === "ArrowUp" && idx >= gridSize) {
    setActiveIndex(idx - gridSize);
    e.preventDefault();
  }
  if (e.key === "ArrowDown" && idx < gridSize * gridSize - gridSize) {
    setActiveIndex(idx + gridSize);
    e.preventDefault();
  }
}
</script>
