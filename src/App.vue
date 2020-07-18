<template>
  <div class="bgMovies">
    <router-view/>
  </div>
</template>

<style>
  body { background-color: #04203f !important; z-index: 0;}

  .bgMovies { background:  url('../src/assets/img/bg.jpg') no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; height: 100vh; z-index: 1;}

  .alignCenter { padding-top: 35%; }
</style>
