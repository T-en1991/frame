const Login=()=>import('../../views/Login.vue')
const Home=()=>import('../../views/Home.vue')

// 常量路由
export default {
    decp: "常量路由",
    data: [
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
    ]
}