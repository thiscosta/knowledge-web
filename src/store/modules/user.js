export default {
  state: {
    loggedUser:{
      authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Y2QxODBjYjA1N2MyMTRiY2MzMTM5YWEiLCJlbWFpbCI6InRoaWFnb0BlbWFpbC5jb20iLCJuYW1lIjoiVGhpYWdvIiwiYWRtaW4iOnRydWUsImlhdCI6MTU1NzQ0ODgxMSwiZXhwIjoxNTU3NzA4MDExfQ.FprQYu3prVxkoItnzbEgndVcXo22SPO1xYNjq8vYVVo'
    }
  },
  mutations: {
    setUser(state, user){
      state.loggedUser = user
    }
  },
  actions: {
    login({ commit }, user){
      commit('setUser', user)
    }
  },
  getters: {
    getToken(state){
      return state.loggedUser.authToken
    }
  }
}
