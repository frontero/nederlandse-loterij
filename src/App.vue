<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-6 container mx-auto">
    <img
      src="./assets/logo-nederlandse-loterij.png"
      alt="NLO Logo"
      class="w-48"
    />
    <h1 class="text-3xl font-bold mb-6">Verrassingskalender</h1>
    <p class="text-center text-lg md:text-xl font-semibold mb-4 text-nl-blue">
      Welkom bij de Verrassingskalender! Kras één vakje open en ontdek direct of
      jij een prijs hebt gewonnen. Veel succes!
    </p>
    <ScratchGrid />
  </div>
</template>

<script setup lang="ts">
import ScratchGrid from "./components/ScratchGrid.vue";
</script>
