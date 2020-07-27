<template>

<v-main>
    <h1>Filmes</h1>
<div class="row pa-5">
  <v-card 
    class="mx-auto mb-4"
   width="290"
    v-for="filmes in id"
    :key="filmes.id"
  
  >
    <v-img
      height="250"
      v-bind:src="filmes.poster_path"
    ></v-img>

    <v-card-title>{{filmes.title}}</v-card-title>

    <v-card-text>
    {{filmes.overview}}    
    </v-card-text>
  </v-card>
  </div>
  </v-main>
</template>

<script>
export default {
    
}
</script>