<template>
  <v-layout align-center row wrap>
    <v-flex xs12 style="display:flex;flex-direction:row">
      <v-icon :color="theme.primary" size="70">folder_open</v-icon>
      <p
        :style="[{'color':theme.primary}]"
        class="display-2 font-weight-light mt-3"
      >{{ title }}</p>
    </v-flex>
    <v-flex xs12 class="mb-5">
        <p class="font-weight-light title">Categoria</p>
        <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["title"],
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  }
};
</script>

<style>
</style>
