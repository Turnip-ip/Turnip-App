<template>
  <div class="page-container">
    <MenuBar @change="handleChange" /> <!-- The menu bar at the top -->
    <div class="content-container">
      <component :is="currentWindowComponent" @showTabs="ShowTabsAndQuestions"/> 
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Homepage from './HomePage.vue'; 
import AnswerHere from './AnswerHere.vue'; 
import Question from './Questions.vue'; 
import MenuBar from '@/components/ui/menubar/MenuBar.vue'; 
import Levels from './Levels.vue';

const currentWindow = ref('HomePage'); // par default HomePage

// fenetre actuelle 
const currentWindowComponent = computed(() => {
  if (currentWindow.value === 'HomePage') {
    return Homepage;
  } else if (currentWindow.value === 'AnswerHere') {
    return AnswerHere;
  } else if (currentWindow.value === 'Question') {
    return Question;
  } else if (currentWindow.value === 'Levels') {
    return Levels;
  }
});

// mthod to handle changes from the MenuBar
function handleChange(window) {
  currentWindow.value = window; 
}

function ShowTabsAndQuestions() {
  currentWindow.value = 'Question';
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh; 
}

.content-container {
  flex: 1; 
  height: calc(100vh - 4rem); 
}
</style>
