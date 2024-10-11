<!-- components/ui/resizable/RightHalfPanel.vue -->
 <!-- n'est pas ajouté au index.vue car bug quand on rajoute le graphview dedans -->
<template>
    <div :style="{ backgroundColor: bgColor, padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '100%' }">
      <slot>
        <h2> Graph Space</h2>
      </slot>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    bgColor: {
      type: String,
      default: ' #D0D9E2'   
    }
  })
  </script>
  
  <style scoped>
  /* No additional styles needed */
  </style>
  