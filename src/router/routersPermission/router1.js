
export default{
  decp: "router1",
  data: [
    {
      path: '/about',
      name: 'About',
      meta:{
        requireAuth:true
      },
      component: () => import('../../views/About.vue')
    }
  ]
}
