<template>
  <div class="p-10">
    <Textarea
      v-model="dotArea"
      class="mb-5"
      placeholder="Type your message here."
    />
    <GraphView
      class="h-44 w-44"
      :dot="dot"
    />
  </div>
</template>

<script setup lang="ts">

const dotArea = ref<string>("digraph {a -> c}")
const dot = computed(() => dotArea.value)
</script>
