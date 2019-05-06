import axios from 'axios';

export default {
  state: {
    categories: [],
  },
  mutations: {
    setCategories(state, categories){
      state.categories = categories
    }
  },
  actions: {
    async loadCategories({commit}){
      const categories = await axios.get('http://localhost:4040/categories')
      commit('setCategories', categories.data)
    }
  },
  getters: {
    getCategories(state){
      return state.categories
    }
  },
};
