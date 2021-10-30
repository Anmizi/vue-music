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
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}
const Account = (resolve) => {
  import('../views/Account').then((module) => {
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
    component: Recommend,
    children: [
      {
        // 动态路由匹配
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer,
    children: [
      {
        // 动态路由匹配
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank,
    children: [
      {
        // 动态路由匹配
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
