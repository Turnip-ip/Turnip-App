<template>
  <!-- 
  <NuxtImg src="/background.jpg" class="imag" /> -->
  <div class="texte">
    <!-- Centered text content -->
    <div class="mt-10 flex flex-col items-center justify-center gap-2">
      <div class="press-start">Level {{ currentLevelId }}</div>

      <div class="w-2/3">{{ level.description }}</div>

      <div class="input">Input : {{ level.in }}</div>
      <div class="output">Output : {{ level.out }}</div>
      <div class="constraints">constraints : {{ level.constraints }}</div>

      <div class="submitText flex flex-col items-end justify-end">
        <div class="cbbl -right press-start">
          Click on
          <NuxtLink
            to="Answer"
            class="darkslateblue hover:underline"
            >Submit</NuxtLink
          >
          to submit your code !
        </div>
        <NuxtImg
          src="Turnip_Boy_Portrait_sans_background.jpeg"
          class="w-20 -translate-x-40"
        >
        </NuxtImg>
        <div class="examples">
          Example of an input (at the left) and the expected output (at the
          right):
        </div>
        <div style="display: flex; column-gap: 10px">
          <DynTape
            :gramm-ver="grammVer"
            :initial-text="initialTextTapeIn"
            :initial-pos="initialPosTapeIn"
          ></DynTape>
          <DynTape
            :gramm-ver="grammVer"
            :initial-text="initialTextTapeOut"
            :initial-pos="initialPosTapeOut"
          ></DynTape>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "~/assets/css/cbbl.styl";

import { LevelsData } from "~/lib/levels_data";
import { find_group_of_lvl } from "~/lib/tools";

const route = useRoute();

const currentLevelId: string = route.params.id as string;

const level = LevelsData.levels[currentLevelId];

definePageMeta({
  layout: "level",
});

// add tapes
const grammVer = find_group_of_lvl(currentLevelId, LevelsData).grammar_version;
let initialTextTapeIn = LevelsData.levels[currentLevelId].ex_in;
let initialTextTapeOut = LevelsData.levels[currentLevelId].ex_out;
let initialPosTapeIn, initialPosTapeOut;
// let tapeIn, tapeOut;
if (grammVer == 0) {
  initialPosTapeIn = initialTextTapeIn.lastIndexOf(".");
  initialPosTapeOut = initialTextTapeOut.lastIndexOf(".");
  initialTextTapeIn = initialTextTapeIn.replace(/\./g, ""); //remove the "."
  initialTextTapeOut = initialTextTapeOut.replace(/\./g, ""); //remove the "."
}
</script>

<style scoped>
/* Ensures the text is centered vertically and horizontally */
.h-screen {
  height: 100vh;
}

.imag {
  z-index: 0;
}
.input {
  z-index: 30;
}
.texte {
  z-index: 100;
}
</style>
