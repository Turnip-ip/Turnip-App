<template>
    <div class="answerpage">
      <!-- Resizable Panels -->
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <LeftHalfPanel>
            <TextEditor v-model="dotArea" class="m-4" height="931px" /> <!-- 931 parce que 1000 - 4 rem, 1 rem = 16 px et il faut considerer le padding donc un peu moins de 1000-4*16 -->
          </LeftHalfPanel>
        </ResizablePanel>
  
        <ResizableHandle with-handle />
  
        <ResizablePanel height="100%">
          <RightHalfPanel>
            <h2>Right Half Panel space</h2>
            <div style="height: 33.33%; overflow: hidden;">
              <GraphView class="m-4 w-44 h-44" :dot="dot" />
            </div>
  
            <div style="height: 33.33%; overflow: hidden;">
              <RubanPanel />
            </div>
  
            <div style="height: 33.33%; overflow: hidden;">
              <OutputPanel />
            </div>
          </RightHalfPanel>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import LeftHalfPanel from '../components/ui/leftPanel/leftHalfPanel.vue';
import GraphPanel from '../components/ui/rightPanel/GraphPanel.vue';
import OutputPanel from '../components/ui/rightPanel/OutputPanel.vue';
import RightHalfPanel from '../components/ui/rightPanel/RightHalfPanel.vue';
import RubanPanel from '../components/ui/rightPanel/RubanPanel.vue';

const dotArea = ref<string>("digraph {a -> c}");
const dot = computed(() => dotArea.value);
</script>

<style scoped>
.answerpage {
  height: calc(100vh - 4rem); 
  flex-direction: column;
}
</style>