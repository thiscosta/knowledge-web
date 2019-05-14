import axios from 'axios'
import baseUrl from '@/api/api'

export default {
  state: {
    loggedUser: {
      token: '',
      _id: '',
      email: '',
      name: '',
      admin: false,
      iat: '',
      exp: '',
    },
    users: []
  },
  mutations: {
    setLoggedUser(state, user) {
      state.loggedUser = user
      localStorage.setItem('loggedUser', JSON.stringify(state.loggedUser))
    },
    setUsers(state, users) {
      state.users = users
    }
  },
  actions: {
    loadUser({ commit }) {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      if (loggedUser.token) {
        commit('setLoggedUser', loggedUser)
      }
    },
    login({ commit }, user) {
      commit('setLoggedUser', user)
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
      return state.loggedUser.token
    },
    getUsers(state) {
      return state.users
    }
  }
}
