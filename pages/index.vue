<template>
  <div>
    <NuxtImg
      src="/background.jpg"
      class="imag"
    />

    <div class="background">
      <TurnipText class="titreJeu" />
      <NuxtImg
        src="/Turnip_Boy_Portrait_sans_background.jpeg"
        class="turnip"
      />
      <button
        v-if="playVisible"
        id="playButton"
        class="retro-button"
        @click="openWindow"
      >
        Play
      </button>
    </div>

    <div
      v-if="windowOpen"
      class="popup"
    >
      <div class="titreMessage h-1/4">Welcome to TURN'IP!</div>
      <div class="contentMessage h-1/2">{{ popupMessages[index] }}</div>
      <button
        class="retro-button continue-button"
        @click="nextMessage"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const windowOpen = ref(false);
const playVisible = ref(true);

console.log(playVisible.value);
const index = ref(0);
const popupMessages = [
  "This is a game in which you will learn how Turing Machines work",
  "Each level presents you with a problem to solve, along with constraints, examples, and inputs & outputs. Your goal is to solve as many levels as you can!",
  "Your mission? Solve as many levels as possible and master the art of computation!",
  "Every function you write becomes a tool for future challenges",
  "But beware—some levels are locked! To unlock them, you'll need to conquer multiple challenges in a cluster.",
  "To start playing, click on the Levels button on the top left!",
];

function openWindow() {
  windowOpen.value = true;
  playVisible.value = false;
}

async function nextMessage() {
  if (index.value < popupMessages.length - 1) {
    index.value++;
  } else {
    windowOpen.value = false;
    playVisible.value = true;
    await navigateTo("/levels");
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

.background {
  position: absolute;
  top: 78px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 78px);
}

.popup {
  position: fixed;
  z-index: 1000;
  top: 39%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: clamp(250px, 50vh, 850px);
  width: clamp(150px, 70vw, 800px);
  background-color: rgb(240, 223, 201);
  border: 5px solid black;
  border-radius: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.retro-button {
  font-family: "Press Start 2P", sans-serif;
  font-size: 20px;
  background: #e49ce4;
  color: #644606;
  padding: clamp(20px, 5vw, 40px) clamp(40px, 10vw, 80px);

  border: 4px solid #0a4861;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 4px 4px 0px #000;
  outline: none;
  transition: all 0.1s ease-in-out;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: clamp(100px, 30vh, 300px);
}

.continue-button {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
}

body {
  overflow: hidden;
  /* Prevents scrolling and layout shifts */
}

.retro-button:hover {
  background: #8ad4bb;
}

.retro-button:active {
  box-shadow: 2px 2px 0px #000;
}

.titreJeu {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(300px, 40vw, 800px);
  height: auto;
}

.titreMessage {
  font-family: "Press Start 2P";
  font-size: clamp(17px, 4vw, 35px);
  color: crimson;
}

.contentMessage {
  position: absolute;
  font-family: "Press Start 2P";
  font-size: clamp(15px, 2vw, 25px);
  text-align: center;
  top: 25%;
}

.imag {
  position: absolute;
  top: 77px;
  left: 0;
  width: 100%;
  height: calc(100vh - 77px);
  overflow: hidden;
}

.turnip {
  position: absolute;
  bottom: clamp(60px, 16vh, 160px);
  left: 2%;
  width: clamp(150px, 20vw, 400px);
  height: auto;
}
</style>
