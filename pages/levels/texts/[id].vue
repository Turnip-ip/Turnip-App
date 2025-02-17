<template>
  <div>
    <NuxtImg
      src="/background.jpg"
      class="background"
    ></NuxtImg>
    <div class="popup">
      <div class="darkslateblue mainContent">
        <MarkdownRender :source="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LevelsData } from "~/lib/levels_data";
import MarkdownRender from "vue-markdown-render";

const route = useRoute();

const currentTextId: string = route.params.id as string;

const content = LevelsData.texts[currentTextId].content;

// add to completed
onMounted(() => {
  add_completed_lvl(currentTextId);
});

function add_completed_lvl(textId: string) {
  // read completed_lvl in localStorage

  const res = localStorage.getItem("completed_lvl");

  const arr_compl = res != null ? (JSON.parse(res) as string[]) : [];

  // add and save
  if (!arr_compl.includes(textId)) arr_compl.push(textId);
  localStorage.setItem("completed_lvl", JSON.stringify(arr_compl));
}
</script>

<style>
.background {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

body {
  overflow: hidden;
}

.mainContent h2 {
  font: bold normal 30px/40px serif;
  text-decoration-line: underline;
}

.mainContent {
  width: 100%;
  height: 100%;
  font-size: clamp(14px, 2vw, 24px);
  overflow-y: auto;
  padding: 20px;
  text-align: left;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.popup {
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(300px, 90vw, 1200px);
  height: clamp(300px, 75vh, 900px);
  background-color: rgb(240, 223, 201);
  border: 5px solid black;
  border-radius: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vw;
  overflow: hidden;
}

.mainContent code {
  background-color: #777a;
  padding: 0 5px;
  border-radius: 5px;
  display: inline-block;
}
</style>
