<template>
  <nav class="flex space-x-4 bg-gray-200 p-4">
    <button @click="changeWindow('AnswerHere')" class="p-2 rounded hover:bg-gray-300" :class="{ 'bg-gray-300': currentWindow === 'AnswerHere' }">
      Answer
    </button>
    <button @click="changeWindow('Question')" class="p-2 rounded hover:bg-gray-300" :class="{ 'bg-gray-300': currentWindow === 'Question' }">
      Question
    </button>
  </nav>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits();

const currentWindow = ref('AnswerHere');

function changeWindow(window) {
  currentWindow.value = window;
  emit('change', window); 
}
</script>

<style scoped>

</style>
