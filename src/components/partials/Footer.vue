<template>
  <footer>
    <p>Alguns direitos reservados.</p>
    <router-link to="/" class="logofooter">
      <img src="@/assets/intercase-branco.png" alt="Ranek" />
    </router-link>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
footer {
  background: #255b9e;
  padding: 25px 0;
  text-align: center;
  font-size: 1.2rem;
  color: #fff;
  position: relative;
  /* top: 75px; */
}
.logofooter img {
  display: block;
  max-width: 100%;
  padding-left: 176px;
}
</style>