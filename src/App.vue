<template>
  <v-app>
    <Header v-on:nav-icon-clicked="changeDrawer"/>
    <v-content>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <Drawer/>
          </v-flex>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Drawer from "./components/Drawer.vue";
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      drawer: false
    };
  },
  components: {
    Header,
    Drawer
  },
  methods: {
    ...mapActions(['toggleDrawer']),
    ...mapActions({toggleDrawer: 'toggleDrawer'}),
    changeDrawer() {
      this.toggleDrawer()
    }
  }
};
</script>
