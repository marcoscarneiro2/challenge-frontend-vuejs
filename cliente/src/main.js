import Vue from 'vue'
import App from './App.vue'
//Dependencia das Rotas
import router from './router'
import vuetify from '@/plugins/vuetify'
//Dependencia do Vuex
import store from './store'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
