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
// @ts-expect-error TODO create a type schime
import init, { tm_string_to_dot } from "tm_parse?init";

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  init()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .then(() => {
      console.log("Init finished");
      inited.value = true;
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .catch((e: unknown) => {
      console.error("Init failed", e);
    });
});

const inited = ref(false);

const dotArea = ref<string>(`START
| b -> (b,R), START
| _ -> (_,L), q

q
| 1 -> (0,L), q
| 0 -> (1,L), END
`);
const dot = computed(() => {
  //await init();
  //console.log("Computing", inited.value, dotArea.value)
  if (inited.value) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    return tm_string_to_dot(dotArea.value, "TEST");
  } else {
    return "";
  }
});
</script>
