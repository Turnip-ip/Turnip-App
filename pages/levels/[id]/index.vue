<template>
  <div>
    <!-- Centered text content -->
    <div class="flex h-screen items-center justify-center">
      <div class="imageBubble">
        <NuxtImg src="bubble_speech.png"></NuxtImg>
      </div>
      <div class="imageTurnip">
        <NuxtImg src="Turnip_Boy_Portrait_sans_background.jpeg"></NuxtImg>
      </div>
      <!-- pour la demo, a modifier quand on fera l'integration de toutes les questions-->
      <div v-if="questionText" class="questionText">{{ questionText }}</div>
      <!--<div class="questionText">Given the current position on the tape, write a program to move the cursor to the right.</div>-->

      <div class="ConstraintsTitle">Constraints</div>

      <div v-if="input" class="input">intput : {{ input }}</div>
      <div v-if="output" class="output">output : {{ output }}</div>
      <div v-if="constraints" class="constraints">constraints : {{ constraints }}</div>

      <div class="submitText">
        Click on
        <NuxtLink to="/levels/id/Answer" class="answer">Answer</NuxtLink>
        to submit your code !
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
const route = useRoute()

import { LevelsData } from '~/lib/levels_data';
const questionText = ref(""); // Use ref to make it reactive
const input = ref(""); // Use ref to make it reactive
const output = ref("");
const constraints = ref("");


const currentLevelId: string = route.params.id as string;

//if undefined cest que le niveau n'est pas encore choisi !
questionText.value = LevelsData.levels[currentLevelId].description; // Update the reactive `questionText`
input.value = LevelsData.levels[currentLevelId].in; // Update the reactive `questionText`
output.value = LevelsData.levels[currentLevelId].out; // Update the reactive `questionText`
constraints.value = LevelsData.levels[currentLevelId].constraints; // Update the reactive `questionText`


//au debut que levels
// puis mettre levels,
//aura un titre

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
