<template>
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <TextEditor v-model="dotArea" class="m-4" height="500px"/>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel>
        <GraphView class="m-4 w-44 h-44" :dot="dot"/>
      </ResizablePanel>
    </ResizablePanelGroup>
</template>

<script setup lang="ts">

const dotArea = ref<string>("digraph {a -> c}")
const dot = computed(() => dotArea.value)
</script>
