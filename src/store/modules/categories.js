import axios from 'axios';
import baseUrl from '@/api/api';

export default {
  state: {
    categories: [],
    paths: []
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setPaths(state, categories){
      const paths = categories.map(category => {
        return category.path
      })
      state.paths = paths
    }
  },
  actions: {
    async loadCategories({commit}) {
      const categories = await axios.get(`${baseUrl}categories`)
      commit('setCategories', categories.data)
      commit('setPaths', categories.data)
    }
    
  },
  getters: {
    getCategories(state){
      return state.categories
    },
    getPaths(state){
      return state.paths
    }
  },
};
