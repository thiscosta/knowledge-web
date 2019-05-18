<template>
  <v-app :style="[{'background-color': theme.backgroundColor }, {'color':theme.fontColor}]">
    <div v-if="$router.currentRoute.name != 'login'">
      <Header v-on:nav-icon-clicked="changeDrawer"/>
      <v-content>
        <v-container>
          <v-layout style="min-height:100vh;">
            <Drawer/>
            <v-flex xs12>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Drawer from "./components/Drawer.vue";
import { mapActions } from "vuex";

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
    ...mapActions(["toggleDrawer", "loadTree", "loadTheme", "loadUser"]),
    ...mapActions({
      toggleDrawer: "toggleDrawer",
      loadTree: "loadTree",
      loadTheme: "loadTheme",
      loadUser: "loadUser"
    }),
    changeDrawer() {
      this.toggleDrawer();
    }
  },
  created() {
    this.loadTree();
    this.loadUser();
    this.loadTheme();
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  }
};
</script>
