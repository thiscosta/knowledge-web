<template>
  <v-toolbar :color="theme.primary" dark>
    <v-toolbar-side-icon @click="$emit('nav-icon-clicked')"/>
    <v-toolbar-title class="text-uppercase font-weight-light">Knowledge</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: ['onMenuClick'],
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  },
};
</script>

<style>
</style>
