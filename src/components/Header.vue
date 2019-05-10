<template>
  <v-toolbar :color="theme.primary" dark>
    <v-toolbar-side-icon @click="$emit('nav-icon-clicked')"/>
    <v-toolbar-title
      :style="[{'cursor': isHoverBrand ? 'pointer' : 'normal'}]"
      @mouseenter="isHoverBrand = true"
      @mouseleave="isHoverBrand = false"
      class="text-uppercase font-weight-light"
      @click="goHome"
    >Knowledge</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat :color="theme.primary" class="white--text" v-on="on">
            Thiago Costa
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="adminPanel()">
            <v-list-tile-title>
              <v-icon class="mr-2">settings</v-icon>Painel administrativo
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="exit()">
            <v-list-tile-title>
              <v-icon class="mr-2">exit_to_app</v-icon>Logout
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat :color="theme.primary" class="white--text" v-on="on">
            Tema
            <v-icon class="ml-2">palette</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="changeTheme('dark')">
            <v-list-tile-title>Escuro</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="changeTheme('light')">
            <v-list-tile-title>Claro</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["onMenuClick"],
  data() {
    return {
      isHoverBrand: false
    };
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  },
  methods: {
    ...mapActions(["logout", "changeTheme"]),
    ...mapActions({ logout: "logout", changeTheme: "changeTheme" }),
    goHome() {
      this.$router.push("/");
    },
    adminPanel() {
      this.$router.push({
        name: "adminPanel"
      });
    },
    exit() {
      this.logout();
    },
  }
};
</script>

<style>
</style>
