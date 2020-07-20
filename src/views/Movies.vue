<template>
  <div class="movies">
    <Menu />
    <div class="container">
      <div class="row">
        <div v-for="item in info" :key="item.id" class="col-md-2 mt-5">
          <router-link :to="{ name: 'Details', params: {id: item.id, type: type} }"><img :src="item.poster_path" class="img-fluid" alt /></router-link>
          <div class="infos mt-3">
            <div class="star">
              <img src="../assets/img/stars.png" width="10%" alt /> {{ item.vote_average }}
            </div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <Pagination :total="total" @page="setPagination" :type="type" />
      </div>
    </div>
  </div>
</template>

<script>
import http from '../config/http'
import Menu from '@/components/Menu.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Movies',
  components: { Menu, Pagination },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      info: [],
      page: 1,
      total: '0'
    }
  },
  mounted () {
    this.setPagination(this.page, this.type)
  },
  methods: {
    setPagination (page, type) {
      const t = type === undefined ? this.type : type

      http.get(`/${t}/search/${page}`).then(response => {
        this.info = response.data
        this.total = response.headers['x-paginator-total-pages']
      })
    }
  },
  watch: {
    $route (to, from) {
      this.type = to.matched[0].props.default.type
      this.setPagination(1, this.type)
    }
  }
}
</script>

<style>
.infos {
  color: #ffffff;
}
.title {
  font-size: 20px;
}
.category {
  font-size: 13px;
  color: yellow;
  font-style: italic;
  margin: 10px 0;
}
</style>
