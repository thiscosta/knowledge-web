<template>
  <div>
    <PageHeader icon="home" title="Dashboard" subtitle="Base de conhecimento"/>
    <v-layout row wrap align-center justify-center>
      <v-flex align-center xs8 md4 v-for="(stat, index) in stats" :key="index">
        <Statistic :stat="stat" :name="index" :icon="icons[index]"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import baseUrl from "@/api/api";

import PageHeader from "../components/PageHeader";
import Statistic from "../components/Statistic";

export default {
  components: { PageHeader, Statistic },
  data() {
    return {
      stats: {},
      icons: {
        users: "people",
        articles: "dvr",
        categories: "folder_open"
      }
    };
  },
  methods: {
    async getStats() {
      this.stats = await axios
        .get(`${baseUrl}statistics`)
        .then(stats => stats.data);
    }
  },
  created() {
    this.getStats();
  }
};
</script>

<style>
</style>
