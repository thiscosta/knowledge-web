import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from '@/views/Home';
import ArticlesByCategory  from '@/views/ArticlesByCategory'
import Article  from '@/views/Article'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/categories/:id/articles',
      name: 'articlesByCategory',
      component: ArticlesByCategory,
    },
    {
      path: '/categories/:id/articles/:articleId',
      name: 'article',
      component: Article,
    },
  ],
});
