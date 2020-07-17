<template>
  <div class="Single-background" :style="{backgroundImage: 'url('+ item.backdrop_path +')' }">
    <b-container class="Single-container">
      <b-row>

        <b-col cols="12">
          <b-row>
            <b-col cols="12" md="4">
              <b-img class="Single-cover" :src="item.poster_path" />
            </b-col>
            <b-col cols="12" md="8">
              <div class="Single-title">{{ item.title }}</div>
              <b-form-rating class="Single-stars" v-model="item.vote_average / 5" readonly no-border size="sm"></b-form-rating>

              <ul class="Single-genres">
                <li v-for="(genre, index) in item.genres" :key="genre.id">{{ genre.name }}<span v-if="index < item.genres.length - 1">,</span></li>
              </ul>

              <!-- Description -->
              <div class="Single-overview">
                <h5>Descrição</h5>
                <p>{{ item.overview }}</p>
              </div>
            </b-col>
          </b-row>
          
        </b-col>
  
      </b-row>
    </b-container>

  </div>
</template>
<script>
import MovieSingleService from "@/services/resources/MovieSingleService";

const service = MovieSingleService.build();

export default {
  data () {
    return {
      item: {}
    }
  },
  methods: {
    fetchMovie(id){

      let data = {
        id: id
      };

      service
      .read(data)
      .then(response => {
        this.item = response;
      })
      .catch(err => {
        console.log(err);
      });

    }
  },
  mounted(){
    var id = this.$route.params.id;
    this.fetchMovie(id);
  }

  }
</script>

<style lang="scss">

.Single-background{
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  padding: 0;
  margin: 0;
  padding-top: 250px;

  .Single-container{
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    border: 1px #ddd solid;
    border-top: 4px $base-color solid;


    .Single-cover{
      width: 100%;
      border-radius: 5px;
    }

    .Single-title{
      font-size: 42px;
      font-weight: 300;
      color: $base-color;
    }

    .Single-stars{
      width: 100px;
    }

    .Single-genres{
      padding: 0;
      margin: 0;
      list-style: none;
      margin-bottom: 30px;

      li{
        display: inline-block;
        font-size: 16px;
        font-weight: normal;
        margin-left: 5px;
      }
    }
  }


}

</style>