<template>
  <div class="text" :style="{ backgroundColor: bgColor, padding: '40px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }">
    <div class="bubbleImg">
      <NuxtImg src="bubble_speech.png"></NuxtImg>
    </div>
    <div class="codeHere">
      <h2> Code here !</h2>
    </div>
    <div class="imgTurnip">
      <NuxtImg src="Turnip_Boy_Portrait_sans_background.jpeg"></NuxtImg>
    </div>
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

.codeHere {
  position: absolute;
  font-family: "Press Start 2P", sans-serif;
  top: 96px;
  z-index: 2;
  left: 123px;
}

.bubbleImg {
  position: absolute;
  width: 200px;
  top: 8%;
  left: 6%;
}

.imgTurnip {
  position: absolute;
  width: 60px;
  top: 80px;
  left: 50px;
}
</style>
