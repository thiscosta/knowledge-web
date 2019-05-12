import axios from 'axios';
import baseUrl from '@/api/api';

export default {
  state: {
    articles: []
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
  },
  actions: {
    async loadArticles({ commit }) {
      const articles = await axios.get(`${baseUrl}articles`)
      commit('setArticles', articles.data)
    }
  },
  getters: {
    getArticles(state) {
      return state.articles
    }
  },
};
