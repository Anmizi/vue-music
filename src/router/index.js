import Vue from 'vue'
// 通过import ... from ....的方式加载组件，无论组件有没有被用到，都会被加载进来
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 实现组件按需加载
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
}
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
