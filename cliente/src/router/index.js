import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Filmes from '../components/filmes.vue'
import Series from '../components/series.vue'


Vue.use(VueRouter)
    // rotas
    // precisa importar a página que vai ser referida a rota

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Filmes',
    name: 'Filmes',
    component: Filmes
  },
  {
    path: '/Series',
    name: 'Series',
    component: Series
  }
 
]

const router = new VueRouter({
  routes
})

export default router
