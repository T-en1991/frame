const Login=()=>import('../../views/Login.vue')

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
    ]
}