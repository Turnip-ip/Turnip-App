<template>
  <nav class="flex space-x-4 bg-gray-200 p-4">
    <button @click="changeWindow('Levels')" class="p-2 rounded hover:bg-gray-300">
      Levels
    </button>
    <button @click="changeWindow('Question')" class="p-2 rounded hover:bg-gray-300">
      Question
    </button>
    <button @click="changeWindow('AnswerHere')" class="p-2 rounded hover:bg-gray-300">
      Answer
    </button>
  </nav>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits();

function changeWindow(window) {
  emit('change', window); 
}
</script>

<style scoped>
</style>
