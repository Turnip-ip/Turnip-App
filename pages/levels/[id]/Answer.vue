<template>
  <div class="h-full">
    <!-- Resizable Panels -->
    <ResizablePanelGroup
      direction="horizontal"
      class="h-max"
    >
      <ResizablePanel class="bg-[#8391A3]">
        <TextEditor
          v-model="dotArea"
          class="m-10"
          height="100%"
        />
      </ResizablePanel>

      <ResizableHandle with-handle />

      <ResizablePanel>
        <AnswerGraphPanel
          :dot-area="dotArea"
          class="h-1/2"
        />

        <div class="h-[5px] bg-black" />

        <AnswerRubanPanel class="h-1/4" />

        <div class="h-[5px] bg-black" />

        <AnswerOutputPanel class="h-1/4" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "level",
});

const dotArea = ref<string>(`START
| b -> (b,R), START
| _ -> (_,L), q

q
| 1 -> (0,L), q
| 0 -> (1,L), END
`);
</script>
