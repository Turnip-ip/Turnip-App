<template>
  <div>
    <!-- Centered text content -->
    <div class="flex h-screen items-center justify-center">
      <div class="imageBubble"> <NuxtImg src="bubble_speech.png"></NuxtImg></div>
      <div class="imageTurnip"><NuxtImg src="Turnip_Boy_Portrait_sans_background.jpeg"></NuxtImg></div>
      <!-- pour la demo, a modifier quand on fera l'integration de toutes les questions-->
      <div class="questionText">Given the current position on the tape, write a program to move the cursor to the right.</div>
    <div class="submitText">
        Click on
        <NuxtLink
          to="/levels/id/Answer"
          class="answer"
          >Answer</NuxtLink
        >
        to submit your code !</div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
.imageBubble{
  position: absolute;
  bottom: 40%;
  height: 40%;
  width: 80%;
}
.imageTurnip{
  position: absolute;
  height: 200px;
  width: 400px;
  left: 10%;
}
.questionText{
  position: absolute;
  bottom: 61%;
  font-family: "Press Start 2P", sans-serif;
  color: darkslateblue;
  font-size: 30px;
  text-align: center;
  width: 1500px;

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
