import Vue from 'vue'
import VueRouter from 'vue-router'
import Series from "@/views/Series.vue";
import Filmes from "@/views/Filmes.vue";
import Home from "@/views/Home.vue";
import SingleFilme from "@/views/SingleFilme.vue";
import SingleSerie from "@/views/SingleSerie.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/filmes"
  },
  {
    path: '/series',
    name: 'Series',
    component: Series
  },
  {
    path: '/filmes',
    name: 'Filmes',
    component: Filmes
  },
  {
    path: '/spa-filme/:id_filme',
    name: 'SingleFilme',
    component: SingleFilme,
    props: true
  },
  {
    path: '/spa-serie/:id_serie',
    name: 'SingleSerie',
    component: SingleSerie,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
