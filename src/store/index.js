import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import example1 from './modules/example1'
import example2 from './modules/example2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    example1,
    example2
  }
})
