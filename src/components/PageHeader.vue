<template>
  <v-layout align-center row wrap>
    <v-flex xs12 style="display:flex;flex-direction:row">
      <v-icon :color="theme.primary" size="70">{{ icon }}</v-icon>
      <p :style="[{'color':theme.primary}]" class="display-2 font-weight-light mt-3 ml-4">{{ title }}</p>
    </v-flex>
    <v-flex xs12 class="mb-5">
      <p class="font-weight-light title">{{ subtitle }}</p>
      <p class="font-weight-light subtitle">{{ createdAt ? formatDate(createdAt) : '' }}</p>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";

export default {
  props: ["title", "subtitle", "createdAt", "icon"],
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY - HH:mm");
    }
  }
};
</script>

<style>
</style>
