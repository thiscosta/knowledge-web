<template>
  <div>
    <v-tabs v-model="active" color="white" dark :slider-color="theme.primary" class="elevation-5">
      <v-tab class="tab">
        <span class="font-weight-bold subheading" :style="[{'color':theme.primary}]">Usuários</span>
      </v-tab>
      <v-tab-item>
        <UserForm/>
      </v-tab-item>
      <v-tab>
        <span class="font-weight-bold subheading" :style="[{'color':theme.primary}]">Categorias</span>
      </v-tab>
      <v-tab-item>
        <CategoryForm/>
      </v-tab-item>
      <v-tab class="font-weight-bold subheading" :style="[{'color':theme.primary}]">Artigos</v-tab>
      <v-tab-item>
        <ArticleForm/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import UserForm from "@/components/UserForm";
import CategoryForm from "@/components/CategoryForm";
import ArticleForm from "@/components/ArticleForm";

export default {
  components: { UserForm, CategoryForm, ArticleForm },
  data() {
    return {
      titles: [
        { title: "Usuários" },
        { title: "Categorias" },
        { title: "Artigos" }
      ],
      active: 0
    };
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  },

  methods: {
    ...mapActions(["loadCategories"]),
    ...mapActions({ loadCategories: "loadCategories" }),
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    }
  },
  created() {
    this.loadCategories();
  }
};
</script>

<style>
</style>
