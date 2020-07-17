<template>
  <div>Tvs</div>
</template>

<script>
import mediaService from "@/service/media";
export default {
  name: "TVs",
  data() {
    return {
      medias: []
    };
  },
  created() {
    mediaService.getAllMedia("tv");
  }
};
</script>
