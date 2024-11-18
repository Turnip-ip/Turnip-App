<template>
  <div class="answerpage">
    <!-- Resizable Panels -->
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <LeftHalfPanel>
          <TextEditor
            v-model="dotArea"
            class="m-4"
            height="931px"
          />
          <!-- 931 parce que 1000 - 4 rem, 1 rem = 16 px et il faut considerer le padding donc un peu moins de 1000-4*16 -->
        </LeftHalfPanel>
      </ResizablePanel>

      <ResizableHandle with-handle />

      <ResizablePanel>
        <RightHalfPanel :dot-area="dotArea" />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LeftHalfPanel from "../components/ui/leftPanel/leftHalfPanel.vue";
import RightHalfPanel from "../components/ui/rightPanel/RightHalfPanel.vue";

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

<style scoped>
.answerpage {
  display: flex;
  flex-direction: column;
}
</style>
