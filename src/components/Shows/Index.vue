<template>
  <b-container class="gray" >
    <b-row class="mt-5">

      <b-col cols="12" md="2" v-for="item in shows" :key="item.id">
        <div class="Item">
          <router-link :to="'/serie/' + item.id">
            <b-img class="Item-thumb" :src="item.poster_path" fluid />
          </router-link>
          <router-link :to="'/serie/' + item.id" class="Item-title">{{ item.title.length > 20 ? item.title.substr(0, 20) + '...' : item.title }}</router-link>
          <b-form-rating class="Item-stars" v-model="item.vote_average / 5" readonly no-border size="sm"></b-form-rating>

        </div>
      </b-col>
 
    </b-row>

  </b-container>
</template>
<script>
import ShowService from "@/services/resources/ShowService";

const service = ShowService.build();

export default {
  data () {
    return {
      shows: []
    }
  },
  methods: {
    fetchShows(){

      service
      .search()
      .then(response => {
        this.shows = response;
      })
      .catch(err => {
        console.log(err);
      });

    }
  },
  mounted(){
    this.fetchShows();
  }

  }
</script>

<style lang="scss">

.Item{
  background: #fff;
  border: 1px #ddd solid;
  border-radius: 5px;
  height: 350px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden; 

  .Item-thumb{
    border-radius: 5px;
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