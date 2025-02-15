<template>
  <nav class="nuxt-link flex space-x-4 bg-gray-200 p-4">
    <NuxtLink to="/levels" class="rounded p-2 hover:bg-gray-300">
      Levels
    </NuxtLink>

    <NuxtLink v-if="showButtons" to="." class="rounded p-2 hover:bg-gray-300">
      Question
    </NuxtLink>

    <NuxtLink v-if="showButtons" to="answer" class="rounded p-2 hover:bg-gray-300">
      Submit
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  showButtons: boolean;
}>();
</script>

<style scoped>
button {
  font-family: "Press Start 2P", sans-serif;
  color: darkslateblue;
}

.nuxt-link {
  font-family: "Press Start 2P", sans-serif;
  color: darkslateblue;
}

.nuxt-link {
  font-family: "Press Start 2P", sans-serif;
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
