import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:''
  },
  mutations: {
    updateToken(state,option){
      state.token=option;
    }
  },
  actions: {
  },
  modules: {
  }
})
