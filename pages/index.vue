<template>
  <div class="flex h-screen flex-col items-center md:flex-row">
    <NuxtImg src="/background.jpg" class="imag" />
    <NuxtImg src="/Turnip_Boy_Portrait_sans_background.jpeg" class="turnip" />
    <TurnipText class="titreJeu" />
    <button class="retro-button" id="playButton" @click="openWindow">Play</button>
    <div v-if="windowOpen" class="popup">
      <div class="popup-content">rez</div>
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

.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  right: 480px;
  top: 0;
  width: 800px;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.5);
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
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
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}

.retro-button:hover {
  background: #8ad4bb;
}

.retro-button:active {
  box-shadow: 2px 2px 0px #000;
  transform: translate(2px, 2px);
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
  /* Responsive width */
  max-width: 650px;
  height: auto;
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


.title {
  font-family: "Press Start 2P", sans-serif;
}
</style>
