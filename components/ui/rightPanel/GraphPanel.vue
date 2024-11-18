<!-- components/ui/resizable/RightHalfPanel.vue -->
<!-- n'est pas ajouté au index.vue car bug quand on rajoute le graphview dedans -->
<template>
  <div
    :style="{ backgroundColor: bgColor, padding: '30px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '340px' }">
    <slot>
      <div class="bubbleImg">
        <NuxtImg src="bubble_speech.png"></NuxtImg>
      </div>
      <div class="TapeComingSoon">Graph here !</div>
      <div class="imgTurnip">
        <NuxtImg src="Turnip_Boy_Portrait_sans_background.jpeg"></NuxtImg>
      </div>

      <TuringGraphView class="p-4 h-50" :code="dotArea" />
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  bgColor: {
    type: String,
    default: ' #D0D9E2'
  },
  dotArea: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.TapeComingSoon {
  position: absolute;
  font-family: "Press Start 2P", sans-serif;
  right: 676px;
  top: 87px
}

.imgTurnip {
  position: absolute;
  width: 70px;
  top: 80px;
  right: 868px;
}

.bubbleImg {
  position: absolute;
  width: 210px;
  top: 7%;
  right: 36%;
}
</style>