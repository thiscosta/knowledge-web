export default {
  state: {
    theme: {
      name: 'dark',
      dark2: '#1D2153',
      dark: '#2A2F79',
      primary: '#7e57c2 ',
      light: '#474EC2',
      light2: '#6C72D0',
      backgroundColor: '#303030',
      fontColor: 'white'
    },
    darkTheme: {
      name: 'dark',
      dark2: '#5D22C1',
      dark: '#6936C1',
      primary: '#7e57c2 ',
      light: '#8562C1',
      light2: '#9378C1',
      backgroundColor: '#303030',
      fontColor: 'white'
    },
    lightTheme: {
      name: 'light',
      dark2: '#5D22C1',
      dark: '#6936C1',
      primary: '#7e57c2 ',
      light: '#8562C1',
      light2: '#9378C1',
      backgroundColor: 'white',
      fontColor: '#303030'
    }
  },
  mutations: {
    setTheme(state, theme) {
      if (theme === 'light') {
        state.theme = { ...state.lightTheme };
      } else {
        state.theme = { ...state.darkTheme }
      }
      localStorage.setItem('theme', JSON.stringify(state.theme))
    }
  },
  actions: {
    loadTheme({ commit }) {
      const theme = JSON.parse(localStorage.getItem('theme'))
      commit('setTheme', theme.name)
    },
    changeTheme({ commit }, theme) {
      commit('setTheme', theme)
    }
  },
  getters: {
    getTheme(state) {
      return state.theme;
    },
  },
};
