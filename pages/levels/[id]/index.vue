<template>
  <div>
    <!-- Centered text content -->
    <div class="flex h-screen items-center justify-center">
      <h1 class="text-3xl font-bold">Rentrer les questions plus tard</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
//au debut que levels
// puis mettre levels,
//aura un titre

definePageMeta({
  layout: "level",
});
</script>

<style scoped>
/* Ensures the text is centered vertically and horizontally */
.h-screen {
  height: 100vh;
}
</style>
