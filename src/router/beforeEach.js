import router from "./index";
import store from "../store/index";

export default router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth){
    if (store.state.token){
      next()
    } else{
      alert('请先登录');
      next({path:'/login'});
    }
  }else{
    next()
  }
})
