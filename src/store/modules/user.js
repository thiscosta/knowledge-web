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
      if (loggedUser && loggedUser.token) {
        commit('setLoggedUser', loggedUser)
      }
    },
    login({ commit }, user) {
      commit('setLoggedUser', user)
    },
    logout({ commit }) {
      commit('setLoggedUser', {
        token: '',
        _id: '',
        email: '',
        name: '',
        admin: false,
        iat: '',
        exp: '',
      })
      localStorage.removeItem('loggedUser')
    },
    loadUsers({ state, commit }) {
      axios(`${baseUrl}users`, {
        headers: {
          Authorization: 'Bearer ' + state.loggedUser.token
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
    },
    getLoggedUser(state){
      return state.loggedUser
    }
  }
}
