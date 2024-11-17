<template>
    <Level @show-two-tabs="showTabs" />
</template>
  

<script setup>
import Level from './components/ui/levels/Level.vue';
const emit = defineEmits(['showTabs']);


const showTabs = () => {
    //show other two tabs if not visible
    emit('showTabs');
    //emit('showbuttons');
    
    //set current page to Questions page
    // show the corresponding question
};

</script>


