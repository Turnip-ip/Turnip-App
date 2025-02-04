<template>
  <div class="flex h-screen flex-col-reverse items-center md:flex-row">
    <div class="md:w-1/2">
      <NuxtImg src="Turnip_Boy_Portrait_sans_background.jpeg" class="w-max" />
    </div>

    <div class="flex flex-col items-center justify-center gap-2 md:w-1/2">
      <TurnipText class="w-5/6" />
      <h1 class="title m-2 text-center text-2xl">
        <NuxtLink to="/levels" class="niveau w-100 h-20 rounded-sm p-2 hover:bg-[#ffe9f4]">Play
        </NuxtLink>
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

.niveau {
  color: darkslateblue;
}

.title {
  font-family: "Press Start 2P", sans-serif;
}
</style>
