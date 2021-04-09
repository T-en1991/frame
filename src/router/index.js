import Vue from "vue";
import VueRouter from "vue-router";
import cRoute from "./routersConst";
import pRoute from "./routersPermission";

Vue.use(VueRouter);
console.log(pRoute);
const routes = [...cRoute.data, ...pRoute.data];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
