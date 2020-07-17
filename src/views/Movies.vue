<template>
  <div>movies</div>
</template>

<script>
import mediaService from "@/service/media";
export default {
  name: "Movies",
  data() {
    return {
      medias: []
    };
  },
  created() {
    mediaService.getAllMedia();
  }
};
</script>
