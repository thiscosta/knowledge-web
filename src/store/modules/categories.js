import axios from 'axios';
import baseUrl from '@/api/api';

export default {
  state: {
    categories: [],
    paths: [],
    tree: []
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setPaths(state, categories) {
      const paths = categories.map(category => {
        return category.path
      })
      state.paths = paths
    },
    setTree(state, tree) {
      state.tree = tree
    }
  },
  actions: {
    async loadCategories({ commit }) {
      const categories = await axios.get(`${baseUrl}categories`)
      commit('setCategories', categories.data)
      commit('setPaths', categories.data)
    },
    async loadTree({ commit }) {
      const tree = await axios
        .get(`${baseUrl}categories/tree`)
        .then(res => res.data);
      commit('setTree', tree)
    },
  },
  getters: {
    getCategories(state) {
      return state.categories
    },
    getPaths(state) {
      return state.paths
    },
    getTree(state){
      return state.tree
    }
  },
};
