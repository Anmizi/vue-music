import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend'
import Singer from '../views/Singer'
import Search from '../views/Search'
import Rank from '../views/Rank'
Vue.use(VueRouter)

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
