<!-- components/ui/resizable/RightHalfPanel.vue -->
<!-- n'est pas ajouté au index.vue car bug quand on rajoute le graphview dedans -->
<template>
  <div :style="{ backgroundColor: bgColor, padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }">
    <slot>
      <h2> Graph Space</h2>
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

<style scoped></style>