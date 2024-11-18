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

<style scoped>
button {
  font-family: 'Press Start 2P', sans-serif;
  color: darkslateblue;
}

nav {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: #f5f5f5;
  border-bottom: 6px solid #000;
  box-sizing: border-box;
}
</style>
