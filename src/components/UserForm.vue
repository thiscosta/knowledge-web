<template>
  <v-layout row wrap @keydown.enter="createUser">
    <v-flex xs12 style="padding:3vh;">
      <p class="headline font-weight-bold">Criar um novo usuário</p>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Nome:
      <v-text-field
        class="mt-3"
        label="Digite seu nome..."
        solo
        prepend-inner-icon="perm_identity"
        v-model="user.name.value"
        :error="user.name.error"
        :error-messages="user.name.errorMessages"
      />
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Email:
      <v-text-field
        class="mt-3"
        type="email"
        label="Email"
        solo
        prepend-inner-icon="email"
        v-model="user.email.value"
        :error="user.email.error"
        :error-messages="user.email.errorMessages"
      />
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Senha:
      <v-text-field
        class="mt-3"
        type="password"
        label="Senha"
        solo
        prepend-inner-icon="vpn_key"
        v-model="user.password.value"
        :error="user.password.error"
        :error-messages="user.password.errorMessages"
      />
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Confirmação da senha:
      <v-text-field
        class="mt-3"
        type="password"
        label="Confirme sua senha"
        solo
        prepend-inner-icon="vpn_key"
        v-model="user.confirmPassword.value"
        :error="user.confirmPassword.error"
        :error-messages="user.confirmPassword.errorMessages"
      />
    </v-flex>
    <v-flex xs12 text-xs-center class="mt-5 mb-5">
      <v-btn :color="theme.primary" dark large @click="createUser">Enviar</v-btn>
    </v-flex>
    <v-snackbar
      color="green"
      v-model="successCreatedUser"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Usuário criado com sucesso!
      <v-btn color="white" flat @click="successCreatedUser = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="red"
      v-model="failedCreatedUser"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Erro ao criar usuário, por favor tente novamente.
      <v-btn color="white" flat @click="failedCreatedUser = false">Fechar</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import axios from "axios";
import baseUrl from "@/api/api";

export default {
  data() {
    return {
      user: {
        name: { error: false, errorMessages: [], value: "" },
        email: { error: false, errorMessages: [], value: "" },
        password: { error: false, errorMessages: [], value: "" },
        confirmPassword: { error: false, errorMessages: [], value: "" }
      },
      successCreatedUser: false,
      failedCreatedUser: false
    };
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  },
  methods: {
    createUser() {
      if (this.validateAllFields()) {
        axios
          .post(`${baseUrl}signup`, {
            name: this.user.name.value,
            email: this.user.email.value,
            password: this.user.password.value,
            confirmPassword: this.user.confirmPassword.value
          })
          .then(res => {
            if (res.status == 200 && res.data) {
              this.successCreatedUser = true;
              this.resetForm();
            } else {
              this.failedCreatedUser = true;
            }
          })
          .catch(err => {
            this.failedCreatedUser = true;
          });
      }
    },
    validateAllFields() {
      this.removeErrors(["name", "email", "password", "confirmPassword"]);
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      return this.hasErrors();
    },
    validateName() {
      if (this.user.name.value.length < 5) {
        this.addError("name", ["The name must have at least 5 characters"]);
        return false;
      }
      return true;
    },
    validateEmail() {
      let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
      if (!regex.test(this.user.email.value)) {
        this.addError("email", ["Please insert a valid email"]);
        return false;
      }
      return true;
    },
    validatePassword() {
      let hasErrors = false;
      if (this.user.password.value.length < 8) {
        this.addError("password", [
          "The password must have at least 8 characters"
        ]);
        hasErrors = true;
      }
      if (
        !this.isPasswordAndConfirmPasswordValid(
          this.user.password.value,
          this.user.confirmPassword.value
        )
      ) {
        hasErrors = true;
      }
      return !hasErrors;
    },
    isPasswordAndConfirmPasswordValid(password, confirmPassword) {
      if (password != confirmPassword) {
        this.addError("confirmPassword", [
          "The password and the confirmation must be the same"
        ]);
        return false;
      }
      return true;
    },
    addError(field, messages) {
      this.user[field].error = true;
      this.user[field].errorMessages = messages;
    },
    removeErrors(fields) {
      fields.map(field => {
        this.user[field].error = false;
        this.user[field].errorMessages = [];
      });
    },
    hasErrors() {
      if (
        !this.user.name.error &&
        !this.user.email.error &&
        !this.user.password.error &&
        !this.user.confirmPassword.error
      ) {
        return true;
      }
      return false;
    },
    resetForm() {
      this.user = {
        name: { error: false, errorMessages: [], value: "" },
        email: { error: false, errorMessages: [], value: "" },
        password: { error: false, errorMessages: [], value: "" },
        confirmPassword: { error: false, errorMessages: [], value: "" }
      };
    }
  }
};
</script>

<style>
</style>
