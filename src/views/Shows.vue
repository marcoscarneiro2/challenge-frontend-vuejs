<template>
<div>
  <navbar />
  <b-row>
    <b-col cols="12" md="2">
      <sidebar />
    </b-col>
    <b-col cols="12" md="10">
        <shows />
    </b-col>
  </b-row>
</div>
</template>

<script>
import Navbar from '@/components/navbar/index.vue';
import Shows from '@/components/Shows/Index.vue';
import Sidebar from '@/components/side/sidebar';

export default {
  components: {
    Shows,
    Navbar,
    Sidebar
  }
}
</script>
