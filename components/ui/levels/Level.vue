<template>
    <div>
        <h1 @click="turnOnButtons"> <b>Level 0</b></h1>
        <p>Description for Level 0</p>
    </div>
</template>

<script setup>
const emit = defineEmits(['showTwoTabs']);

const turnOnButtons = () => {
    //show other two tabs if not visible + set current page to Questions
    emit('showTwoTabs');

    //show level at top right corner 

    // show the corresponding question
};
</script>

<style scoped>
h1 {
  cursor: pointer;
}
</style>