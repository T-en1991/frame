const UserModule={
  namespaced:true,
  state: {
    token:'',
  },
  mutations: {
    updateToken(state,option){
      state.token=option;
    }
  },
  actions: {
  },
  getters:{

  }
}
export default{
  UserModule
}