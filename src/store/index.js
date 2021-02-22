import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:''
  },
  mutations: {
    setToken(state,option){
      state.token=option;
      sessionStorage.setItem('token',option);
    },
    getToken(state){
      state.token=sessionStorage.getItem('token');
    },
    clearToken(state){
      state.token='';
      sessionStorage.removeItem('token');
    }
  },
  actions: {
  },
  modules: {
  }
})
