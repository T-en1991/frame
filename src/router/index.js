import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const Home=()=>import('../views/Home.vue')
const Err404=()=>import('../views/Err404.vue')
const Login=()=>import('../views/Login.vue')

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
    component: () => import('../views/About.vue')
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
