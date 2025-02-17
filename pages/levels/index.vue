<template>
  <NuxtImg src="\background.jpg" class="background"></NuxtImg>
  <div class="graph-container">
    <GraphView :dot="dot" class="h-82 m-4 w-72" @click="handleLevelGraphClick" />
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app";

import { LevelsData } from "~/lib/levels_data";
import { find_group_of_lvl } from "~/lib/tools";
import type { Group, Level, TextPage } from "~/lib/types";

const dot = build_lvl_graph();

// Graph build

/**
 * Generate n colors evenly spaced on the rainbow hue.
 * @param n numbers of colors to generate.
 * @returns An array of n colors.
 */
function rainbowInterpolation(n: number) {
  return ["#d1cfe2", "#9cadce", "#7ec4cf", "#daeaf6"].slice(0, n);
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
  dot_levels += `graph [fontsize=10 fontname="Verdana" compound=true clusterrank=local style=filled  bgcolor=transparent image="/background.jpg" imagescale=true ];`;
  dot_levels += `node [shape=octagon fontsize=10 fontname="Verdana" style=filled fillcolor=white];`;

  // Create clusters corresponding to a group
  let cluster_i: number = 0;
  const clusters_ids: { [key: string]: number } = {};
  const colors: string[] = rainbowInterpolation(Object.entries(groups).length);
  for (const group_name in groups) {
    // Create the cluster
    clusters_ids[group_name] = cluster_i;
    dot_levels += `subgraph cluster_${cluster_i.toString()} {`;
    dot_levels += `style=filled; color="${colors[cluster_i]}";`;
    dot_levels += `style=filled;color="${colors[cluster_i]}";node [style=filled color=grey]`;

    dot_levels += `invisibleNode [style=invisible];`;

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

async function handleLevelGraphClick(event: Event) {
  const target = event.target as HTMLInputElement;
  if (
    target.tagName === "text" &&
    target.parentElement &&
    target.parentElement.tagName === "a"
  ) {
    await start_level(target.textContent);
  } else if (
    target.tagName === "polygon" &&
    target.nextElementSibling &&
    target.nextElementSibling.tagName === "text" &&
    target.parentElement &&
    target.parentElement.tagName === "a"
  ) {
    await start_level(target.nextElementSibling.textContent);
  }
}

async function start_level(name: string) {
  // check list of levels: is this one accessible?
  const { level, text } = search_in_levels(name);
  if (text) {
    //text: check from
    if (text.from != null) {
      const required = LevelsData.groups[text.from].levels;
      const passed = read_completed_lvl();
      let res = "";

      for (const e of required) {
        if (!passed.includes(e)) {
          res += e + ", ";
        }
      }
      if (res.length > 0) {
        alert("You must before pass " + res.slice(0, -2));
        return;
      }
    }
    // follow link
    await navigateTo(`/levels/texts/${name}`);
  } else if (level) {
    //level: group where i am is unblock && check requires
    const group = find_group_of_lvl(name, LevelsData);
    let required = group["requires"];
    const passed = read_completed_lvl();
    let res = "";
    for (const e of required) {
      if (!passed.includes(e)) {
        res += e + ", ";
      }
    }
    if (res.length > 0) {
      alert("You must before pass " + res.slice(0, -2));
      return;
    }

    required = level.requires;
    for (const e of required) {
      if (!passed.includes(e)) {
        res += e + ", ";
      }
    }
    if (res.length > 0) {
      alert("You must before pass " + res.slice(0, -2));
      return;
    }
    await navigateTo(`/levels/${name}/`);
  }
}

function search_in_levels(name: string): {
  level?: Level;
  text?: TextPage;
} {
  // find a level or a text in levels_data
  return {
    level: LevelsData.levels[name],
    text: LevelsData.texts[name],
  };
}

function read_completed_lvl() {
  // read completed_lvl in localStorage
  const res = localStorage.getItem("completed_lvl");

  return res != null ? (JSON.parse(res) as string[]) : [];
}
</script>

<style>
.graph {
  width: 100%;
  margin: 0;
  z-index: 1001;
}

.background {
  z-index: 0;
}

.graph-container {
  height: 100%;
  z-index: 1000;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
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
