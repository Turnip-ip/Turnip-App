<template>
  <GraphView :dot="dot" />
</template>

<script setup lang="ts">
import init, { tm_string_to_dot } from "tm_parser?init";

interface Props {
  code: string;
}

const props = withDefaults(defineProps<Props>(), { code: `` });

await init();

const dot = computed(() => {
  try {
    const dotCode = tm_string_to_dot(props.code, "", 0);
    console.log(dotCode);
    return dotCode;
  } catch (e) {
    console.log(e);
  }
  return "digraph  {bgcolor='transparent';}";
});
</script>
