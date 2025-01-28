<template>
  <div class="flex h-screen flex-col items-center md:flex-row">
    <NuxtImg src="/background.jpg" class="imag" />
    <NuxtImg src="/Turnip_Boy_Portrait_sans_background.jpeg" class="turnip" />
    <TurnipText class="titreJeu" />
    <!--  <div class="w-1/3">
      <NuxtImg
        src="/Turnip_Boy_Portrait_sans_background.jpeg"
        class="framed-imag imag"
      />
    </div>
    <h1 class="imag w-1/2">
      <NuxtImg src="/Turnip_Boy_Portrait_sans_background.jpeg" class="framed-imag" />
    </h1> 
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
    </div> -->
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
  overflow: hidden;
  position: relative;
  /* For positioning child elements */
}

.niveau {
  color: darkslateblue;
}

.titreJeu {
  position: absolute;
  right: 10%;
  /* Push image more to the left */
  bottom: 65%;
  /* Make the image overflow at the bottom */
  height: auto;
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
