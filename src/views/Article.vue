<template>
  <div>
    <ArticleHeader :title="article.name" :createdAt="article.createdAt"/>
    <v-layout row wrap>
      <v-flex xs12 style="margin-bottom:50px;">{{ article.name }}</v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";

import ArticleHeader from "@/components/ArticleHeader";

export default {
  components: { ArticleHeader },
  data() {
    return {
      article: {}
    };
  },
  methods: {
    async loadData() {
      const article = await axios.get(
        "http://localhost:4040/articles/" + this.article._id
      );
      console.log("achou o article", article);
      this.article = article.data;
    }
  },
  watch: {
    $route(to) {
      this.article._id = to.params.articleId;
      this.loadData();
    }
  },
  async mounted() {
    this.article._id = this.$route.params.articleId;
    this.loadData();
  }
};
</script>

<style>
</style>
