export default {
  namespaced: true,
  state: {
    token: "",
  },
  mutations: {
    updateToken(state, options) {
      state.token = options;
    },
  },
  actions: {},
  getters: {},
};
