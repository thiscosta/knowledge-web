<template>
  <div>
    <v-dialog v-model="edition" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title :style="[{'color':theme.fontColor}]">{{ user.name }}</v-list-tile-title>
            <v-list-tile-sub-title :style="[{'color':theme.fontColor}]">{{ user.email }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-spacer/>
          <v-list-tile-action>
            <!-- <v-icon :color="theme.primary" v-on="on"  @click.prevent="editUser()">edit</v-icon> -->
            <v-icon :color="theme.primary" v-on="on">edit</v-icon>
          </v-list-tile-action>

          <v-dialog v-model="deletion" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-list-tile-action>
                <v-icon :color="'red'" v-on="on" @click.prevent>delete</v-icon>
              </v-list-tile-action>
            </template>
            <v-card :style="[{ 'background-color':theme.backgroundColor }]">
              <v-card-title class="headline">Excluir usuário</v-card-title>
              <v-card-text>Tem certeza que deseja excluir o usuário {{ user.name }}?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="theme.primary" flat @click="deletion = false">Cancelar</v-btn>
                <v-btn :color="theme.primary" flat @click="removeUser()">Excluir</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-tile>
      </template>
      <v-card :style="[{'background-color' : theme.backgroundColor}, {'color':theme.fontColor}]">
        <v-card-title>
          <span class="headline">Editar: {{ user.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  :color="theme.primary"
                  label="Nome"
                  v-model="userEdition.name"
                  :error="nameError.length > 0"
                  :error-messages="nameError"
                  :dark="theme.name == 'dark'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :color="theme.primary"
                  label="Email"
                  type="email"
                  v-model="userEdition.email"
                  :error="emailError.length > 0"
                  :error-messages="emailError"
                  :dark="theme.name == 'dark'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :color="theme.primary"
                  label="Senha"
                  type="password"
                  v-model="userEdition.password"
                  :error="passwordError.length > 0"
                  :error-messages="passwordError"
                  :dark="theme.name == 'dark'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  :color="theme.primary"
                  v-model="userEdition.admin"
                  label="Administrador"
                  :dark="theme.name == 'dark'"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="theme.primary" flat @click="edition = false">Cancelar</v-btn>
          <v-btn :color="theme.primary" flat @click="editUser">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      color="green"
      v-model="successEditedUser"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Usuário editado com sucesso!
      <v-btn color="white" flat @click="successEditedUser = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="red"
      v-model="failedEditedUser"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Erro ao editar usuário, por favor tente novamente.
      <v-btn color="white" flat @click="failedEditedUser = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="green"
      v-model="successDeletedUser"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Usuário excluído com sucesso!
      <v-btn color="white" flat @click="successDeletedUser = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="red"
      v-model="failedDeletedUser"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Erro ao excluir usuário, por favor tente novamente.
      <v-btn color="white" flat @click="failedDeletedUser = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import baseUrl from "@/api/api";
import { mapActions } from "vuex";

export default {
  props: ["user"],
  data() {
    return {
      edition: false,
      deletion: false,
      nameError: [],
      emailError: [],
      passwordError: [],
      userEdition: {},
      successEditedUser: false,
      failedEditedUser: false,
      successDeletedUser: false,
      failedDeletedUser: false
    };
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    token() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    ...mapActions(["loadUsers"]),
    ...mapActions({ loadUsers: "loadUsers" }),
    editUser() {
      if (this.validateAllFields()) {
        axios
          .put(`${baseUrl}users/${this.user._id}`, this.userEdition, {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          })
          .then(result => this.handleUserEdition(result));
      }
    },
    handleUserEdition(res) {
      if (res.status == 200 && res.data) {
        this.loadUsers();
        this.successEditedUser = true;
        this.edition = false;
      } else {
        this.failedEditedUser = true;
      }
    },
    validateAllFields() {
      this.removeErrors(["name", "email", "password"]);
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      return !this.hasErrors();
    },
    validateName() {
      if (this.userEdition.name.length < 5) {
        this.addError("name", ["The name must have at least 5 characters"]);
        return false;
      }
      return true;
    },
    validateEmail() {
      let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
      if (!regex.test(this.userEdition.email)) {
        this.addError("email", ["Please insert a valid email"]);
        return false;
      }
      return true;
    },
    validatePassword() {
      if (this.userEdition.password && this.userEdition.password.length < 8) {
        this.addError("password", [
          "The password must have at least 8 characters"
        ]);
        return true;
      }
      return false;
    },
    addError(field, messages) {
      this[field + "Error"] = messages;
    },
    removeErrors(fields) {
      fields.map(field => {
        this[field + "Error"] = [];
      });
    },
    hasErrors() {
      if (
        this.nameError.length > 0 ||
        this.emailError.length > 0 ||
        this.passwordError.length > 0
      ) {
        return true;
      }
      return false;
    },
    removeUser() {
      axios
        .delete(`${baseUrl}users/${this.user._id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(result => this.handleUserDeletion(result));
    },
    handleUserDeletion(response) {
      console.log("reponse do delet: ", response);
      if (response.status == 200 && !response.data) {
        this.successDeletedUser = true;
        this.loadUsers();
        this.deletion = false;
        this.edition = false;
      } else {
        this.failedDeletedUser = true;
      }
    }
  },
  created() {
    this.userEdition = { ...this.user };
  }
};
</script>

<style>
</style>
