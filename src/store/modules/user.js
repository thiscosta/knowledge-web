import axios from 'axios'
import baseUrl from '@/api/api'

export default {
  state: {
    loggedUser: {
      authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Y2Q0OWFkNDYyNzAwMTBjODQxYjNhMGEiLCJlbWFpbCI6InRoaXNjb3N0YUBsaXZlLmNvbSIsIm5hbWUiOiJUaGlhZ28gQ29zdGEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTU3NjgwNTI2LCJleHAiOjE1NTc5Mzk3MjZ9.cAidUrAs013FxTrOTBaB-64D4IdJu24fgXg65bTTJ1o'
    },
    users: []
  },
  mutations: {
    setLoggedUser(state, user) {
      state.loggedUser = user
    },
    setUsers(state, users) {
      state.users = users
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setLoggedUser', {
        authToken: ''
      })
    },
    loadUsers({ state, commit }) {
      axios(`${baseUrl}users`, {
        headers: {
          Authorization: 'Bearer ' + state.loggedUser.authToken
        }
      }).then(users => {
        users.data.map(user => {
          delete user.password
        })
        commit('setUsers', users.data)
      })
    }
  },
  getters: {
    getToken(state) {
      return state.loggedUser.authToken
    },
    getUsers(state) {
      return state.users
    }
  }
}
