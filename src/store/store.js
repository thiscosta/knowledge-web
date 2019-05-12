import Vue from 'vue';
import Vuex from 'vuex';

import theme from './modules/theme';
import categories from './modules/categories';
import articles from './modules/articles';
import drawer from './modules/drawer';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { theme, categories, drawer, user, articles },
});
