<template>
    <GraphView :dot="dot" class="h-82 m-4 w-72" />
</template>

<script setup lang="ts">
import { hsl, type HSLColor, select } from "d3";

//import levels_data from "./assets/json/levels_content.json";

interface JSONLevelsFile {
  texts: {
    [key: string]: Text;
  };
  groups: {
    [key: string]: Group;
  };
  levels: {
    [key: string]: Level;
  };
}

interface Text {
  /**
   * Actual text content to read.
   */
  content: string;
  /**
   * Group ID from the Group unlocking this text.
   */
  from?: string;
  /**
   * Group IDs unlocked after having read this text.
   */
  to?: string;
}

interface Group {
  /**
   * Label of the group to display on the graph.
   */
  label: string;
  /**
   * Levels in the group.
   */
  levels: string[];
  /**
   * Text node IDs that need to be read to unlock this group.
   */
  requires: string[];
}

interface Level {
  /**
   * Tooltip to show when hovering the graph node.
   */
  tooltip: string;
  /**
   * Description of the level.
   */
  description: string;
  /**
   * Code to load inside the code window when selecting this level.
   */
  initial_code: string;
  /**
   * Which levels need to be completed to unlock this level.
   */
  requires: string[];
}

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
/**
 * Gets the clicked HTML element from the 'click' event and retrieves the name
 * of the level to load.
 *
 * @param picked_element HTMLNode from a click element in the svg generated from a dot string.
 *
 * @return The name of the clicked level as a string.
 */
function level_name_from_target(picked_element: HTMLInputElement) {
  let parent_node: HTMLElement = picked_element;

  // Go up to the g path parent node
  while (!parent_node.id.startsWith("node")) {
    parent_node = parent_node.parentNode as HTMLElement;
  }

  // Check if we have a node in a cluster (a regular level)
  // or a text node only containing explainations.
  if (parent_node.children.length == 3) {
    // Text node
    // <g>
    //   <title>
    //   <polygon>
    //   <text>
    return parent_node.children[2].textContent;
  } else if (parent_node.children.length == 2) {
    // Go back into the children to find the text element and its content
    // <g>
    //   <title>
    //   <g>
    //     <a>
    //       <polygon>
    //       <text>
    return parent_node.children[1].children[0].children[1].textContent;
  }
}

/**
 * TODO
 * @param e Click event triggered.
 */
function nodeClickHandler(e: Event) {
  console.log("CLICKED ON A NODE");
  const level_name = level_name_from_target(e.target as HTMLInputElement);
  console.log(level_name);
  if (level_name != undefined) console.log(levels[level_name]);
}

const dot = ref<string>(`digraph {}`);

const levels_data: JSONLevelsFile = {
  texts: {
    text0: {
      content: "text0",
      to: "Tutorial",
    },
    text1: {
      content: "text1",
      from: "Tutorial",
      to: "Tapes",
    },
    text2: {
      content: "text2",
      from: "Tutorial",
      to: "Basics",
    },
  },

  groups: {
    Tutorial: {
      label: "Tutorial",
      levels: ["ZERO", "MOVE_L", "MOVE_R"],
      requires: [],
    },
    Tapes: {
      label: "Working with 2 tapes",
      levels: ["ZERO_2", "COPY_TO_MAIN", "COPY_TO_WORK"],
      requires: ["text1"],
    },
    Basics: {
      label: "Basic Operations",
      levels: ["ADD1", "SUB1", "NEG"],
      requires: ["text2"],
    },
  },

  levels: {
    ZERO: {
      tooltip: "Writing a 0 on the tape",
      description:
        "An example Turing Machine (TM) to get you started\nHere, you have a TM that writes 0 to the tape and moves right.\n\nWe would rather want to write 0 and stay on the same spot. Add states and/or state rules to go back left after having written the 0.",
      initial_code:
        "// We start by declaring the START State\nSTART\n// Then we declare a rule that reads any bit b and writes a 0 at that same spot,\n// Then moves right (R) and goes to the state END to end the execution of the Turing Machine\n| 0 -> (0, R), END\n| 1 -> (0, R), END\n",
      requires: [],
    },
    MOVE_R: {
      tooltip: "Moving head Right",
      description:
        "Write a TM that only moves right and does not modify anything on the tape.",
      initial_code:
        "// Declaring a state:\n// START\n// | read_char -> (written_char, head_move), target_state\n",
      requires: ["ZERO"],
    },
    MOVE_L: {
      tooltip: "Moving head Left",
      description:
        "Write a TM that only moves left and does not modify anything on the tape.",
      initial_code:
        "// Declaring a state:\n// START\n// | read_char -> (written_char, head_move), target_state\n",
      requires: ["ZERO"],
    },
    ZERO_2: {
      tooltip: "Reading and writing with 2 tapes",
      description:
        "Write 0 on both tapes and return the head at its initial position.",
      initial_code: "",
      requires: [],
    },
    COPY_TO_MAIN: {
      tooltip: "Copy to the Main tape",
      description:
        "Copy the content of the Working tape to the Main tape.\n\nINPUT: arbitraty bit string on the Working tape.",
      initial_code: "",
      requires: ["ZERO_2"],
    },
    COPY_TO_WORK: {
      tooltip: "Copy to the Work tape",
      description:
        "Copy the content of the Main tape to the Working tape.\n\nINPUT: arbitrary bit string on the Main tape.",
      initial_code: "",
      requires: ["ZERO_2"],
    },
    ADD1: {
      tooltip: "Adding 1 to an input: x + 1",
      description:
        "Add 1 to a number written in binary form (modulo 256)\n\nINPUT: number between 0 and 255 in binary form.",
      initial_code: "",
      requires: [],
    },
    SUB1: {
      tooltip: "Subtracting 1 to an input: x - 1",
      description:
        "Subtract 1 from a number written in binary form (modulo 256)\n\nINPUT: number between 0 and 255 in binary form.",
      initial_code: "",
      requires: [],
    },
    NEG: {
      tooltip: "Negating an input: -x",
      description:
        "Negate a binary number (Two's complement) in place\n\nINPUT: number between -128 and 127 in binary form.",
      initial_code: "",
      requires: [],
    },
  },
};

