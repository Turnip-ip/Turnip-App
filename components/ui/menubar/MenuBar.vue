<template>
  <nav class="flex space-x-4 bg-gray-200 p-4">
    <button @click="changeWindow('AnswerHere')" class="p-2 rounded hover:bg-gray-300">
      Answer
    </button>
    <button @click="changeWindow('Question')" class="p-2 rounded hover:bg-gray-300">
      Question
    </button>
  </nav>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits();

function changeWindow(window) {
  emit('change', window); // Emit the change event to the parent component
}
</script>

<style scoped>
/* Add any styles for your MenuBar here */
</style>
