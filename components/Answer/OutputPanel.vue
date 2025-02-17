<!-- components/ui/resizable/RightHalfPanel.vue -->
<template>
  <div class="bg-[#D9DFE5]">
    <div class="title">ERROR LOGS</div>
    <div class="popuP"></div>
    <slot> </slot>
  </div>
</template>

<style>
.title {
  position: relative;
  font-family: "Press Start 2P", sans-serif;
  z-index: 100;
  left: 3%;
  color: rgb(8, 8, 10);
  font-size: clamp(10px, 2vw, 25px);
}

.popuP {
  position: relative;
  z-index: 1000;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 18vh;
  width: 45vw;
  background-color: rgb(188, 248, 228);
  border: 5px solid black;
  border-radius: 15px;
  text-align: center;
}
</style>
