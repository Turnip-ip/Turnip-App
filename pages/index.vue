<template>
  
    <!-- 
    <Menubar @change="handleChange" />  Include the Menubar This is a comment -->

    <!-- Main content for the index page -->
    <!--
    <div class="p-8">
      <h1 class="text-2xl font-bold">Welcome to the Main Page</h1>
      <p>Select a window from the menu bar to navigate.</p>
      
      <component :is="currentWindowComponent" />
    </div>  
  -->

    <div>
      <Homepage></Homepage>
    </div>
    
</template>




<script setup>
import Homepage from './HomePage.vue'; 
import { ref, computed } from 'vue';





//const currentWindow = ref('AnswerHere');

/* const currentWindowComponent = computed(() => {
  return currentWindow.value === 'AnswerHere' ? AnswerHere : Question;
});

// Handle change from Menubar
function handleChange(window) {
  currentWindow.value = window;
}*/

</script>

<style scoped>
/* Add any additional styling you need for the main page */
</style>
