<template>
    <div>
      <h1 @click="turnOnButtons"><b>Level 0</b></h1>
      <p>Description for Level 0</p>
    </div>
  </template>
  
<script setup>
const emit = defineEmits(['showTwoTabs']); 

const turnOnButtons = () => {
    emit('showTwoTabs'); 
};
</script>

<style scoped>
    h1 {
    cursor: pointer;
    }
</style>
  