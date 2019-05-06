<template>
  <v-app>
    <Header v-on:nav-icon-clicked="toggleDrawer"/>
    <v-content>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <Drawer :drawer="drawer"/>
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
  methods:{
    toggleDrawer(){
      this.drawer = !this.drawer
    }
  }
};
</script>
