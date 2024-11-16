<template>
    <div class="container">
        <h1 class ="imag">
          <NuxtImg src="/logo.jpg" class = "framed-imag"/>
        </h1>
        <h1 class="title">
            Please click on Levels to start 
        </h1>
    </div>
    
</template>

<script>
import MenuBar from '@/components/ui/menubar/MenuBar.vue'; 

export default {
  name: 'HomeView', 
  loading: false,
  components: {
    MenuBar, 
  }
};
</script>

<style>
body {
  background-color: pink; 
}
.imag {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem; 
}

.container{
    flex-direction: column; /* pour mettre les enfants verticallement alignes*/
    display: flex; 
    height: calc(100vh - 4rem);
    justify-content: center; /*  horizontally */
    align-items: center; /*  vertically */
    text-align: center;
}
.title{
    font-size: 3rem;
    margin: 0;
}
</style>