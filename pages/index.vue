<template>
  <div class="flex h-screen flex-col items-center md:flex-row">
    <NuxtImg
      src="/background.jpg"
      class="imag"
    />
    <NuxtImg
      src="/Turnip_Boy_Portrait_sans_background.jpeg"
      class="turnip"
    />
    <TurnipText class="titreJeu" />
    <button
      v-if="playVisible"
      id="playButton"
      class="retro-button ml-56"
      @click="openWindow"
    >
      Play
    </button>

    <div
      v-if="windowOpen"
      class="popup flex h-full flex-col items-center justify-around px-4 py-10"
    >
      <div class="titreMessage h-1/4">Welcome to TURN'IP!</div>
      <div class="contentMessage h-1/2">{{ popupMessages[index] }}</div>
      <button
        class="retro-button ml-56 h-1/4"
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

.popup {
  align-items: center;
  position: fixed;
  z-index: 1000;
  right: 28%;
  top: 13%;
  width: 800px;
  height: 700px;
  background-color: rgb(240, 223, 201);
  border: 5px solid black;
  border-radius: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
}

.retro-button {
  font-family: "Press Start 2P", sans-serif;
  font-size: 25px;
  background: #e49ce4;
  color: #644606;
  padding: 40px 100px;
  border: 4px solid #0a4861;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 4px 4px 0px #000;
  outline: none;
  transition: all 0.1s ease-in-out;
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

.retro-button::before {
  margin-right: 10px;
}

.niveau {
  color: darkslateblue;
}

.titreJeu {
  position: absolute;
  left: 50%;
  bottom: 58%;
  transform: translate(-50%, 10%);
  width: clamp(300px, 50%, 650px);
  max-width: 650px;
  height: auto;
}

.titreMessage {
  font-family: "Press Start 2P";
  font-size: 35px;
  color: crimson;
}

.contentMessage {
  font-family: "Press Start 2P";
  font-size: 25px;
  text-align: center;
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
  position: relative;
  left: 5%;
  bottom: -5%;
  width: 30%;
  max-width: 450px;
  height: auto;
}
</style>
