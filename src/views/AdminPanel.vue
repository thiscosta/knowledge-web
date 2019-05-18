<template>
  <div>
    <v-tabs
      v-model="active"
      color="white"
      dark
      :slider-color="theme.primary"
      class="elevation-5"
      style="border:1px solid white"
    >
      <v-tab>
        <span class="font-weight-bold subheading" :style="[{'color':theme.primary}]">Usuários</span>
      </v-tab>
      <v-tab-item>
        <UserCreation/>
        <UserList/>
      </v-tab-item>
      <v-tab>
        <span class="font-weight-bold subheading" :style="[{'color':theme.primary}]">Categorias</span>
      </v-tab>
      <v-tab-item>
        <CategoryForm/>
        <CategoryList/>
      </v-tab-item>
      <v-tab class="font-weight-bold subheading" :style="[{'color':theme.primary}]">Artigos</v-tab>
      <v-tab-item>
        <ArticleForm/>
        <ArticleList/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import UserList from "@/components/UserList";
import UserCreation from "@/components/UserCreation";
import CategoryList from "@/components/CategoryList";
import CategoryForm from "@/components/CategoryForm";
import ArticleForm from "@/components/ArticleForm";
import ArticleList from "@/components/ArticleList";

export default {
  components: {
    UserCreation,
    CategoryForm,
    ArticleForm,
    UserList,
    CategoryList,
    ArticleList
  },
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
    ...mapActions(["loadUsers"]),
    ...mapActions({ loadUsers: "loadUsers" }),
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    }
  },
  created() {
    this.loadUsers();
  }
};
</script>

<style>
</style>
