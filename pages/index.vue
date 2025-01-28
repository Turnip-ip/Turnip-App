<template>
  <div class="flex h-screen flex-col items-center md:flex-row">
    <div class="w-1/2">
      <NuxtImg src="Turnip_Boy_Portrait_sans_background.jpeg" class="w-max" />
    </div>
    <!-- <h1 class="imag w-1/2">
      <NuxtImg src="/Turnip_Boy_Portrait_sans_background.jpeg" class="framed-imag" />
    </h1> -->
    <div class="flex w-1/2 flex-col items-center justify-center gap-2">
      <TurnipText />
      <h1 class="title text-center text-2xl m-2">
        <NuxtLink to="/levels" class="niveau h-20 w-100  p-2 rounded-sm hover:bg-[#ffe9f4]" variant="outline">Play
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
