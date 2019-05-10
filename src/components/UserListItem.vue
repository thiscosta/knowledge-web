<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
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
        <v-list-tile-action>
          <v-icon :color="'red'" @click.prevent="removeUser()">delete</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </template>
    <v-card>
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
                v-model="user.name"
                :error="nameError.length > 0"
                :error-messages="nameError"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :color="theme.primary"
                label="Email"
                type="email"
                v-model="user.email"
                :error="emailError.length > 0"
                :error-messages="emailError"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :color="theme.primary"
                label="Senha"
                type="password"
                v-model="user.password"
                :error="passwordError.length > 0"
                :error-messages="passwordError"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-checkbox
                :color="theme.primary"
                v-model="user.admin"
                label="Administrador"
                :dark="theme.name == 'dark'"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="theme.primary" flat @click="dialog = false">Cancelar</v-btn>
        <v-btn :color="theme.primary" flat @click="editUser">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      dialog: false,
      nameError: [],
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
    editUser() {
      if (this.validateAllFields()) {
          this.dialog = false
      }
      //dialog = false
    },
    validateAllFields() {
      this.removeErrors(["name", "email", "password"]);
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      return !this.hasErrors();
    },
    validateName() {
      if (this.user.name.length < 5) {
        this.addError("name", ["The name must have at least 5 characters"]);
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
    },
    validatePassword() {
      if (this.user.password && this.user.password.length < 8) {
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
      alert("remove");
    }
  }
};
</script>

<style>
</style>
