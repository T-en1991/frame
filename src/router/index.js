import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Err404 from '../views/Err404'
import Login from '../views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      requireAuth:false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/about',
    name: 'About',
    meta:{
      requireAuth:true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: 'Err404',
    component: Err404,
    meta:{
      requireAuth:false
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
