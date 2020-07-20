<template>
  <div>
    <div class="container d-flex justify-content-center">
      <ul class="nav flex-column alignCenter">
        <li class="nav-item">
          <router-link class="btn btn-lg btn-flat btn-outline-light" to="/movies">Filmes</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-lg btn-flat btn-outline-light mt-3" to="/series">Séries</router-link>
        </li>
        <div class="copyright mt-2 text-right">
          by Anderson Martins
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .btn { border-radius: 0; width: 250px; text-transform: uppercase; }
  .copyright { font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: 12px; font-style: italic; color: #cccccc !important; }
</style>
