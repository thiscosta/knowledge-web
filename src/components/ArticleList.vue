<template>
  <div>
    <v-layout class="mt-5" row wrap>
      <v-flex xs12 style="padding:3vh;">
        <p class="headline font-weight-bold">Lista de artigos</p>
        <v-divider :color="theme.fontColor"></v-divider>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1" row wrap>
      <v-flex xs12 style="padding: 0 3vh">
        <v-list style="background-color: transparent" two-line>
          <p
            :class="[{'white--text':theme.name == 'dark'}]"
            v-for="article in articles"
            :key="article._id"
          >{{ article.name }}</p>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    token() {
      return this.$store.getters.getToken;
    },
    articles() {
      return this.$store.getters.getArticles;
    }
  }
};
</script>

<style>
</style>
