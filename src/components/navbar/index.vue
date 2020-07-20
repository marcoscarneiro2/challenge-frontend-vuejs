<template>
<b-row>
  <b-col cols="12" class="p-0">
  	<nav class="navbar bg-nav-bar">
		<div class="container">
			<a class="navbar-brand" href="#">
        Filmes & Séries
			</a>
		</div>
	</nav>
  </b-col>
</b-row>
</template>

<script>
export default {
  name: 'custom-navbar',
  props:{
    btn:{
      type: String
    }
  }  
}
</script>

<style lang="scss" scoped>

.bg-nav-bar{
  text-align: center;
  background: $base-color;
  a{
    color: #fff !important;
    letter-spacing: 0px;
    color: $base-color;
    font-weight: bold;
    font-size: 23px;
  }
}
</style>