<template>
  <div class="flex h-screen flex-col items-center md:flex-row">
    <div class="w-1/3">
      <NuxtImg
        src="/Turnip_Boy_Portrait_sans_background.jpeg"
        class="framed-imag imag"
      />
    </div>
    <!-- <h1 class="imag w-1/2">
      <NuxtImg src="/Turnip_Boy_Portrait_sans_background.jpeg" class="framed-imag" />
    </h1> -->
    <div class="flex w-2/3 flex-col items-center justify-center gap-2">
      <TurnipText />
      <h1 class="title text-center text-2xl">
        Click on
        <NuxtLink
          to="/levels"
          class="niveau"
          >Levels</NuxtLink
        >
        to start
      </h1>
    </div>
  </div>
</template>

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
  height: 100vh;
  position: relative;
  /* For positioning child elements */
}

.niveau {
  color: darkslateblue;
}

.titreJeu {
  position: absolute;
  left: 60%;
  /* Push image more to the left */
  bottom: 55%;
  /* Make the image overflow at the bottom */
  max-width: 100%;
  /* Make the image larger */
  transform: translateY(10%);
  /* Adjust vertical position */
}

.imag {
  position: absolute;
  left: -14%;
  bottom: -10%;
  height: 110%;
  max-width: 70%;
  transform: translateY(10%);
}

.title {
  font-family: "Press Start 2P", sans-serif;
}
</style>
