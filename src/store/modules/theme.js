export default {
  state: {
    theme: {
      dark2: '#1D2153',
      dark: '#2A2F79',
      primary: '#363CA0',
      light: '#474EC2',
      light2: '#6C72D0',
    },
  },
  mutations: {

  },
  getters: {
    getTheme(state) {
      return state.theme;
    },
  },
};
