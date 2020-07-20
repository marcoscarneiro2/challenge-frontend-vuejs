import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { } from 'bootstrap/dist/css/bootstrap.min.css'
import Movie from '../views/Movies.vue'
import Details from '../views/Details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'Filmes',
    component: Movie,
    props: { type: 'movie' }
  },
  {
    path: '/series',
    name: 'Séries',
    component: Movie,
    props: { type: 'tv' }
  },
  {
    path: '/details/:type/:id',
    name: 'Details',
    component: Details
  }
]

const router = new VueRouter({
  routes
})

export default router
