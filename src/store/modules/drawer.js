import axios from 'axios';

export default {
    state: {
        isDrawerOpen: false,
    },
    mutations: {
        openDrawer(state) {
            state.isDrawerOpen = true
        },
        closeDrawer(state) {
            state.isDrawerOpen = false
        }
    },
    actions: {
        async toggleDrawer({ commit, state }) {
            if (state.isDrawerOpen)
                commit('closeDrawer')
            else
                commit('openDrawer')
        }
    },
    getters: {
        getDrawer(state) {
            return state.isDrawerOpen
        }
    },
};
