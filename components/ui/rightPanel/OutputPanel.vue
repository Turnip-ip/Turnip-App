<!-- components/ui/resizable/RightHalfPanel.vue -->
<template>
    <div :style="{ backgroundColor: bgColor, padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '340px' }">
      <slot>
        <div class="bubbleImg"><NuxtImg src="bubble_speech.png"></NuxtImg></div>
      <div class="TapeComingSoon">output coming soon !</div>
      <div class="imgTurnip"><NuxtImg src="Turnip_Boy_Portrait_sans_background.jpeg"></NuxtImg></div>
   
      </slot>
    </div>
    
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    bgColor: {
      type: String,
      default: ' #D9DFE5'   
    }
  })
  </script>
  
  <style scoped>
.TapeComingSoon{
  position: absolute;
  font-family: "Press Start 2P", sans-serif;
  right: 507px;
  top:773px
}
.imgTurnip{
    position: absolute;
    width: 100px;
    top: 760px;
    right: 830px;
  }
  .bubbleImg{
    position: absolute;
    width: 340px;
    top: 750px;
    right: 500px;
  }
  </style>
  
