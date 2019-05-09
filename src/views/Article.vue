<template>
  <div>
    <PageHeader :title="article.name" subtitle="Artigo" icon="dvr" :createdAt="article.createdAt"/>
    <v-layout row wrap>
      <v-flex v-html="article.content"></v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";

import PageHeader from "@/components/PageHeader";

export default {
  components: { PageHeader },
  data() {
    return {
      article: {}
    };
  },
  methods: {
    async getArticle() {
      const article = await axios.get(
        "http://localhost:4040/articles/" + this.article._id
      );
      this.article = article.data;
    }
  },
  watch: {
    $route(to) {
      this.article._id = to.params.articleId;
      this.getArticle();
    }
  },
  async mounted() {
    this.article._id = this.$route.params.articleId;
    this.getArticle();
  }
};
</script>

<style>
</style>
