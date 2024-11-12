<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Graphviz } from "d3-graphviz";
import { graphviz } from "d3-graphviz";
import * as d3 from "d3";
import type { BaseType } from "d3-selection";

interface Props {
  dot: string;
}

const props = withDefaults(defineProps<Props>(), { dot: `digraph {a -> b}` });
const graphDivRef = ref<HTMLDivElement>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let graph: Graphviz<BaseType, any, BaseType, any>;

const initGraphViz = () => {
  if (!graphDivRef.value) return;
  graph = graphviz(graphDivRef.value, { useWorker: false });
  render(props.dot);
};

function transitionFactory() {
  // We need to create a new transition for each render
  return d3.transition("main").duration(750).ease(d3.easeLinear);
}


function interactive() {

  const nodes = d3.selectAll('.node,.edge');
  nodes
    .on("click", function () {
      const title = d3.select(this).selectAll('title').text().trim();
      const text = d3.select(this).selectAll('text').text();
      const id = d3.select(this).attr('id');
      const class1 = d3.select(this).attr('class');
      const dotElement = title.replace('->', ' -> ');
      console.log('Element id="%s" class="%s" title="%s" text="%s" dotElement="%s"', id, class1, title, text, dotElement);
      console.log('Finding and deleting references to %s "%s" from the DOT source', class1, dotElement);
      // for (i = 0; i < dotSrcLines.length;) {
      //   if (dotSrcLines[i].indexOf(dotElement) >= 0) {
      //     console.log('Deleting line %d: %s', i, dotSrcLines[i]);
      //     dotSrcLines.splice(i, 1);
      //   } else {
      //     i++;
      //   }
      // }
      // dotSrc = dotSrcLines.join('\n');
      // render();
    });
}


const render = (content: string) => {
  graph
    .dot(content)
    .transition(transitionFactory)
    .zoom(false)
    .on("end", interactive)
    // .attributer(function (d: BaseType) {
    //   console.log("attributer", d);
    //   //d.attr('cursor', 'pointer')
    //   if (d.tag == "#text") {
    //     console.log("test")
    //     d3.select(d)
    //       .attr("fill", "yellow");
    //     //d.attributes.fill = "red";
    //   }
    // })
    .render()
    .onerror((em) => {
      console.log("graph error:", em);
    });

};

watch(
  () => props.dot,
  (current, _before) => {
    render(current);
  },
);
onMounted(() => {
  initGraphViz();
});
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
