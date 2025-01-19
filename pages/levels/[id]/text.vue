<template>
  <div class="flex h-screen items-center justify-center">
    <div id="content"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// load json
onMounted(async () => {
  try {
    const response = await fetch('../../levels_contents.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    let levels_data = await response.json();
    // add text
    let name = localStorage.getItem("current_level");
    let cont = document.getElementById("content");
    cont.textContent = levels_data["texts"][name]["content"];
    // add to completed
    add_completed_lvl(name);
  } catch (error) {
    console.error('Error fetching JSON:', error)
  }
});

function add_completed_lvl(name) {
  // read completed_lvl in localStorage
  let arr_compl;
  let res = localStorage.getItem("completed_lvl");
  if (res==null) arr_compl = [];
  else arr_compl = JSON.parse(res);
  // add and save
  if (! arr_compl.includes(name)) arr_compl.push(name);
  localStorage.setItem("completed_lvl", JSON.stringify(arr_compl));
}
</script>

<style scoped>
/* Ensures the text is centered vertically and horizontally */
.h-screen {
  height: 100vh;
}
#content{
  position: absolute;
  margin: auto 300px;
  font-family: "Press Start 2P", sans-serif;
  color: darkslateblue;
  font-size: 20px;
  text-align: center;
}
</style>

