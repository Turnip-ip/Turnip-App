<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { Graphviz } from 'd3-graphviz';
import { graphviz } from 'd3-graphviz';
import * as d3 from 'd3';

interface Props {
  dot: string
}

const props = withDefaults(defineProps<Props>(), {  dot: `digraph {a -> b}` })
const graphDivRef = ref<HTMLDivElement>()

let graph: Graphviz<any, any, any, any>

const initGraphViz = () => {
  if (!graphDivRef.value) return
  graph = graphviz(graphDivRef.value, { useWorker: false })
  render(props.dot)
}


function transitionFactory() {
  // We need to create a new transition for each render
  return d3.transition("main")
    .duration(750)
    .ease(d3.easeLinear);
}

const render = (content: string) => {
  graph.dot(content)
    .transition(transitionFactory)
    .zoom(false)
      .render()
      .onerror((em) => console.log('graph error', em))
}

watch(() => props.dot, (current, before) => render(current))
onMounted(async () => initGraphViz());
</script>

<template>
    <div ref="graphDivRef" class="graph" />
</template>

<style>
.graph svg {
  width: 100%;
  height: 100%;
}
</style>