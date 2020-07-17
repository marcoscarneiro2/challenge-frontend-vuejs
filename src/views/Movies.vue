<template>
<div>
  <navbar />
  <b-row>
    <b-col cols="12" md="2">
      <sidebar />
    </b-col>
    <b-col cols="12" md="10">
        <movies />
    </b-col>
  </b-row>
</div>
</template>

<script>
import Navbar from '@/components/navbar/index.vue';
import Movies from '@/components/Movies/Index.vue';
import Sidebar from '@/components/side/sidebar';

export default {
  components: {
    Movies,
    Navbar,
    Sidebar
  }
}
</script>
