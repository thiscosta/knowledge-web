<template>
  <div>
    <v-layout class="mt-5" row wrap>
      <v-flex xs12 style="padding:3vh;">
        <p class="headline font-weight-bold">Lista de categorias</p>
        <v-divider :color="theme.fontColor"></v-divider>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1" row wrap>
      <v-flex xs12 style="padding: 0 3vh">
        <v-list style="background-color: transparent" two-line>
          <CategoryListItem
            v-for="category in categories"
            :key="category._id"
            :category="category"
          />
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import CategoryListItem from "./CategoryListItem";

export default {
  components: { CategoryListItem },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    token() {
      return this.$store.getters.getToken;
    },
    categories() {
      return this.$store.getters.getCategories;
    }
  },
  methods: {
    ...mapActions(["loadCategories"]),
    ...mapActions({ loadCategories: "loadCategories" })
  },
  created() {
    this.loadCategories();
  }
};
</script>

<style>
</style>
