<template>
  <div class="p-10">
    <TextEditor v-model="dotArea"/>
    <GraphView class="w-44 h-44" :dot="dot"/>

  </div>
</template>

<script setup lang="ts">

const dotArea = ref<string>("digraph {a -> c}")
const dot = computed(() => dotArea.value)
</script>