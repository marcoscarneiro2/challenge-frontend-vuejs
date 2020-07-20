<template>
  <div id="app">
    <Header></Header>
    <main>
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

a {
  color: #345;
  text-decoration: none;
}
ul {
  list-style: none;
}

h1 {
  color: #255b9e;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
main {
  min-height: calc(100vh - 90px);
  height: max-content;
}
.grade a {
  margin: auto;
  width: max-content;
}
.grade {
  width: 100%;
  display: grid;
  row-gap: 30px;
  margin-top: 30px;
  grid-template-columns: repeat(auto-fit,minmax(210px,1fr));
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translate3d(-50px, 0, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}
/* Estilo da paginação */
.paginacao {
  width: 500px;
  display: flex;
  margin: 35px auto 0;
  justify-content: center;
}
.paginacao button {
  border: none;
  margin: 0 4px;
  color: #fff;
  outline: none;
  cursor: pointer;
  padding: 7px 10px;
  border-radius: 5px;
  transition: all 0.3s;
  background-color: #6c757d;
}
.paginacao button:hover {
  background-color: #5a6268;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(-50px, 0, 0);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease-in-out;
}
.list-enter-active{
  transition-delay: .4s;
}
</style>
