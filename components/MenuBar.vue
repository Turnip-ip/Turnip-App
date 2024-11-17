<template>
  <nav class="flex space-x-4 bg-gray-200 p-4">
    <NuxtLink to="/levels" class="p-2 rounded hover:bg-gray-300">
      Levels
    </NuxtLink>

    <NuxtLink v-if="showButtons" to="/levels/id/" class="p-2 rounded hover:bg-gray-300">
      Question
    </NuxtLink>

    <NuxtLink v-if="showButtons" to="/levels/id/answer" class="p-2 rounded hover:bg-gray-300">
      Answer
    </NuxtLink>
  </nav>
</template>


<script setup lang="ts">

defineProps<{
  showButtons: boolean
}>();


</script>

<style scoped></style>
