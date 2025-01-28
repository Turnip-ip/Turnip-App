<template>
  <GraphView :dot="dot" class="h-82 m-4 w-72" />
</template>

<script setup lang="ts">
import { hsl, type HSLColor, select } from "d3";
import { navigateTo } from "nuxt/app";

import { onMounted } from 'vue';
import { LevelsData } from "~/lib/levels_data";
import { PageType, type Data, type Group, type TextPage } from "~/lib/types";

const dot = build_lvl_graph();

// Graph build

/**
 * Generate n colors evenly spaced on the rainbow hue.
 * @param n numbers of colors to generate.
 * @returns An array of n colors.
 */
function rainbowInterpolation(n: number) {
  return ["#d1cfe2", "#9cadce", "#7ec4cf", "#daeaf6"].slice(0, n);


  const colors = [];
  colors.push(hsl(246, 24.7, 84.9, 1));
  colors.push(hsl(220, 33.8, 71, 1));
  colors.push(hsl(188, 45.8, 65.3, 1));
  colors.push(hsl(206, 60.9, 91, 1));


  //for (let i: number = 0; i < n; ++i)
  // colors.push(hsl((360 / n) * i, 100, 80, 1));
  return colors;
}


/** 
 * Function to build the lvl graph 
 * Return the corresponding dot graph
 */
function build_lvl_graph(): string {

  const texts = LevelsData.texts;
  const groups = LevelsData.groups;
  const levels = LevelsData.levels;

  // Create the dot graph from the JSON file
  let dot_levels: string = "digraph {";
  // Global setup
  dot_levels += `graph [fontsize=10 fontname="Verdana" compound=true clusterrank=local style=filled bgcolor=pink ];`;
  dot_levels += `node [shape=octagon fontsize=10 fontname="Verdana" style=filled fillcolor=white];`;

  // Create clusters corresponding to a group
  let cluster_i: number = 0;
  const clusters_ids: { [key: string]: number } = {};
  const colors: HSLColor[] = rainbowInterpolation(Object.entries(groups).length);
  for (const group_name in groups) {
    // Create the cluster
    clusters_ids[group_name] = cluster_i;
    dot_levels += `subgraph cluster_${cluster_i} {`;
    dot_levels += `style=filled;color="${colors[cluster_i]}";node [style=filled color=grey]`;

    // Get the nodes in the group
    const group: Group = groups[group_name];
    const level_names: string[] = group.levels;
    // Create the cluster's nodes
    for (const level_name of level_names) {
      dot_levels += `${level_name} [label="${level_name}" tooltip="${levels[level_name].tooltip}" tag="test" ];`;
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
    const text: TextPage = texts[text_name];
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
  return dot_levels;
}



// Click and links

onMounted(() => {
  if (import.meta.client) {
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

async function start_level(name: string) {
  // check list of levels: is this one accessible?
  let { level, text } = search_in_levels(name);
  if (text) {
    //text: check from
    if (text.from != null) {
      let required = LevelsData.groups[text.from].levels;
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
    await navigateTo(`/levels/texts/${name}`)

  } else if (level) {
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

    required = level.requires;
    for (const e of required) {
      if (!(passed.includes(e))) { res += e + ", " }
    }
    if (res.length > 0) {
      alert("You must before pass " + res.slice(0, -2));
      return;
    }
    await navigateTo(`/levels/${name}/`)
  }
}

function search_in_levels(name: string) {
  // find a level or a text in levels_data
  return {
    level: LevelsData.levels[name],
    text: LevelsData.texts[name]
  }
}

function find_group_of_lvl(name: string) {
  //find the group level name belongs to
  for (const e in LevelsData.groups) {
    if (LevelsData.groups[e].levels.includes(name)) { return LevelsData.groups[e]; }
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
