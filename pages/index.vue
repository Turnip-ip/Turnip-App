<template>
  <div class="flex h-screen flex-col items-center md:flex-row">
    <NuxtImg src="/background.jpg" class="imag" />
    <NuxtImg src="/Turnip_Boy_Portrait_sans_background.jpeg" class="turnip" />
    <TurnipText class="titreJeu" />
    <button class="retro-button" id="playButton" @click="openWindow">Play</button>
    <div v-if="windowOpen">
      <div class="popup-content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowOpen: false,
      welcomeMessage: ''
    };
  },
  methods: {
    openWindow() {
      this.windowOpen = true;
    },
    // Close the modal
    closeModal() {
      this.windowOpen = false;
    },
  }
};
</script>

<style>
body {
  background-color: #ffc0cb;
  overflow: hidden;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  /* For positioning child elements */
}

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.retro-button {
  font-family: 'Press Start 2P', sans-serif;
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
  position: fixed;
  /* Fix the button to the screen */
  bottom: 400px;
  /* Adjust vertical position from the top */
  right: 500px;
  /* Position it 20px from the right edge */
  z-index: 9999;
  /* Ensure it is on top of everything else */
}

.retro-button:hover {
  background: #8ad4bb;
}

.retro-button:active {
  box-shadow: 2px 2px 0px #000;
  transform: translate(2px, 2px);
}

.retro-button::before {
  /* Play symbol */
  margin-right: 10px;
}

.niveau {
  color: darkslateblue;
}

.titreJeu {
  position: absolute;
  right: 17%;
  /* Push image more to the left */
  bottom: 63%;
  /* Make the image overflow at the bottom */
  height: auto;
  width: 650px;
  /* Make the image larger */
  transform: translateY(10%);
  /* Adjust vertical position */
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
  left: 5%;
  max-height: 450px;
  bottom: 17%;
  width: auto;
}

.title {
  font-family: "Press Start 2P", sans-serif;
}
</style>
