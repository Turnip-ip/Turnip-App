<!-- components/ui/resizable/RightHalfPanel.vue -->
<template>
  <div :style="{ backgroundColor: bgColor, padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }">
    <slot>

    </slot>
  </div>

</template>

<script setup lang="ts">
const props = defineProps({
  bgColor: {
    type: String,
    default: ' #EAE2DD'
  }
})
</script>

<style scoped>
.TapeComingSoon {
  position: absolute;
  font-family: "Press Start 2P", sans-serif;
  right: 560px;
  top: 446px
}

.imgTurnip {
  position: absolute;
  width: 80px;
  top: 440px;
  right: 850px;
}

.bubbleImg {
  position: absolute;
  width: 300px;
  top: 39.5%;
  right: 30%;
}
</style>