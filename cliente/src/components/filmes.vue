<template>

<v-main>
    <h1>Filmes</h1>
<div class="row pa-5">
  <v-card 
    class="mx-auto mb-4"
   width="290"
   max-height="600"
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
import axios from 'axios'
  export default {
      data(){
          return{
              id:[]
          }
      },
    mounted(){
         this.getId();
         this.pegarId();
    },
    methods: {
      async getId(){
         const response = await axios.get('https://vue-flix-backend.herokuapp.com/media/movie/search/1');
         if (response.status == 200){
             this.id = response.data;
         }else{
             console.error("Ocorreu um erro na API");
         }
      },
      pegarId(){
          const info = axios.put('https://vue-flix-backend.herokuapp.com/media/movie/');
          if (info.status == 200){
             this.id = info.data;
         }else{
             console.error("Ocorreu um erro na API");
         }
      }
    },
  }
</script>
<style>
h1{
    text-align: center;
    margin-bottom:7%;
    font-family:  fantasy;


}

</style>

