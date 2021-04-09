const Login = () => import("../../views/Login.vue");
const About0 = () => import("../../views/About0.vue");
const About0c1 = () => import("../../views/About0c1.vue");

// 常量路由
export default {
  decp: "常量路由",
  data: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/About0",
      name: "About0",
      component: About0,
      meta: {
        requireAuth: false,
      },
      children: [
        {
          path: "/About0c1",
          name: "About0c1",
          component: About0c1,
          meta: {
            requireAuth: false,
          },
        },
      ],
    },
  ],
};
