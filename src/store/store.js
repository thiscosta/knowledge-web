import Vue from 'vue';
import Vuex from 'vuex';

import theme from './modules/theme';
import categories from './modules/categories';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { theme, categories },
});
