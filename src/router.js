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
        requiresAdmin: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '*',
      name: '404',
      component: Home,
      meta: {
        notFound: true
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    checkAuthenticated(next)
  } else if (to.matched.some(record => record.meta.guest)) {
    checkGuest(next)
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    checkAdmin(next)
  } else if (to.matched.some(record => record.meta.notFound)) {
    next({ name: 'home' })
  } else {
    next()
  }
})

const checkAuthenticated = (next) => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  if (!loggedUser || !loggedUser.token) {
    next({ name: 'login', })
    return
  }

  if (moment() >= moment(loggedUser.exp * 1000)) {
    next({ name: 'login', })
    return
  }

  next()
}

const checkAdmin = (next) => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  if (!loggedUser || !loggedUser.token) {
    next({ name: 'login', })
    return
  }

  if (moment() >= moment(loggedUser.exp * 1000)) {
    next({ name: 'login', })
    return
  }

  if (!loggedUser.admin) {
    next({ name: 'home' })
    return
  }
  next()
}

const checkGuest = (next) => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
  console.log(!loggedUser)
  if (!loggedUser || !loggedUser.token) {
    next()
  }
  else {
    next({ name: 'home' })
  }
}

export default router;
