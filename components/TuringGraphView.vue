<template>
  <GraphView :dot="dot" />
</template>

<script setup lang="ts">
interface Props {
  dot: string;
}

const _props = withDefaults(defineProps<Props>(), { dot: '' });
</script>
