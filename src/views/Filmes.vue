<template>
  <div id="cont-filmes">
    <h1>Lista de Filmes</h1>
    <select class="filtro" v-model="genero">
      <option value>Selecione um genero</option>
      <option value="Ação">Ação</option>
      <option value="Aventura">Aventura</option>
      <option value="Ficção científica">Ficção científica</option>
      <option value="Fantasia">Fantasia</option>
      <option value="Animação">Animação</option>
      <option value="Drama">Drama</option>
      <option value="Família">Família</option>
      <option value="Comédia">Comédia</option>
      <option value="Mistério">Mistério</option>
    </select>

    <transition-group name="list" tag="div" class="grade">
      <div v-for="filme in filmes" :key="filme.id" @click="abrirFilme(filme.id)">
        <Card>
          <template v-slot:imagem-card>
            <img :src="filme.poster_path" alt="poster da série" />
          </template>
          <template v-slot:titulo>
            <h4 class="titulo">{{filme.title}}</h4>
          </template>
          <template v-slot:descricao>
            <p class="avaliacao">
              <b>IMDb:</b>
              {{filme.vote_average}} | 10
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
  </div>
</template>

<script>
import { api } from "@/services/services.js";
import Card from "@/components/listas/Card.vue";
export default {
  name: "Filmes",
  data() {
    return {
      all_filmes: null,
      filmes: null,
      pag: 1,
      qtddPagina: 3,
      genero: "",
      paginar: false
    };
  },
  methods: {
    // O método seleciona todos os filmes a fim de usá-los no filtro
    async getAllFilmes() {
      for (let i = 1; i <= 3; i++) {
        await api.get(`/movie/search/${i}`).then(response => {
          if (i==1) {
            this.all_filmes = response.data;
          }else{
            this.all_filmes = this.all_filmes.concat(response.data);
          }
        });
      }
      for (let i = 0; i < this.all_filmes.length; i++) {
        api.get(`/movie/${this.all_filmes[i].id}`).then(resposta => {
          this.all_filmes[i] = { ...this.all_filmes[i], genres: resposta.data.genres };
          this.paginar = true;
        });
      }
    },
    // O método puxa apenas os filmes mostrados na paginação
    async getLista() {
      await api.get(`/movie/search/${this.pag}`).then(response => {
        this.filmes = response.data;
      });
    },
    // O método executa o filtro por gênero
    filtrar() {
      this.filmes = [];
      for (let i = 0; i < this.all_filmes.length; i++) {
        let generos = this.all_filmes[i].genres;
        for (let j = 0; j < generos.length; j++) {
          if (generos[j].name == this.genero) {
            this.filmes.push(this.all_filmes[i]);
          }
        }
      }
    },
    // Método para direcionar à outra página passando paramêtro
    abrirFilme(id) {
      this.$router.push({ name: "SingleFilme", params: { id_filme: id } });
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
    // Vai para a página selecionada
    jumpTo(pag) {
      if (this.pag != pag) {
        this.pag = pag;
        this.getLista();
      }
    }
  },
  watch: {
    // Execulta sempre que o valor d variável "genero" muda
    genero() {
      if (this.genero=="") {
        this.paginar = true;
        this.getLista()
      }else{
        this.paginar = false;
        this.filtrar();
      }
    }
  },
  components: {
    Card
  },
  created() {
    this.getLista();
    this.getAllFilmes()
  }
};
</script>

<style scoped>
#cont-filmes {
  margin-bottom: 40px;
}
.filtro{
  padding: 8px;
  width: 170px;
  border-radius: 5px;
  margin: 30px auto 10px;
  border: .5px solid #000;
  margin-left: calc(50% - 85px);
}
</style>