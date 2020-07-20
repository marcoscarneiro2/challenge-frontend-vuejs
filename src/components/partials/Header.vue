<template>
  <nav>
    <router-link to="/" class="logo">
      <img src="@/assets/logo.png" alt="Ranek" />
    </router-link>
    <div class="links">
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/series">Series</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
nav {
  display: flex;
  padding: 15px 20px;
  align-items: center;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  padding: 10px 0;
  margin-right: 15%;
}

.logo img {
  width: 300px;
  padding-left: 176px;
}
.links a{
  margin-right: 15px;
}
.links .router-link-active{
  color: #FFF;
  padding: 5px 8px;
  border-radius: 5px;
  background-color: #4B8;
}
</style>