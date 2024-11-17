<!-- components/ui/resizable/RightHalfPanel.vue -->
<!-- n'est pas ajouté au index.vue car bug quand on rajoute le graphview dedans -->
<template>
  <div
    :style="{ backgroundColor: bgColor, padding: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '340px' }">
    <slot>
      <h2> Graph Space</h2>
      <TuringGraphView class="h-82 m-4 w-72" :code="dotArea" />
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