<template>
  <b-container class="gray pt-5" >

    <b-row class="justify-content-end">
      <b-col cols="4">
          <b-form-group label="Gênero" label-for="genre">
            <b-form-select id="genre" v-model="genre" @change="fetchShows" :options="genres"></b-form-select>
          </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="!loading && shows.length > 0">
      <b-col cols="12" md="2" v-for="item in shows" :key="item.id">
        <div class="Item">
          <router-link :to="'/serie/' + item.id">
            <b-img class="Item-thumb" :src="item.poster_path" fluid />
          </router-link>
          <router-link :to="'/serie/' + item.id" class="Item-title">{{ item.title.length > 30 ? item.title.substr(0, 30) + '...' : item.title }}</router-link>
          <b-form-rating class="Item-stars" :value="item.vote_average - 5" readonly no-border size="sm"></b-form-rating>
        </div>
      </b-col>
    </b-row>

     <b-row v-if="loading && shows.length == 0" class="py-5 justify-content-center align-items-center">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
    </b-row>

    <b-row v-if="!loading && shows.length == 0" class="py-5 justify-content-center">
      <b-alert show>Nenhuma série foi encontrada.</b-alert>
    </b-row>


    <Paginate
      :totalPages="10"
      :activePage="currentPage"
      @to-page="toPage"
      />

  </b-container>
</template>
<script>
import ShowService from "@/services/resources/ShowService";
import GenreService from "@/services/resources/GenreService";
import Paginate from '../shared/Paginate';

const serviceShows = ShowService.build();
const serviceGenre = GenreService.build();

export default {
  components:{
    Paginate
  },
  data () {
    return {
      shows: [],
      currentPage: 1,
      loading: true,
      genre: null,
      genres: []
    }
  },
  methods: {
    toPage(page){
      this.currentPage = page;
      this.fetchShows();
    },
    fetchShows(){
      this.loading = true;
      this.shows = [];


      var data = {
        id: this.currentPage
      };

      // If there's filter by genre
      if(this.genre != null)
        data.genre = this.genre;

      serviceShows
      .read(data)
      .then(response => {
        this.shows = response;
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });

    },
    fetchGenres(){
      this.genres = [{ value: null, text: 'Todos'}];

      let data = {
        id: 'tv'
      };

      serviceGenre
      .read(data)
      .then(response => {
        response.forEach(element => {
          this.genres.push({ value: element.id, text: element.name });
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted(){
    this.fetchGenres();
    this.fetchShows();
  }

  }
</script>

<style lang="scss">

.Item{
  background: #fff;
  border: 1px #ddd solid;
  border-radius: 5px;
  height: 320px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden; 

  .Item-thumb{
    border-radius: 5px 5px 0 0;
    margin-bottom: 10px;
    width: 100%;

    &:hover{
      cursor: pointer;
      transform: scale(1.1);
      transition: 0.01s all ease-in-out;
      
    }
  }

  .Item-title{
    font-weight: 300;
    margin-top: 5px;
    color: #444;
    padding: 5px 10px;
    display: block;
    word-break: break-all;

    &:hover{
      text-decoration: underline;
    }
  }

  .Item-stars{
    position: absolute;
    bottom: 5px;
  }

}

</style>