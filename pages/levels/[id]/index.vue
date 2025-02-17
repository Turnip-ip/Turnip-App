<template>
  <div>
    <NuxtImg
      src="/background.jpg"
      class="imag"
    />

    <!--<NuxtImg src="/bubble_speech.png" class="bubblespeech" />-->

    <NuxtImg
      src="/Turnip_Boy_Portrait_sans_background.jpeg"
      class="turnip"
    />

    <div class="cbbl -right press-start">
      Click on
      <NuxtLink
        to="Answer"
        class="darkslateblue hover:underline"
        >Submit</NuxtLink
      >
      to submit your code !
    </div>

    <div class="questionPopups">
      <div class="questionPopup question">
        <div class="title">Question</div>
        <div class="questionContent">{{ level.description }}</div>
      </div>
      <div class="questionPopup constraints">
        <div class="title">Constraints</div>
        <div class="io">
          <div class="TitleAndContent">
            <div class="iotitle">Input</div>
            <div class="description">{{ level.in }}</div>
          </div>
          <div class="arrow">→</div>

          <div class="TitleAndContent">
            <div class="iotitle">Output</div>
            <div class="description">{{ level.out }}</div>
          </div>
        </div>

        <div class="constraintsTitleAndContent">
          <div class="warning">⚠️</div>
          <div class="constraintDesc">{{ level.constraints }}</div>
        </div>
      </div>
      <div class="questionPopup example">
        <div class="title">Example</div>
        <div
          class="tapes"
          style="display: flex; column-gap: 10px"
        >
          <div class="inputTape">
            <div class="iotitle">Input</div>
            <DynTape
              :gramm-ver="grammVer"
              :initial-text="initialTextTapeIn"
              :initial-pos="initialPosTapeIn"
            ></DynTape>
          </div>
          <div class="outputTape">
            <div class="iotitle">Output</div>
            <DynTape
              :gramm-ver="grammVer"
              :initial-text="initialTextTapeOut"
              :initial-pos="initialPosTapeOut"
            >
            </DynTape>
          </div>
        </div>
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

// add tapes
let initialTextTapeIn = LevelsData.levels[currentLevelId].ex_in;
let initialTextTapeOut = LevelsData.levels[currentLevelId].ex_out;
let initialPosTapeIn: number, initialPosTapeOut: number;
// let tapeIn, tapeOut;
if (level.grammar_version == 0) {
  initialPosTapeIn = initialTextTapeIn.lastIndexOf(".");
  initialPosTapeOut = initialTextTapeOut.lastIndexOf(".");
  initialTextTapeIn = initialTextTapeIn.replace(/\./g, ""); //remove the "."
  initialTextTapeOut = initialTextTapeOut.replace(/\./g, ""); //remove the "."  25
}
</script>

<style scoped>
.imag {
  position: absolute;
  top: 77px;
  left: 0;
  width: 100%;
  height: calc(100vh - 78px);
  overflow: hidden;
}

.turnip {
  position: absolute;
  bottom: clamp(60px, 16vh, 160px);
  left: 1.5%;
  width: clamp(150px, 20vw, 400px);
  height: auto;
}

.cbbl {
  position: absolute;
  bottom: calc(10vh + 200px);
  left: 18%;
  width: clamp(100px, 16vw, 400px);
  height: auto;
}

.warning {
  font-size: clamp(20px, 4vw, 40px);
}

.iotitle {
  font-family: "Montserrat";
  text-transform: uppercase;
  font-weight: bold;
  font-size: clamp(15px, 2vw, 25px);
}

.description {
  font-family: "Montserrat";
  font-size: clamp(13px, 2vw, 20px);
  max-width: 80%;
  word-wrap: break-word;
}

.io {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.arrow {
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  font-size: 60px;
  font-family: "Montserrat";
}

.constraintsTitleAndContent {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2vh;
  padding-bottom: 1vw;
  justify-content: flex-start;
  gap: clamp(2px, 5vw, 50px);
  padding-left: clamp(10px, 4vw, 40px);
  font-family: "Montserrat";
  flex-wrap: wrap;
  width: 100%;
}

.constraintDesc {
  font-size: clamp(5px, 2vw, 20px);
  max-width: 80%;
  word-wrap: break-word;
  min-width: 0;
}

.TitleAndContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
}

.questionPopups {
  position: fixed;
  right: 0;
  top: 78px;
  width: 60vw;
  height: calc(90vh - 178px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.questionPopup {
  width: 55vw;
  height: calc((90vh - 200px) / 3);
  background-color: rgb(240, 223, 201);
  border: 5px solid black;
  border-radius: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
}

.title {
  font-family: "Press Start 2P", sans-serif;
  font-size: clamp(13px, 2vw, 35px);
}

.question {
  background-color: rgb(201, 221, 240);
  overflow: auto;
}

.constraints {
  background-color: rgb(240, 201, 201);
  overflow: auto;
}

.example {
  background-color: rgb(201, 240, 207);
  overflow-x: auto;
}

.input {
  width: 80%;
  font-size: 16px;
}

.questionContent {
  font-size: clamp(12px, 2vh, 25px);
  font-family: "Montserrat";
  flex-grow: 1;
  max-height: 70%;
  word-wrap: break-word;
  padding-right: 10px;
}

.texte {
  z-index: 100;
  background: #ffc0cb;
  overflow: auto;
}
</style>
