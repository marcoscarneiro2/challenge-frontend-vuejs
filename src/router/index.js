import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Movies.vue'),
  },
  {
    path: '/filme/:id',
    name: 'SingleMovie',
    component: () => import('../views/SingleMovie.vue'),
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/Movies.vue'),
  },
  {
    path: '/series',
    name: 'Shows',
    component: () => import('../views/Shows.vue'),
  },
  {
    path: '/serie/:id',
    name: 'SingleShow',
    component: () => import('../views/SingleShow.vue'),
  },
  {
    name: 'pageNotFound',
    path: '*',
    component: () => import('../views/PageNotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


export default router;
