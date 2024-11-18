<!-- components/ui/resizable/RightHalfPanel.vue -->
<template>
  <div :style="{ backgroundColor: bgColor, padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }">
    <slot>
      <h2>Tape Space</h2>
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

<style scoped></style>