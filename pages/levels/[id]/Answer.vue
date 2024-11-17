<template>
  <div class="answerpage">
    <!-- Resizable Panels -->
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <LeftHalfPanel>
          <TextEditor v-model="dotArea" class="m-4" height="931px" />
          <!-- 931 parce que 1000 - 4 rem, 1 rem = 16 px et il faut considerer le padding donc un peu moins de 1000-4*16 -->
        </LeftHalfPanel>
      </ResizablePanel>

      <ResizableHandle with-handle />

      <ResizablePanel>
        <RightHalfPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import LeftHalfPanel from '../components/ui/leftPanel/leftHalfPanel.vue';
import RightHalfPanel from '../components/ui/rightPanel/RightHalfPanel.vue';

const dotArea = ref<string>('digraph {a -> c}');
const dot = computed(() => dotArea.value);
</script>

<style scoped>
.answerpage {
  display: flex;
  flex-direction: column;
}
</style>
