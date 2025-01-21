<template>
  <GraphView :dot="dot" class="h-82 m-4 w-72" />
</template>

<script setup lang="ts">
import { hsl, type HSLColor, select } from "d3";

import { onMounted } from 'vue';

interface Text {
  content: string,
  tooltip: string,
  from: string,
  to: string
}

interface Group {
  label: string,
  levels: string[],
  grammar_version: number,
  requires: string[]
}

interface Level {
  tooltip: string,
  description: string,
  initial_code: string,
  in: string,
  out: string,
  constraints: string,
  ex_in: string,
  ex_out: string,
  requires: string[]
}

interface LevelsData {
  texts: { [key: string]: Text },
  groups: { [key: string]: Group },
  levels: { [key: string]: Level }
}

let levels_data: LevelsData; //data will exist when a button is clicked: ok in the future


onMounted(async () => {
  try {
    const response = await fetch('levels_contents.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    levels_data = await response.json();
    //call create graph
    build_lvl_graph(levels_data);
  } catch (error) {
    console.error('Error fetching JSON:', error)
  }
});




// Graph build

/**
 * Generate n colors evenly spaced on the rainbow hue.
 * @param n numbers of colors to generate.
 * @returns An array of n colors.
 */
function rainbowInterpolation(n: number) {
  const colors = [];
  for (let i: number = 0; i < n; ++i)
    colors.push(hsl((360 / n) * i, 100, 80, 1));
  return colors;
}

const dot = ref<string>(`digraph {}`);

/* function to build the lvl graph */
function build_lvl_graph(levels_data: LevelsData) {

  const texts = levels_data.texts;
  const groups = levels_data.groups;
  const levels = levels_data.levels;

  // Create the dot graph from the JSON file
  let dot_levels: string = "digraph {";
  // Global setup
  dot_levels += `graph [fontsize=10 fontname="Verdana" compound=true clusterrank=local style=filled color=pink];`;
  dot_levels += `node [shape=record fontsize=10 fontname="Verdana" style=filled fillcolor=white];`;

  // Create clusters corresponding to a group
  let cluster_i: number = 0;
  const clusters_ids: { [key: string]: number } = {};
  const colors: HSLColor[] = rainbowInterpolation(Object.entries(groups).length);
  for (const group_name in groups) {
    // Create the cluster
    clusters_ids[group_name] = cluster_i;
    dot_levels += `subgraph cluster_${cluster_i.toString()} {`;
    dot_levels += `style=filled;color="${colors[cluster_i].formatHex()}";node [style=filled color=white];`;

    // Get the nodes in the group
    const group: Group = groups[group_name];
    const level_names: string[] = group.levels;
    // Create the cluster's nodes
    for (const level_name of level_names) {
      dot_levels += `${level_name} [label="${level_name}" tooltip="${levels[level_name].tooltip}" tag="test"];`;
    }
    // Create the cluster's edges
    for (const level_name of level_names) {
      const level_requires: string[] = levels[level_name].requires;
      for (const required_level of level_requires) {
        dot_levels += `${required_level} -> ${level_name};`;
      }
    }
    // Set the cluster's label
    dot_levels += `label="${group.label}"`;

    dot_levels += "}";
    ++cluster_i;
  }

  // Set the text nodes
  for (const text_name in texts) {
    dot_levels += `${text_name} [tooltip="${texts[text_name].tooltip}"];`;
  }
  // Set the text edges
  for (const text_name in texts) {
    const text: Text = texts[text_name];
    if (text.from) {
      const prev: string = groups[text.from].levels[0];
      dot_levels += `${prev} -> ${text_name} [ltail="cluster_${clusters_ids[text.from].toString()}"];`;
    }
    if (text.to) {
      const next: string = groups[text.to].levels[0];
      dot_levels += `${text_name} -> ${next} [lhead="cluster_${clusters_ids[text.to].toString()}"];`;
    }
  }

  // Close the dot string
  dot_levels += "}";

  // Update the dot value
  dot.value = dot_levels;
}



// Click and links

onMounted(() => {
  if (process.client) {
    function handleBodyClick(event) {
      if (event.target.tagName === "text" && event.target.parentNode && event.target.parentNode.tagName === 'a') {
        start_level(event.target.textContent);
      }
      else if (event.target.tagName === 'polygon'
        && event.target.nextElementSibling && event.target.nextElementSibling.tagName === "text"
        && event.target.parentNode && event.target.parentNode.tagName === 'a') {
        start_level(event.target.nextElementSibling.textContent);
      }
    }
    document.body.addEventListener('click', handleBodyClick);
  }
});

function start_level(name: string) {
  // check list of levels: is this one accessible?
  let [ob, type] = search_in_levels(name);
  if (type === 0) {
    //text: check from
    if (ob["from"] != null) {
      let required = levels_data["groups"][ob["from"]]["levels"];
      let passed = read_completed_lvl();
      let res = "";

      for (const e of required) {
        if (!(passed.includes(e))) { res += e + ", " }
      }
      if (res.length > 0) {
        alert("You must before pass " + res.slice(0, -2));
        return;
      }
    }
    // follow link
    localStorage.setItem("current_level", name);
    window.location.href = "/levels/id/text"
  } else {
    //level: group where i am is unblock && check requires
    let group = find_group_of_lvl(name);
    let required = group["requires"];
    let passed = read_completed_lvl();
    let res = "";
    for (const e of required) {
      if (!(passed.includes(e))) { res += e + ", " }
    }
    if (res.length > 0) {
      alert("You must before pass " + res.slice(0, -2));
      return;
    }

    required = ob["requires"];
    for (const e of required) {
      if (!(passed.includes(e))) { res += e + ", " }
    }
    if (res.length > 0) {
      alert("You must before pass " + res.slice(0, -2));
      return;
    }
    // follow link
    localStorage.setItem("current_level", name);
    window.location.href = "/levels/id/"
  }
}

function search_in_levels(name: string) {
  // find a level or a text in levels_data
  if (name in levels_data["texts"]) {
    return [levels_data["texts"][name], 0];
  }
  if (name in levels_data["levels"]) {
    return [levels_data["levels"][name], 1];
  }
}

function find_group_of_lvl(name: string) {
  //find the group level name belongs to
  for (const e in levels_data["groups"]) {
    if (levels_data["groups"][e]["levels"].includes(name)) { return levels_data["groups"][e]; }
  }
}

function read_completed_lvl() {
  // read completed_lvl in localStorage
  let res = localStorage.getItem("completed_lvl");
  if (res == null) return [];
  return JSON.parse(res);
}

</script>

<style>
.graph {
  width: 100%;
  margin: 0;
}

body {
  overflow: auto;
  /*background-color: white;*/
}

svg a * {
  cursor: pointer;
}

.nuxt-link {
  font-family: "Press Start 2P", sans-serif;
  color: darkslateblue;
}
</style>
