<template>
  <v-layout align-center justify-space-between class="mr-4 mb-4 elevation-5">
    <v-flex xs12>
      <v-card :color="theme.backgroundColor">
        <v-layout style="padding:20px">
          <v-flex xs6 justify-start class="text-xs-left">
            <v-icon size="100" :color="theme.primary">{{ icon }}</v-icon>
          </v-flex>
          <v-flex xs6 justify-end class="text-xs-right">
            <v-card-title primary-title>
              <v-flex xs12>
                <div
                  :class="['headline', {'white--text':theme.name == 'dark'}]"
                >{{ toCamelCase(name) }}</div>
                <div :class="['headline', {'white--text':theme.name == 'dark'}]">{{ stat }}</div>
              </v-flex>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["stat", "name", "icon"],
  methods: {
    toCamelCase(text) {
      return this._.capitalize(text);
    }
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  }
};
</script>

<style>
</style>
