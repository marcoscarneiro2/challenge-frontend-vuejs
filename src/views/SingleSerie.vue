<template>
  <div id="content-serie">
    <div id="content-serie">
      <div class="post" :style="{backgroundImage: `url('${bgImage}')`}">
        <div class="detalhes">
          <h1 class="titulo">{{serie.name}}</h1>
          <p>
            <b>IMDb:</b>
            {{serie.vote_average}}
          </p>
          <p>{{serie.overview}}</p>
          <p> <b>Temporadas: </b> {{serie.number_of_seasons}} </p>
          <p> <b>Episódios: </b> {{serie.number_of_episodes}} </p>
          <p>
            <b>Gêneros: </b>
            <span v-for="genero in serie.genres" :key="genero.id">{{genero.name}},</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/services/services.js";

export default {
  name: "SpaSerie",
  data() {
    return {
      id_serie: this.$route.params.id_serie,
      serie: [],
      bgImage: ""
    };
  },
  methods: {
    // Puxa as informações da série com base no id passado por parâmetro
    async getSerie() {
      api.get(`/tv/${this.id_serie}`).then(resposta => {
        this.serie = resposta.data;
        this.bgImage = resposta.data.backdrop_path;
      });
    }
  },
  created() {
    this.getSerie();
  }
};
</script>

<style scoped>
h1,
p,
h3 {
  color: #fff;
  margin: 10px 30px 0;
  text-align: left;
  width: 50%;
}
p {
  color-interpolation-filters: linearRGB;
}
.post {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  filter: grayscale(50%);
  background-size: 60% 100%;
  background-color: #0f171e;
  background-position: right;
  background-repeat: no-repeat;
}
.tagline {
  margin-top: 5px;
  color: #ffff00;
  margin-bottom: 15px;
}
</style>