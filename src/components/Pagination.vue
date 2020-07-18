<template>
  <div class="row mt-5 m-auto mt-5 mb-5">
    <button @click="setPage(page-1)" :disabled="page==1" class="btn">Anterior</button>
    <span class="pages">{{ page }} / {{ total }}</span>
    <button @click="setPage(page+1)" :disabled="page>total-1" class="btn">Proximo</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 1
    }
  },
  props: {
    total: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    setPage (page) {
      this.page = page
      this.$emit('page', page)
    }
  },
  watch: {
    type (to, from) {
      this.page = 1
    }
  }
}
</script>

<style>
.btn { border-radius: 0; width: 150px; text-transform: uppercase; color:aliceblue; border: 1px solid #ccc; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;}
.pages { color:aliceblue; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; margin: 6px 10px;}
</style>
