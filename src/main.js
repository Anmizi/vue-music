import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick'
import './assets/css/base.scss'

Vue.use(VueLazyload, {
  loading: require('./assets/images/loading1.gif')
})
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
