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
          <v-list-tile @click="logout()">
            <v-list-tile-title>
              <v-icon class="mr-2">exit_to_app</v-icon>Logout
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: ["onMenuClick"],
  data() {
    return {
      isHoverBrand: false,
    };
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    adminPanel(){
      this.$router.push({
        name: 'adminPanel'
      });
    },
    async logout(){
      let user = await localStorage.getItem('user')

    }
  }
};
</script>

<style>
</style>
