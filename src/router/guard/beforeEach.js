import router from "../index";

export default router.beforeEach((to, from, next) => {
  // store.commit('getToken')
  if (to.meta.requireAuth) {
    if (!sessionStorage.getItem("token") && to.path !== "login") {
      alert("请先登录");
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
