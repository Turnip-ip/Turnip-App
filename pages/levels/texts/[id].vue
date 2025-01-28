<template>
  <div class="flex h-screen items-center justify-center">
    <div class="darkslateblue press-start"> {{ content }}</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

import { LevelsData } from '~/lib/levels_data';

const currentTextId: string = route.params.id as string;

const content = LevelsData.texts[currentTextId].content;

// add to completed
add_completed_lvl(currentTextId);

function add_completed_lvl(textId: string) {
  // read completed_lvl in localStorage
  let arr_compl;
  let res = localStorage.getItem("completed_lvl");
  if (res == null) arr_compl = [];
  else arr_compl = JSON.parse(res);
  // add and save
  if (!arr_compl.includes(textId)) arr_compl.push(textId);
  localStorage.setItem("completed_lvl", JSON.stringify(arr_compl));
}
</script>

<style scoped>
/* Ensures the text is centered vertically and horizontally */
.h-screen {
  height: 100vh;
}
</style>
