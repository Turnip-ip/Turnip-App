<template>
  <div class="page-container">
    <MenuBar :show-buttons="true" />
    <div class="content-container">
      <slot />
    </div>
  </div>
</template>

<style>
body {
  background-color: #ffc0cb;
  overflow: hidden;
  margin: 0;
}
</style>
