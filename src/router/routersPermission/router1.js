const Home = () => import("../../views/Home.vue");

export default {
  decp: "router1",
  data: [
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/about1",
      name: "About1",
      meta: {
        requireAuth: true,
      },
      component: () => import("../../views/About1.vue"),
      children: [
        {
          path: "about1c1",
          name: "About1c1",
          meta: {
            requireAuth: true,
          },
          component: () => import("../../views/About1c1.vue"),
        },
        {
          path: "about1c2",
          name: "About1c2",
          meta: {
            requireAuth: true,
          },
          component: () => import("../../views/About1c2.vue"),
        },
      ],
    },
    {
      path: "/about2/",
      name: "About2",
      meta: {
        requireAuth: true,
      },
      component: () => import("../../views/About2.vue"),
    },
    {
      path: "/about3/",
      name: "About3",
      meta: {
        requireAuth: true,
      },
      component: () => import("../../views/About3.vue"),
    },
    {
      path: "/about4",
      name: "About4",
      meta: {
        requireAuth: true,
      },
      component: () => import("../../views/About4.vue"),
      children: [
        {
          path: "about4c1",
          name: "About4c1",
          meta: {
            requireAuth: true,
          },
          component: () => import("../../views/About4c1.vue"),
        },
        {
          path: "about4c2",
          name: "About4c2",
          meta: {
            requireAuth: true,
          },
          component: () => import("../../views/About4c2.vue"),
        },
      ],
    },
    {
      path: "/about5",
      name: "About5",
      meta: {
        requireAuth: true,
      },
      component: () => import("../../views/About5.vue"),
    },
    {
      path: "/about6",
      name: "About6",
      meta: {
        requireAuth: true,
      },
      component: () => import("../../views/About6.vue"),
    },
  ],
};
