<template>
  <NuxtCodeMirror
    ref="codemirror"
    v-model="modelValue"
    :extensions="extensions"
    :theme="theme"
    placeholder="Enter your code here..."
    :auto-focus="true"
    :editable="true"
    :basic-setup="false"
    :indent-with-tab="false"
    :height="height"
  />
  <!-- @on-change="handleChange"
    @statistics="handleStatistics"
    @on-update="handleUpdate" -->
</template>

<script setup lang="ts">
//import type { ViewUpdate } from '@codemirror/view';
import type { CodeMirrorRef } from "nuxt-codemirror"; // Statistics
import { basicSetup } from "codemirror";

import { dot } from "@viz-js/lang-dot";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  height?: string;
  modelValue?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
});

const theme = ref<"light" | "dark" | "none">("light");
const codemirror = ref<CodeMirrorRef>();

// We need to add `basicSetup` to the extensions array to fix highlighting. See https://github.com/ThimoDEV/nuxt-codemirror/issues/37
const extensions = [basicSetup, dot()];

// const handleChange = (value: string, viewUpdate: ViewUpdate) => {
//   console.log('Value changed:', value);
//   console.log('View updated:', viewUpdate);
// };

// const handleStatistics = (stats: Statistics) => {
//   console.log('Editor statistics:', stats);
// };

// const handleUpdate = (viewUpdate: ViewUpdate) => {
//   console.log('Editor updated:', viewUpdate);
// };

// onMounted(() => {
//   watchEffect(() => {
//     if (codemirror.value) {
//       console.log('ref', codemirror.value.view);
//     }
//   })
// });
</script>
