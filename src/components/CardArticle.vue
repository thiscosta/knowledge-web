<template>
  <v-layout
    row
    wrap
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    :class="[{'elevation-10':isHover}, 'card-category', 'mr-4', 'mb-4']"
    :style="[{'cursor': isHover ? 'pointer' : 'normal'}]"
  >
    <v-flex xs12>
      <v-card @click="$emit('article-clicked')">
        <v-layout row wrap>
          <v-flex xs3>
            <v-img :src="article.imageUrl ? article.imageUrl : 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'" height="200"></v-img>
          </v-flex>
          <v-flex xs9>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ article.name }}</div>
                <p>{{ article.description }}</p>
                <p>{{ formatDate(article.createdAt) }}</p>
                <p><strong>Autor: </strong>{{ article.author ? article.author.name : '' }}</p>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'
export default {
  props: ['article'],
  data() {
    return {
      isHover: false
    };
  },
  methods: {
    formatDate(date){
      return moment(date).format('HH:mm DD/MM/YYYY')
    }
  }
};
</script>

<style>
.card-category {
  transition: all 0.4s;
}
</style>
