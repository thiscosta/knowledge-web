import Vue from 'vue';
import Router from 'vue-router';
import moment from 'moment'

Vue.use(Router);

import Home from '@/views/Home';
import Category from '@/views/Category'
import Article from '@/views/Article'
import AdminPanel from '@/views/AdminPanel'
import Login from '@/views/Login'

const router = new Router({
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
      component: AdminPanel,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    console.log('usuario logado: ', loggedUser)

    if (!loggedUser || !loggedUser.token) {
      next({ path: '/login', })
      console.log('entrou do !loggedUser.token')
    }



    if (moment() >= moment(loggedUser.exp * 1000)) {
      next({ path: '/login', })
      console.log('entrou do exp')
      console.log(moment().format('DD/MM/YYYY HH:mm:ss') + ' / ' + moment(loggedUser.exp * 1000).format('DD/MM/YYYY HH:mm:ss'))
    }

    if (!loggedUser.admin) {
      next({ path: 'home' })
      console.log('entrou do admin')
    }



    next()


  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('loggedUser').token) {
      next()
    }
    else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router;
