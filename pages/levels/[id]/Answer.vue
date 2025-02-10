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
          :current-lvl-id="currentLevelId"
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
import { LevelsData } from "~/lib/levels_data";

definePageMeta({
  layout: "level",
});

const route = useRoute();

const currentLevelId: string = route.params.id as string;

const level = LevelsData.levels[currentLevelId];

const dotArea = ref<string>("");

const defaultCode = `START
| b -> (b,R), START
| _ -> (_,L), q

q
| 1 -> (0,L), q
| 0 -> (1,L), END
`;

onMounted(() => {
  const existingCode = localStorage.getItem(`level-${currentLevelId}`);
  dotArea.value = existingCode || level.initial_code || defaultCode;
});

watch(dotArea, (newCode) => {
  localStorage.setItem(`level-${currentLevelId}`, newCode);
});
</script>
