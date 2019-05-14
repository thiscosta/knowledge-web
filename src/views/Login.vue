<template>
  <v-layout
    row
    wrap
    :style="[{'background-color':theme.primary}, {'height':'100vh'}]"
    align-center
    justify-center
  >
    <v-flex xs10 sm8 md6 lg4>
      <v-layout
        row
        wrap
        class="elevation-15"
        style="background-color: white; height:60vh"
        align-content-start
      >
        <v-flex xs12 text-xs-center class="mt-5 mb-2">
          <p class="display-3 font-weight-light" :style="[{'color':theme.primary}]">Login</p>
        </v-flex>
        <v-flex xs12 text-xs-center class="mb-3 ml-5 mr-5">
          <v-alert :value="errorMessage.length > 0" type="error">{{ errorMessage }}</v-alert>
        </v-flex>
        <v-flex xs12 class="ml-5 mr-5 mt-5">
          Email:
          <v-text-field
            type="email"
            label="Digite o email"
            solo
            prepend-inner-icon="email"
            v-model="user.email"
            :error="emailError.length > 0"
            :error-messages="emailError"
          />
        </v-flex>
        <v-flex xs12 class="ml-5 mr-5 mt-3">
          Senha:
          <v-text-field
            type="password"
            label="Digite a sua senha"
            solo
            prepend-inner-icon="vpn_key"
            v-model="user.password"
            :error="passwordError.length > 0"
            :error-messages="passwordError"
          />
        </v-flex>
        <v-flex xs12 class="mt-5" text-xs-center>
          <v-btn
            large
            :color="theme.primary"
            class="white--text"
            style="width:20vh"
            @click="makingLogin ? () => {}: signin()"
          >
            <div v-if="makingLogin">
              <v-progress-circular :size="30" color="white" indeterminate></v-progress-circular>
            </div>
            <div v-else>Entrar</div>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import baseUrl from "@/api/api";
import axios from "axios";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      makingLogin: false,
      errorMessage: "",
      emailError: [],
      passwordError: []
    };
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  },
  methods: {
    ...mapActions(["login"]),
    ...mapActions({ login: "login" }),
    signin() {
      this.removeErrors(["password", "email"]);
      this.validateEmail();
      this.validatePassword();
      if (!this.hasErrors()) {
        this.makingLogin = true;
        axios
          .post(`${baseUrl}signin`, this.user)
          .then(result => {
            if (result.status == 200 && result.data.token) {
              this.login(result.data);
              this.$router.push({
                name: "home"
              });
            } else if (result.status == 401) {
              this.errorMessage = "Email e/ou senha inválidos";
            }
          })
          .catch(error => {
            if (error.toString().includes("401")) {
              this.errorMessage = "Email e/ou senha inválidos";
            } else {
              this.errorMessage =
                "Erro ao realizar login. Por favor, tente novamente";
            }
          });
        this.makingLogin = false;
      } else {
        this.emailError = ["Please insert a valid email"];
      }
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
      if (this.emailError.length > 0 || this.passwordError.length > 0) {
        return true;
      }
      return false;
    },
    validatePassword() {
      if (this.user.password.length < 8) {
        this.addError("password", [
          "The password must have at least 8 characters"
        ]);
        return false;
      }
      return true;
    },
    validateEmail() {
      let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
      if (!regex.test(this.user.email)) {
        this.addError("email", ["Please insert a valid email"]);
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
</style>
