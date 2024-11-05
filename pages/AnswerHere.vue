<template>
    <div>
      <!-- Resizable Panels -->
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <LeftHalfPanel>
            <TextEditor v-model="dotArea" class="m-4" height="1000px" />
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

  