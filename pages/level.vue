<template>
  <div>
    <GraphView
      :dot="dot"
      class="h-82 m-4 w-72"
    />
  </div>
</template>

<script setup lang="ts">
interface BaseNode {
  //name: string;
  type: "text" | "group" | "level";
  group?: string;
  parents: string[];
}

interface Level extends BaseNode {
  type: "level";
}
interface Group extends BaseNode {
  type: "group";
}
interface Text extends BaseNode {
  type: "text";
}

const dot = ref<string>(`digraph {a -> b}`);

const data: { [name: string]: Level | Group | Text } = {
  text0: {
    type: "text",
    parents: [],
  },
  Tutorial: {
    type: "group",
    parents: ["text0"],
  },
  ZERO: {
    type: "level",
    //"description": "...",
    //"inital_tunip_code": "...",
    group: "Tutorial",
    parents: [],
  },
  MOVE_R: {
    type: "level",
    //"description": "...",
    //"inital_tunip_code": "...",
    group: "Tutorial",
    parents: ["ZERO"],
  },
};

for (const name in data) {
  const value = data[name];
  // Use `key` and `value`
  console.log(name, value);

  // TODO
}
</script>
