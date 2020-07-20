<template>
  <div id="content-filme">
    <div class="post" :style="{backgroundImage: `url('${bgImage}')`}">
      <div class="detalhes">
        <h1 class="titulo">{{filme.title}}</h1>
        <h3 class="tagline"> {{filme.tagline}} </h3>
        <p> <b>IMDb: </b> {{filme.vote_average}} </p>
        <p> {{filme.overview}} </p>
        <p> 
          <b>Gêneros:</b>
          <span v-for="genero in filme.genres" :key="genero.id"> {{genero.name}}, </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/services/services.js";

export default {
  name: "Filme",
  data(){
    return{
      id_filme: this.$route.params.id_filme,
      bgImage: '',
      filme: []
    }
  },
  methods:{
    // Puxa as informações do Filme com base no id passado por parâmetro
    async getFilme(){
      api.get(`/movie/${this.id_filme}`).then(resposta=>{
        this.filme = resposta.data;
        this.bgImage = resposta.data.backdrop_path;
      })
    }
  },
  created(){
    this.getFilme()
  }
};
</script>

<style scoped>
h1,p,h3{
  color: #FFF;
  margin: 10px 30px 0;
  text-align: left;
  width: 50%;
}
p{
  color-interpolation-filters: linearRGB;
}
.post{
  width: 100%;
  height: 85vh;
  display: flex;
  align-items: center;
  filter: grayscale(50%);
  background-size: 60% 100%;
  background-color: #0f171e;
  background-position: right;
  background-repeat: no-repeat;
}
.tagline{
  margin-top: 5px;
  color: #ffff00;
  margin-bottom: 15px;
}
</style>