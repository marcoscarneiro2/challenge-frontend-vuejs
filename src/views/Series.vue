<template>
  <section id="cont-series">
    <h1>Lista de Séries</h1>

    <transition-group name="list" tag="div" class="grade">
      <div v-for="serie in series" :key="serie.id" @click="abrirSerie(serie.id)">
        <Card>
          <template v-slot:imagem-card>
            <img :src="serie.poster_path" alt="poster da série" />
          </template>
          <template v-slot:titulo>
            <h4 class="titulo">{{serie.title}}</h4>
          </template>
          <template v-slot:descricao>
            <p class="avaliacao">
              <b>IMDb:</b>
              {{serie.vote_average}} | 10
            </p>
          </template>
        </Card>
      </div>
    </transition-group>

    <div class="paginacao" v-show="paginar">
      <button @click="back">back</button>
      <button v-for="i in qtddPagina" :key="i" @click="jumpTo(i)">{{i}}</button>
      <button @click="next">next</button>
    </div>
  </section>
</template>

<script>
import { api } from "@/services/services.js";
import Card from "@/components/listas/Card.vue";
export default {
  name: "Series",
  data() {
    return {
      series: null,
      pag: 1,
      qtddPagina: 3,
      paginar: false
    };
  },
  methods: {
    // Puxa os filmes exibidos na paginação
    async getLista() {
      api.get(`/tv/search/${this.pag}`).then(response => {
        this.series = response.data;
        this.paginar = true
      });
    },
    // Encaminha para a página da série passando id como parâmetro
    abrirSerie(id) {
      this.$router.push({ name: "SingleSerie", params: { id_serie: id } });
    },
    // Avança para a próxima página da paginação
    next() {
      if (this.pag < this.qtddPagina) {
        this.pag++;
        this.getLista();
      }
    },
    // Volta para a página anterior da paginação
    back() {
      if (this.pag > 1) {
        this.pag--;
        this.getLista();
      }
    },
    // Avança para a página selecionada da paginação
    jumpTo(pag) {
      if (this.pag != pag) {
        this.pag = pag;
        this.getLista();
      }
    }
  },
  components: {
    Card
  },
  created() {
    this.getLista();
  }
};
</script>

<style scoped>
#cont-series {
  margin-bottom: 40px;
}
</style>