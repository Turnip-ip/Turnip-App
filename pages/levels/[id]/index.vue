<template>
  <div>
    <!-- Centered text content -->
    <div class="flex h-screen flex-col items-center justify-center gap-2">
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
    </div>
  </div>
</template>


<script setup lang="ts">
import "~/assets/css/cbbl.styl";

import { LevelsData } from "~/lib/levels_data";

const route = useRoute();

const currentLevelId: string = route.params.id as string;

const level = LevelsData.levels[currentLevelId];

definePageMeta({
  layout: "level",
});
</script>

<style scoped>
/* Ensures the text is centered vertically and horizontally */
.h-screen {
  height: 100vh;
}

.imageBubble {
  position: absolute;
  bottom: 40%;
  height: 50%;
  width: 90%;
}

.imageTurnip {
  position: absolute;
  height: 200px;
  width: 400px;
  left: 10%;
}

.input {
  position: absolute;
  height: 18%;
  font-size: 15px;
  font-family: "Press Start 2P", sans-serif;
}

.output {
  position: absolute;
  height: 14%;
  font-size: 15px;
  font-family: "Press Start 2P", sans-serif;
}

.constraints {
  position: absolute;
  height: 10%;
  font-size: 15px;
  font-family: "Press Start 2P", sans-serif;
}

.questionText {
  position: absolute;
  bottom: 63%;
  font-family: "Press Start 2P", sans-serif;
  color: darkslateblue;
  font-size: 30px;
  text-align: center;
  width: 1500px;

}

.ConstraintsTitle {
  position: absolute;
  font-family: "Press Start 2P", sans-serif;
  font-size: 30px;
  height: 23%;
}


.submitText {
  position: absolute;
  font-family: "Press Start 2P", sans-serif;
  z-index: 3;
  font-size: 25px;
  left: 700px;
  bottom: 350px;
}

.answer {
  color: darkslateblue;
}
</style>
