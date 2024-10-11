<template>
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <LeftHalfPanel > 
          <TextEditor v-model="dotArea" class="m-4" height="1000px"/>
        </LeftHalfPanel>
      
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel height = '100%'>
        <RightHalfPanel> 
          <h2> Right Half Panel space</h2>
          <div style="height: 33.33%; overflow: hidden;">
            <GraphPanel>
            <div style="height: 33.33%; overflow: hidden;">
            <GraphView class="m-4 w-44 h-44" :dot="dot"/>
          </div>
            </GraphPanel>
          

          </div>
         
          
          <div style="height: 33.33%; overflow: hidden;">
            <RubanPanel/>
          </div>
          <div style="height: 33.33%; overflow: hidden;">
            <OutputPanel/>
          </div>
         
        </RightHalfPanel>
        
      </ResizablePanel>
    </ResizablePanelGroup>
</template>

<script setup lang="ts">
import LeftHalfPanel from '../components/ui/leftPanel/leftHalfPanel.vue';
import GraphPanel from '../components/ui/rightPanel/GraphPanel.vue';
import OutputPanel from '../components/ui/rightPanel/OutputPanel.vue';
import RightHalfPanel from '../components/ui/rightPanel/RightHalfPanel.vue';
import RubanPanel from '../components/ui/rightPanel/RubanPanel.vue';


q
| 1 -> (0,L), q
| 0 -> (1,L), END
  `);
</script>
