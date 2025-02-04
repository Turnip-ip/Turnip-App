<template>
  <div class="text" :style="{ backgroundColor: bgColor, padding: '40px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }">
    <div class="unlockfcts">&#9432;</div>
    <slot />
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
.text {
  height: 1005px;
}

.unlockfcts {
  position: absolute;
  top: 90px;
  left: 880px;
  font-size: 25px;
  color: white;
  z-index: 2;
}
</style>
