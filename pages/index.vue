<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>
      <TextEditor
        v-model="dotArea"
        class="m-4"
        height="500px"
      />
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel>
      <GraphView
        class="h-82 m-4 w-72"
        :dot="dot"
      />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>

<script setup lang="ts">
const dotArea = ref<string>(`START
  | b -> (b,R), START
  | _ -> (_,L), q
  
  q
  | 1 -> (0,L), q
  | 0 -> (1,L), END
  `);
</script>
