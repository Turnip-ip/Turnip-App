<template>
    <div class="text" :style="{ backgroundColor: bgColor, padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }">
        <h2> Write your code here !</h2>
        <slot/>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    bgColor: {
      type: String,
      default: '#8391A3'    
    },
    height: {
      type: String,
      default: '1000px'    
    }
  })
  </script>
  
  <style scoped>
  .text{
    font-family: "Press Start 2P", sans-serif;
  }
  </style>
  