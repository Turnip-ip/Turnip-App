<template>
  <div class="p-10">
    <Textarea
      v-model="dotArea"
      class="mb-5"
      placeholder="Type your message here."
    />
    <GraphView
      class="w-44 h-44"
      :dot="dot"
    />
  </div>
</template>

<script setup lang="ts">
// https://github.com/murawakimitsuhiro/exgraph/blob/86ff28eb05b88c243ba9e0ea5b7c8962467bf14b/app.vue
const dotArea = ref<string>("digraph {a -> c}");
const dot = computed(() => dotArea.value);
</script>
