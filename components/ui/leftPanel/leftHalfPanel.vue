<template>
    <div :style="{ backgroundColor: bgColor, padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }">
        <h2> Code Editor Space</h2>
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
  </style>
  