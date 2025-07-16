<!--
  ScratchMessage.vue
  Toont een zichtbare melding voor prijs of geen prijs
  @prop {string} message - De meldingstekst die getoond wordt
-->
<template>
  <div
    v-if="message"
    class="mb-4 text-center text-lg font-bold rounded bg-nl-gold/80 text-nl-blue py-2 shadow"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
const { message } = defineProps<{ message: string }>();
</script>
