<template>
  <div>
    <v-layout class="mt-5" row wrap>
      <v-flex xs12 style="padding:3vh;">
        <p class="headline font-weight-bold">Lista de usuários</p>
        <v-divider :color="theme.fontColor"></v-divider>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1" row wrap>
      <v-flex xs12 style="padding: 0 3vh">
        <v-list style="background-color: transparent" two-line>
          <UserListItem v-for="user in users" :key="user._id" :user="user"/>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import UserListItem from "./UserListItem";

export default {
  components: { UserListItem },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    token() {
      return this.$store.getters.getToken;
    },
    users() {
      return this.$store.getters.getUsers;
    }
  }
};
</script>

<style>
</style>
