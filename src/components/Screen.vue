<template>
  <div>
    <carousel
      :paginationEnabled="false"
      v-if="medias.length > 0"
      :perPage="1"
      :autoplay="false"
      :autoplayTimeout="3000"
    >
      <template v-for="(media, index) in mediaGet">
        <slide :key="index">
          <router-link
            :to="{
              name: type == 'movie' ? 'Movie' : 'TV',
              params: { id: media.id }
            }"
          >
            <div class="relative pointer">
              <img
                :src="media.backdrop_path"
                :alt="media.title"
                class="c-img poster"
              />
              <div class="title-body">
                <div class="p-50">
                  <h2 class="pb-20">{{ media.title }}</h2>
                  <h6>{{ media.overview ? media.overview : media.tagline }}</h6>
                  <div class="p-50">
                    <span
                      class="c-badge"
                      v-for="(genres, genresIndex) in media.genres"
                      :key="genresIndex"
                      >{{ genres.name }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </slide>
      </template>
    </carousel>
    <div class="m-20" v-if="genres.length > 0">
      <h1 class="mb-20">Procure por gênero</h1>
      <multiselect
        placeholder="Procure por gênero"
        selectLabel="Pressione Enter para selecionar"
        v-model="genre"
        :options="genres"
        track-by="id"
        label="name"
        :searchable="true"
        :allow-empty="false"
      >
        <template slot="singleLabel" slot-scope="{ option }">{{
          option.name
        }}</template>
      </multiselect>
    </div>
    <div class="c-container space-between pt-50">
      <template v-for="(media, index) in medias">
        <router-link
          :key="index"
          :to="{
            name: type == 'movie' ? 'Movie' : 'TV',
            params: { id: media.id }
          }"
        >
          <div v-if="media.poster_path" class="c-card medium">
            <div class="c-card-body">
              <img :src="media.poster_path" :alt="media.title" class="c-img" />
            </div>
            <div class="text">
              <h4>{{ media.title }}</h4>
              <h6 v-if="media.release_date">
                {{
                  new Intl.DateTimeFormat("pt").format(
                    new Date(`${media.release_date} `)
                  )
                }}
              </h6>
              <div class="pt-10 pb-10">
                <star-rating
                  :star-size="20"
                  :increment="0.5"
                  v-model="media.rating"
                ></star-rating>
              </div>
            </div>
          </div>
        </router-link>
      </template>
      <div
        class="mt-50"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="20"
      >
        ...
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import mediaService from "@/service/media";
import infiniteScroll from "vue-infinite-scroll";
import Multiselect from "vue-multiselect";

export default {
  props: {
    type: {
      type: String,
      default: "movie"
    }
  },
  name: "Screen",
  directives: { infiniteScroll },
  components: {
    Carousel,
    Multiselect,
    Slide
  },
  data() {
    return {
      genres: [],
      genre: { id: 0, name: "Todos" },
      medias: [],
      mediaGet: [],
      page: 1
    };
  },
  watch: {
    genre(val) {
      if (val) {
        this.page = 1;
        console.log(val);
        if (val.id == 0) this.getAllMedia();
        else this.getGenre(val.id);
      }
    }
  },
  methods: {
    async getAllMedia(concat = false) {
      const { data, status } = await mediaService.getAllMedia(
        this.type,
        this.page
      );
      if (status == 200) {
        if (concat) this.medias = this.medias.concat(data);
        else this.medias = data;
      }
      data.map(async e => {
        e.rating = e.vote_average / 2;
        const { data } = await mediaService.getMedia(e.id);
        data.rating = data.vote_average / 2;
        if (data.backdrop_path && data.backdrop_path.indexOf(".jpg") > 0)
          this.mediaGet.push(data);
      });
      return true;
    },
    async getAllGenres() {
      const { data, status } = await mediaService.getAllGenres(this.type);
      if (status == 200) {
        this.genres.push({ id: 0, name: "Todos" });
        this.genres = this.genres.concat(data);
      }
    },
    async loadMore() {
      this.page++;
      this.busy = true;
      await this.getAllMedia(true);
      this.busy = false;
    },
    async getGenre(genre) {
      const { data } = await mediaService.getGenre(this.page, this.type, genre);
      this.medias = data;
      this.medias.map(e => {
        e.rating = e.vote_average / 2;
      });
    }
  },
  created() {
    this.getAllMedia();
    this.getAllGenres();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
