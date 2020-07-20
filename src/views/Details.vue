<template>
  <div class="details">
    <Menu />
    <div class="container">
      <div class="row">
        <div class="col-md-5 mt-5">
          <img :src="item.poster_path" class="img-fluid" />
        </div>
        <div class="col-md-7 mt-5">
          <div class="infos">
            <div class="col-md-3"><img src="../assets/img/stars.png" width="10%" /> {{item.vote_average }}</div>
            <div class="col-md-12 mt-3">
              <div class="h2" v-if="type == 'movie'">{{ item.title }}</div>
              <div class="h2" v-else>{{ item.name }}</div>
            </div>
            <div class="col-md-12 mt-4">{{ item.overview }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import http from '../config/http'
import Menu from '@/components/Menu.vue'

export default {
  name: 'Details',
  components: { Menu },
  data () {
    return {
      item: {},
      type: ''
    }
  },
  created () {
    const id = this.$route.params.id
    const type = this.$route.params.type
    this.type = type

    http.get(`/${type}/${id}`).then(response => {
      this.item = response.data
    })
  }
}
</script>
