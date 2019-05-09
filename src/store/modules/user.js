export default {
  state: {
    loggedUser:{
      authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Y2Q0OWFkNDYyNzAwMTBjODQxYjNhMGEiLCJlbWFpbCI6InRoaXNjb3N0YUBsaXZlLmNvbSIsIm5hbWUiOiJUaGlhZ28gQ29zdGEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTU3NDM3MjQ5LCJleHAiOjE1NTc2OTY0NDl9.xFyd9JE6eUyzfAmVBqC3UypJKNTVjvaQZF2M5N0aquI'
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
