<template>
  <div>
    <!-- Centered text content -->
    <div class="flex flex-col h-screen items-center justify-center gap-2">

      <div class="press-start">Level {{ currentLevelId }}</div>

      <div class="w-2/3">{{ level.description }}</div>

      <div class="input">Input : {{ level.in }}</div>
      <div class="output">Output : {{ level.out }}</div>
      <div class="constraints">constraints : {{ level.constraints }}</div>

      <div class="submitText flex flex-col items-end justify-end">

        <div class="cbbl -right press-start">
          Click on
          <NuxtLink to="Answer" class="darkslateblue hover:underline">Answer</NuxtLink>
          to submit your code !
        </div>
        <NuxtImg src="Turnip_Boy_Portrait_sans_background.jpeg" class="w-20 -translate-x-40">
        </NuxtImg>
      </div>
      <div class="examples">Example of an input (at the left) and the expected output (at the right):</div>
      <div style="display: flex;column-gap: 10px;">
        <DynTape :grammVer="grammVer" :initialText="initialTextTapeIn" :initialPos="initialPosTapeIn"></DynTape>
        <DynTape :grammVer="grammVer" :initialText="initialTextTapeOut" :initialPos="initialPosTapeOut"></DynTape>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">

import '~/assets/css/cbbl.styl'

const route = useRoute()

import { LevelsData } from '~/lib/levels_data';

const currentLevelId: string = route.params.id as string;

const level = LevelsData.levels[currentLevelId]

definePageMeta({
  layout: "level",
});

// add tapes
let grammVer=find_group_of_lvl(currentLevelId).grammar_version;
let initialTextTapeIn=LevelsData.levels[currentLevelId].ex_in;
let initialTextTapeOut=LevelsData.levels[currentLevelId].ex_out;
let initialPosTapeIn=0, initialPosTapeOut=5;
if (grammVer==0) {
  initialPosTapeIn=initialTextTapeIn.lastIndexOf(".");
  initialPosTapeOut=initialTextTapeOut.lastIndexOf(".");
  initialTextTapeIn = initialTextTapeIn.replace(/\./g, ''); //remove "."
  initialTextTapeOut = initialTextTapeOut.replace(/\./g, ''); //remove "."
}
function find_group_of_lvl(name: string) {
  //find the group level name belongs to
  for (const e in LevelsData.groups) {
    if (LevelsData.groups[e].levels.includes(name)) { return LevelsData.groups[e]; }
  }
}

</script>

<style scoped>
/* Ensures the text is centered vertically and horizontally */
.h-screen {
  height: 100vh;
}
</style>
