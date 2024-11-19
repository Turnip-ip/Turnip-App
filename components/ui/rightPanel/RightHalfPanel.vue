<!-- components/ui/resizable/RightHalfPanel.vue -->
<template>
  <div :style="{ backgroundColor: bgColor, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '100%' }"
    class="right-half-panel">

    <GraphPanel :dotArea="dotArea" class="panel-section h-1/2" />


    <div class="divider" />


    <RubanPanel class="panel-section h-1/4" />


    <div class="divider" />


    <OutputPanel class="panel-section h-full" />

  </div>
</template>

<script setup lang="ts">
import GraphPanel from '../rightPanel/GraphPanel.vue';
import RubanPanel from '../rightPanel/RubanPanel.vue';
import OutputPanel from '../rightPanel/OutputPanel.vue';

const props = defineProps({
  bgColor: {
    type: String,
  },
  dotArea: {
    type: String,
    default: ''
  }
});
</script>

<style>
.right-half-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.divider {
  height: 5px;
  background-color: black;
}
</style>
