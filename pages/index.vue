<template>
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <TextEditor v-model="dotArea" class="m-4" height="500px"/>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel>
        <GraphView class="m-4 w-72 h-82" :dot="dot"/>
      </ResizablePanel>
    </ResizablePanelGroup>
</template>

<script setup lang="ts">
import init, { tm_string_to_dot } from "tm_parser/tm_parser.js?init";

onMounted(() => {
  init().then(() => {
    console.log("Init finished")
    inited.value = true
  });
});

let inited = ref(false);

const dotArea = ref<string>(`START
| b -> (b,R), START
| _ -> (_,L), q

q
| 1 -> (0,L), q
| 0 -> (1,L), END
`)
const dot = computed(() => {
  //await init();
  //console.log("Computing", inited.value, dotArea.value)
  if (inited.value) {
    const a = tm_string_to_dot(dotArea.value, 'TEST');
    console.log(a);
    return a
  } else {
    return ""
  }
});
</script>
