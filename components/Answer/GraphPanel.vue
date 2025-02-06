<!-- components/ui/resizable/RightHalfPanel.vue -->
<!-- n'est pas ajouté au index.vue car bug quand on rajoute le graphview dedans -->
<template>
  <div class="bg-[#D0D9E2]">
    <slot>
      <TuringGraphView
        class="h-50 p-4"
        :code="dotArea"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
const _props = defineProps({
  dotArea: {
    type: String,
    default: "",
  },
});
</script>
