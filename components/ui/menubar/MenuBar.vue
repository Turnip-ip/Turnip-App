<template>
  <nav class="flex space-x-4 bg-gray-200 p-4">
    <button
      @click="changeWindow('Levels')"
      @showbuttons ="activateButtons"
      class="p-2 rounded hover:bg-gray-300"
    >
      Levels
    </button>

    <button
      v-if="showButtons"
      @click="changeWindow('Question')"
      class="p-2 rounded hover:bg-gray-300"
    >
      Question
    </button>

    <button
      v-if="showButtons"
      @click="changeWindow('AnswerHere')"
      class="p-2 rounded hover:bg-gray-300"
    >
      Answer
    </button>
  </nav>
</template>


<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
//const showButtons = ref(false); //caches par defaut

const emit = defineEmits(); 

function changeWindow(window) {
  emit('change', window); 
}

const props = defineProps({
  showButtons: Boolean 
});


</script>

<style scoped>
</style>
