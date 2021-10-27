import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import Loading from './plugin/Loading/index'
import fastclick from 'fastclick'
import './assets/css/base.scss'
// 图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading1.gif')
})
// 使用Loading插件
Vue.use(Loading)
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
