<!--
  ScratchLiveRegion.vue
  Aria-live regio voor screenreaders
  @prop {string} message - De live meldingstekst voor screenreaders
-->
<template>
  <div aria-live="polite" class="sr-only">{{ message }}</div>
</template>

<script setup lang="ts">
const { message } = defineProps<{ message: string }>();
</script>
