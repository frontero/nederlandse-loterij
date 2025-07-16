<template>
  <!-- Herbruikbare resetknop voor het spel -->
  <button
    class="mt-4 mx-auto block bg-nl-blue text-white font-bold py-2 px-4 rounded hover:bg-nl-orange transition-colors cursor-pointer"
    @click="$emit('click')"
  >
    <slot>Speel opnieuw</slot>
  </button>
</template>
