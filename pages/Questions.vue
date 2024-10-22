<template>
    <div>
      <Menubar /> <!-- Include the Menubar -->
  
      <!-- Centered text content -->
      <div class="flex justify-center items-center h-screen">
        <h1 class="text-3xl font-bold">This is the Question Window</h1>
      </div>
    </div>
  </template>
  
  <script setup>
  import MenuBar from '@/components/ui/menubar/MenuBar.vue'; 
  </script>
  
  <style scoped>
  /* Ensures the text is centered vertically and horizontally */
  .h-screen {
    height: 100vh;
  }
  </style>
  