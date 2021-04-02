import router from "../index";
import store from "../../store/index";

export default router.beforeEach((to, from, next) => {
 // store.commit('getToken')
  console.log(store.state.token);
  if (to.meta.requireAuth){
    if (!store.state.token&&to.path!=='login'){
      alert('请先登录');
      next({path:'/login'});
    } else{
      next();
    }
  }else{
    next()
  }
})
