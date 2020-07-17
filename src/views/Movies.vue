<template>
  <div>
    <carousel
      v-if="medias.length > 0"
      :perPage="3"
      :autoplay="true"
      :autoplayTimeout="5000"
    >
      <slide v-for="(media, index) in medias" :key="index">
        <img :src="media.poster_path" :alt="media.title" class="c-img poster" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import mediaService from "@/service/media";
export default {
  name: "Movies",

  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      medias: []
    };
  },
  methods: {
    async getAllMedia() {
      const { data, status } = await mediaService.getAllMedia();
      if (status == 200) this.medias = data;
    }
  },
  created() {
    this.getAllMedia();
  }
};
</script>
<style lang="scss" scoped>
.VueCarousel-slide {
  position: relative;
  background: transparent;
  color: #fff;
  font-family: Arial;
  font-size: 24px;
  text-align: center;
  min-height: 100px;
}

.label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
