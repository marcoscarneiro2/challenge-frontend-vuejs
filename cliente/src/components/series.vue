<template>

<v-main>
     <h1>Séries</h1>
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
import axios from 'axios'
  export default {
      data(){
          return{
              id:[]
          }
      },
    mounted(){
         this.getId();
    },
    methods: {
      async getId(){
         const response = await axios.get('https://vue-flix-backend.herokuapp.com/media/tv/search/1');
         if (response.status == 200){
             this.id = response.data;
         }else{
             console.error("Ocorreu um erro na API");
         }
      }
    },
  }
</script>