const texts: { [key: string]: Text } = levels_data.texts;
const groups: { [key: string]: Group } = levels_data.groups;
const levels: { [key: string]: Level } = levels_data.levels;

// Create the dot graph from the JSON file
let dot_levels: string = "digraph {";
// Global setup
dot_levels += `graph [fontsize=10 fontname="Verdana" compound=true clusterrank=local];`;
dot_levels += `node [shape=record fontsize=10 fontname="Verdana" style=filled color=silver];`;

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
  dot_levels += `${text_name} [tooltip=TODO];`;
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

// Click and links

import { onMounted } from 'vue';

onMounted(() => {
  if (process.client) {
    function handleBodyClick(event) {
      if (event.target.tagName === "text") {
          start_level(event.target.textContent);
      }
      else if (event.target.tagName === 'polygon'
        && event.target.nextElementSibling && event.target.nextElementSibling.tagName === "text"
        && !(event.target.parentElement && event.target.parentElement.classList.contains('cluster'))) {
          start_level(event.target.nextElementSibling.textContent);
      }
    }
    document.body.addEventListener('click', handleBodyClick);
  }
});

function start_level(name) {
  console.log(name);
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
        return ;
      }
    }
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
      return ;
    }

    required = ob["requires"];
    for (const e of required) {
      if (!(passed.includes(e))) { res += e + ", " }
    }
    if (res.length > 0) {
      alert("You must before pass " + res.slice(0, -2));
      return ;
    }
  }
  
  // follow link +++to change if text??
  localStorage.setItem("current_level", name);
  window.location.href = "/levels/id/"
}

function search_in_levels(name) {
  // find a level or a text in levels_data
  if (name in levels_data["texts"]) {
    return [levels_data["texts"][name], 0];
  }
  if (name in levels_data["levels"]) {
    return [levels_data["levels"][name], 1];
  }
}

function find_group_of_lvl (name) {
  for (const e in levels_data["groups"]) {
    if (levels_data["groups"][e]["levels"].includes(name)) { return levels_data["groups"][e]; }
  }
}

function read_completed_lvl() {
  // read completed_lvl in localStorage
  let res = localStorage.getItem("completed_lvl");
  if (res==null) return [];
  return JSON.parse(res);
}








/*
onMounted(async () => {

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
      if (xhr.status === 200) {
          var res = xhr.responseText;
          console.log(res);
      }
  };

  xhr.open('GET', '/levels/levels_contents.json');
  xhr.send();

});
*/


</script>

<style>
.graph{
  width: 100%;
  margin: 0;
}
body{
  overflow: auto;
}
svg a *{
  cursor: pointer;
}
.nuxt-link{
  font-family: "Press Start 2P", sans-serif;
  color:darkslateblue;
}
</style>
