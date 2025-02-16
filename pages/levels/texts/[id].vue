<template>
  <div class="flex items-center justify-center p-10">
    <div class="darkslateblue press-start">
      <MarkdownRender :source="content" />
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
