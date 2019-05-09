<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <PageHeader icon="folder_open" subtitle="Categoria" :title="this.category.name"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex
        xs12
        sm12
        md6
        style="margin-bottom:50px;"
        v-for="article in articles"
        :key="article._id"
      >
        <CardArticle :article="article" v-on:article-clicked="openArticle(article._id)"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";

import CardArticle from "@/components/CardArticle";
import PageHeader from "@/components/PageHeader";

export default {
  components: { CardArticle, PageHeader },
  data() {
    return {
      articles: [],
      category: {}
    };
  },
  methods: {
    async loadData() {
      const category = await axios
        .get("http://localhost:4040/categories/" + this.category._id)
        .then(res => res.data);
      this.category = category;
      const articles = await axios.get(
        `http://localhost:4040/categories/${this.category._id}/articles`
      );
      this.articles = articles.data;
    },
    async openArticle(articleId) {
      this.$router.push({
        name: "article",
        params: { id: this.category._id, articleId }
      });
    }
  },
  watch: {
    $route(to) {
      this.category._id = to.params.id;
      this.articles = [];
      this.loadData();
    }
  },
  async mounted() {
    this.category._id = this.$route.params.id;
    this.loadData();
  }
};
</script>

<style>
</style>
