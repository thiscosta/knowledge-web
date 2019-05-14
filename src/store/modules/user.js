import axios from 'axios'
import baseUrl from '@/api/api'

export default {
  state: {
    loggedUser: {
      authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1Y2QxODBjYjA1N2MyMTRiY2MzMTM5YWEiLCJlbWFpbCI6InRoaWFnb0BlbWFpbC5jb20iLCJuYW1lIjoiVGhpYWdvIiwiYWRtaW4iOnRydWUsImlhdCI6MTU1Nzg0MTk3MiwiZXhwIjoxNTU4MTAxMTcyfQ.w7uXRcWwTHGvKR0jIOgOq_DZj6igzHd6zLpp9GjJ_Vc'
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
