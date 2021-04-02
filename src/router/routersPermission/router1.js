const Home=()=>import('../../views/Home.vue')

export default{
  decp: "router1",
  data: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/about1',
      name: 'About1',
      meta:{
        requireAuth:true
      },
      component: () => import('../../views/About1.vue')
    },
    {
      path: '/about2',
      name: 'About2',
      meta:{
        requireAuth:true
      },
      component: () => import('../../views/About2.vue')
    },
    {
      path: '/about3',
      name: 'About3',
      meta:{
        requireAuth:true
      },
      component: () => import('../../views/About3.vue')
    },
  ]
}
