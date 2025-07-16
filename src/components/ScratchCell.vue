<template>
  <div
    :class="[
      // Basis styling voor de kras-cel
      'scratch-cell flex items-center justify-center select-none box-border transition-colors duration-200 border rounded-[6px] w-full h-full',
      // Styling afhankelijk van prijs en open status
      isOpen
        ? prize === 25000
          ? 'bg-nl-gold text-nl-blue border-nl-gold font-bold'
          : prize === 100
            ? 'bg-nl-blue text-white border-nl-blue font-bold'
            : 'bg-nl-white text-nl-blue border-nl-orange font-normal'
        : 'bg-nl-orange text-white border-nl-orange font-bold',
      // Focus styling
      isActive ? 'outline outline-2 outline-nl-blue outline-offset-2' : '',
      // Cursor afhankelijk van status
      disabled || isOpen ? 'cursor-default' : 'cursor-pointer',
      disabled ? 'is-disabled' : '',
      animateScratch ? 'is-animating' : '',
      // Extra visuele markering voor het vakje van de gebruiker
      isUserCell && isOpen
        ? 'is-user-cell ring-4 ring-nl-blue ring-offset-2 bg-nl-gold/90'
        : '',
      // Hover effect alleen als gebruiker nog niet heeft gekrast
      !alreadyScratched && !isOpen && !disabled ? 'scratch-hover' : '',
    ]"
    :tabindex="tabindex"
    :aria-rowindex="ariaRowindex"
    :aria-colindex="ariaColindex"
    :id="id"
    :role="role"
    aria-live="off"
    @focus="$emit('focus', index)"
    @click="!disabled && !isOpen ? $emit('scratch', index) : null"
    @keydown.enter.stop.prevent="
      !disabled && !isOpen ? $emit('scratch', index) : null
    "
    @keydown.space.stop.prevent="
      !disabled && !isOpen ? $emit('scratch', index) : null
    "
    style="position: relative"
  >
    <!-- Multi-stroke kras-animatie overlays -->
    <template v-if="animateScratch">
      <div
        class="scratch-overlay scratch-wipe-stroke1"
        aria-hidden="true"
      ></div>
      <div
        class="scratch-overlay scratch-wipe-stroke2"
        aria-hidden="true"
      ></div>
      <div
        class="scratch-overlay scratch-wipe-stroke3"
        aria-hidden="true"
      ></div>
      <div
        class="scratch-overlay scratch-wipe-stroke4"
        aria-hidden="true"
      ></div>
    </template>
    <slot />
    <!-- Toon prijs of kruisje als open -->
    <span v-if="isOpen">
      <span v-if="prize === 25000">€25.000</span>
      <span v-else-if="prize === 100">€100</span>
      <span v-else class="text-red-600 text-2xl font-bold">✗</span>
    </span>
    <span v-else aria-hidden="true">?</span>
  </div>
</template>

<script setup lang="ts">
/**
 * Props voor de ScratchCell component
 * @property id - Unieke id van de cel
 * @property isOpen - Of de cel open is
 * @property prize - Prijs in de cel (hoofdprijs, troostprijs of geen prijs)
 * @property index - Index van de cel in het grid
 * @property tabindex - Tabindex voor keyboardnavigatie
 * @property ariaSelected - Aria-selected attribuut (optioneel)
 * @property isActive - Of de cel actief is (focus)
 * @property ariaRowindex - Rij-index voor aria
 * @property ariaColindex - Kolom-index voor aria
 * @property animateScratch - Of de kras-animatie actief is
 * @property disabled - Of de cel niet aanklikbaar is
 * @property role - ARIA-rol van het element
 * @property isUserCell - Of dit het vakje van de gebruiker is
 * @property alreadyScratched - Of de gebruiker al gekrast heeft
 */
interface ScratchCellProps {
  id: string;
  isOpen: boolean;
  prize: 25000 | 100 | null;
  index: number;
  tabindex: number;
  ariaSelected?: string;
  isActive: boolean;
  ariaRowindex: number;
  ariaColindex: number;
  animateScratch: boolean;
  disabled: boolean;
  role: string;
  isUserCell: boolean;
  alreadyScratched: boolean;
}

defineProps<ScratchCellProps>();

/**
 * Emits voor focus en kras-acties
 * @event focus - Wordt getriggerd bij focus op de cel
 * @event scratch - Wordt getriggerd bij krassen van de cel
 */
</script>

<style scoped>
/* Basis styling voor kras-cel */
.scratch-cell {
  transition:
    background 0.2s,
    box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}

/* Extra visuele markering voor het vakje van de gebruiker */
.is-user-cell {
  box-shadow:
    0 0 0 4px var(--color-nl-blue),
    0 2px 8px 0 #0001;
  background: var(--color-nl-gold, #ffe7a3) !important;
  position: relative;
  z-index: 1;
}

/* Overlay voor kras-animatie */
.scratch-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  /* Realistisch kraspatroon met diagonale streepjes */
  background: repeating-linear-gradient(135deg, #bbb 0 8px, #fff 8px 16px);
  opacity: 1;
  pointer-events: none;
  /* standaard: volledig zichtbaar */
  clip-path: inset(0 0 0 0);
  transition: opacity 0.2s;
}

/**
 * Elke kras-stroke heeft een eigen animatie-delay en richting
 * zodat het lijkt alsof er op meerdere plekken gekrast wordt
 */
.scratch-wipe-stroke1 {
  animation: scratch-wipe-stroke1-anim 1.6s cubic-bezier(0.4, 0, 0.2, 1)
    forwards;
  animation-delay: 0s;
}
.scratch-wipe-stroke2 {
  animation: scratch-wipe-stroke2-anim 1.6s cubic-bezier(0.4, 0, 0.2, 1)
    forwards;
  animation-delay: 0.18s;
}
.scratch-wipe-stroke3 {
  animation: scratch-wipe-stroke3-anim 1.6s cubic-bezier(0.4, 0, 0.2, 1)
    forwards;
  animation-delay: 0.36s;
}
.scratch-wipe-stroke4 {
  animation: scratch-wipe-stroke4-anim 1.6s cubic-bezier(0.4, 0, 0.2, 1)
    forwards;
  animation-delay: 0.54s;
}

@keyframes scratch-wipe-stroke1-anim {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 25%);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    opacity: 0;
  }
}
@keyframes scratch-wipe-stroke2-anim {
  0% {
    clip-path: polygon(0 25%, 100% 35%, 100% 65%, 0 55%);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    clip-path: polygon(0 25%, 100% 35%, 100% 35%, 0 25%);
    opacity: 0;
  }
}
@keyframes scratch-wipe-stroke3-anim {
  0% {
    clip-path: polygon(0 55%, 100% 65%, 100% 90%, 0 80%);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    clip-path: polygon(0 55%, 100% 65%, 100% 65%, 0 55%);
    opacity: 0;
  }
}
@keyframes scratch-wipe-stroke4-anim {
  0% {
    clip-path: polygon(0 80%, 100% 90%, 100% 100%, 0 100%);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
    opacity: 0;
  }
}

/* Hover effect alleen als gebruiker nog niet heeft gekrast */
.scratch-hover:hover {
  background: #ffe7a3 !important;
  box-shadow: 0 0 0 2px #00308733;
}

.scratch-cell.cursor-default {
  pointer-events: none;
}
</style>
