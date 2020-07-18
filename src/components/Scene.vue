<template>
  <div>
    <div v-if="media">
      <div class="relative pointer">
        <img
          :src="media.backdrop_path"
          :alt="media.title"
          class="c-img poster"
        />
        <div class="title-body">
          <div class="p-50">
            <h1 class="pb-20 white">{{ media.title }}</h1>
            <h3 class="white">
              {{ media.overview ? media.overview : media.tagline }}
            </h3>
            <div class="pt-20">
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
    </div>
    <div class="c-container space-between pt-100" v-if="media">
      <div class="c-container no-wrap ">
        <div class="m-20">
          <img
            :src="media.poster_path"
            :alt="media.title"
            class=""
            height="400"
          />
        </div>
        <div class="m-20">
          <h1 class="mb-10">{{ media.title }}</h1>
          <div class="mb-20">
            <star-rating
              :star-size="20"
              :increment="0.5"
              v-model="media.rating"
            ></star-rating>
          </div>
          <h2 class="title">Sinopse</h2>
          <h4 class="mt-20">{{ media.overview }}</h4>
        </div>
      </div>
    </div>
    <div class="p-20" v-if="media"></div>
    <div class="p-20" v-if="type == 'tv'">
      <h1>Temporadas</h1>
      <div class="c-container space-between pt-50" v-if="media">
        <div
          class="c-card medium"
          v-for="(season, index) in media.seasons"
          :key="index"
        >
          <div class="c-card-body">
            <img
              :src="'https://image.tmdb.org/t/p/w500/' + season.poster_path"
              :alt="season.name"
              height="240"
            />
          </div>
          <div class="text opacity">
            <h4 class="upper">{{ season.name }}</h4>
            <h6>
              {{
                new Intl.DateTimeFormat("pt").format(
                  new Date(`${season.air_date} `)
                )
              }}
            </h6>
            <div class="pt-10 pb-10">
              <h5>{{ cutText(season.overview, 100) }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-20" v-if="medias.length > 0">
      <h1>Outros títulos semelhantes</h1>
      <div class="c-container space-between pt-50">
        <card
          :medias="media"
          :type="type"
          v-for="(media, index) in medias"
          :media="media"
          :key="index"
        />
      </div>
    </div>
    <div
      class="mt-50"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="20"
    >
      ...
    </div>
  </div>
</template>

<script>
import mediaService from "@/service/media";
import infiniteScroll from "vue-infinite-scroll";
import Card from "@/components/Card.vue";

export default {
  props: {
    type: {
      type: String,
      default: "movie"
    },
    id: {
      type: Number
    }
  },
  components: { Card },
  directives: { infiniteScroll },
  name: "Scene",
  data() {
    return {
      media: null,
      medias: [],
      page: 1,
      genre: null
    };
  },
  methods: {
    cutText(text, max = 200) {
      return text.length > max ? `${text.substr(0, max)}...` : text;
    },
    async getMedia() {
      const { data } = await mediaService.getMedia(this.id, this.type);
      this.media = data;
      this.media.rating = data.vote_average / 2;
      this.genre = this.media.genres[0].id;
      this.getGenre();
    },
    async loadMore() {
      this.page++;
      this.busy = true;
      await this.getGenre(true);
      this.busy = false;
    },
    async getGenre(concat = false) {
      const { data } = await mediaService.getGenre(
        this.page,
        this.type,
        this.genre
      );
      if (concat) this.medias = this.medias.concat(data);
      else this.medias = data;
      this.medias.map(e => {
        e.rating = e.vote_average / 2;
      });
    }
  },
  created() {
    this.getMedia();
  }
};
</script>
