<template>
    <div class="container">
        
        <h1 class="title">
            Home Page ! 
        </h1>
        <p>
            Please click on a window tab
        </p>
    </div>
    
</template>

<script>
import MenuBar from '@/components/ui/menubar/MenuBar.vue'; 

export default {
  name: 'HomeView', 
  loading: false,
  components: {
    MenuBar, // Register the MenuBar component
  }
};
</script>

<style>
body {
  background-color: pink; 
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