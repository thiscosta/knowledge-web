import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from '@/views/Home';
import Category from '@/views/Category'
import Article from '@/views/Article'
import AdminPanel from '@/views/AdminPanel'

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
      component: Category,
    },
    {
      path: '/categories/:id/articles/:articleId',
      name: 'article',
      component: Article,
    },
    {
      path: '/admin',
      name: 'adminPanel',
      component: AdminPanel
    },
  ],
});
