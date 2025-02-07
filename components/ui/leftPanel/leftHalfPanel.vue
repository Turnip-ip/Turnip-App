<template>
  <div class="text" :style="{ backgroundColor: bgColor, padding: '40px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }">
    <div class="unlockfcts_hover">authorized functions &darr;
      <div class="unlockfcts_list"></div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  bgColor: {
    type: String,
    default: '#8391A3'
  },
  height: {
    type: String,
    default: '1000px'
  }
})

onMounted(() => {
  const button = document.getElementsByClassName("unlockfcts_hover")[0];
  const menu = document.getElementsByClassName("unlockfcts_list")[0];

  button.addEventListener('mouseover', () => {
    menu.style.height = "auto"; // Set the desired height here
    menu.style.padding = "10px";
  });
  menu.addEventListener('mouseover', () => {
    menu.style.height = "auto"; // Set the desired height here
    menu.style.padding = "10px";
  });

  button.addEventListener('mouseout', () => {
    menu.style.height = "0";
    menu.style.padding = "0 10px";
  });
  menu.addEventListener('mouseout', () => {
    menu.style.height = "0";
    menu.style.padding = "0 10px";
  });
})
</script>

<style scoped>
.text {
  height: 1005px;
}

.unlockfcts_hover {
  border: 2px solid black;
  padding: 3px;
  border-radius: 5px;
  background: silver;
  position: absolute;
  top: 85px;
  left: 55px;
  font-size: 20px;
  color: white;
  z-index: 2;
}
.unlockfcts_list {
  width: 150px;
  height: 0;
  padding: 0 10px;
  overflow: hidden;
  transition: 0.5s ease-out;
  background: gray;
  border-radius: 10px;
}
</style>
