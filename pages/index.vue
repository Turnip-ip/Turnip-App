<template>
  <div class="container">
    <h1 class="imag">
      <NuxtImg src="/Turnip_Boy_Portrait_sans_background.jpeg" class="framed-imag" />
    </h1>
    <h1 class="titreJeu">
      <NuxtImg src="/screen.png" />
    </h1>

    <h1 class="title">
      Click on <span class="niveau">Levels</span> to start
    </h1>
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
  left: -30%;
  bottom: -10%;
  max-width: 90%;
  transform: translateY(10%);
}

.title {
  position: absolute;
  left: 80%;
  bottom: 45%;
  font-family: 'Press Start 2P', sans-serif;
  font-size: 30px;
  white-space: nowrap;
  transform: translateX(-50%);

}
</style>