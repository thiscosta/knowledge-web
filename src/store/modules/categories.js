import axios from 'axios';
import baseUrl from '@/api/api';

export default {
  state: {
    categories: [],
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    async loadCategories({commit}) {
      const categories = await axios.get(`${baseUrl}categories`)
      commit('setCategories', categories.data)
    }
  },
  getters: {
    getCategories(state){
      return state.categories
    }
  },
};
