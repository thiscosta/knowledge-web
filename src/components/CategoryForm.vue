<template>
  <v-layout row wrap @keydown.enter="createCategory">
    <v-flex xs12 style="padding:3vh;">
      <p class="headline font-weight-bold">Criar uma nova categoria</p>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Nome:
      <v-text-field
        class="mt-3"
        label="Digite o nome da categoria"
        solo
        prepend-inner-icon="edit"
        v-model="category.name.value"
        :error="category.name.error"
        :error-messages="category.name.errorMessages"
      />
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Caminho:
      <v-select
        :items="paths"
        class="mt-3"
        label="Selecione o caminho da categoria..."
        solo
        prepend-inner-icon="folder_open"
        v-model="category.parent.value"
        :error="category.parent.error"
        :error-messages="category.parent.errorMessages"
      />
    </v-flex>
    <v-flex xs12 text-xs-center class="mt-5 mb-5">
      <v-btn :color="theme.primary" dark large @click="createCategory">Enviar</v-btn>
    </v-flex>
    <v-snackbar
      color="green"
      v-model="successCreatedCategory"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Categoria criado com sucesso!
      <v-btn color="white" flat @click="successCreatedCategory = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="red"
      v-model="failedCreatedCategory"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Erro ao criar categoria, por favor tente novamente.
      <v-btn color="white" flat @click="failedCreatedCategory = false">Fechar</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import axios from "axios";
import baseUrl from "@/api/api";

export default {
  data() {
    return {
      categories: [],
      paths: [],
      category: {
        name: { error: false, errorMessages: [], value: "" },
        parent: { error: false, errorMessages: [], value: "" }
      },
      successCreatedCategory: false,
      failedCreatedCategory: false
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
    createCategory() {
      if (this.validateAllFields()) {
        axios
          .post(`${baseUrl}categories`, this.mountBody(), {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status == 200 && res.data) {
              this.successCreatedCategory = true;
              this.resetForm();
            } else {
              this.failedCreatedCategory = true;
            }
          })
          .catch(err => {
            this.failedCreatedCategory = true;
          });
      }
    },
    validateAllFields() {
      this.removeErrors(["name"]);
      this.validateName();
      this.validateParent();
      return !this.hasErrors();
    },
    validateName() {
      if (this.category.name.value.length < 2) {
        this.addError("name", ["The name must have at least 2 characters"]);
      }
    },
    validateParent() {
      if (this.category.parent.value.length <= 0) {
        return;
      }
      const parent = this.categories.find(
        category => category.path == this.category.parent.value
      );
      if (!parent) {
        this.addError("parent", ["The selected parent doesn't exists"]);
      }
      return;
    },
    addError(field, messages) {
      this.category[field].error = true;
      this.category[field].errorMessages = messages;
    },
    removeErrors(fields) {
      fields.map(field => {
        this.category[field].error = false;
        this.category[field].errorMessages = [];
      });
    },
    hasErrors() {
      if (!this.category.name.error && !this.category.parent.error) {
        return false;
      }
      return true;
    },
    resetForm() {
      this.category = {
        name: { error: false, errorMessages: [], value: "" },
        parent: { error: false, errorMessages: [], value: "" }
      };
    },
    mountBody() {
      let body = {};
      if (this.category.parent.value) {
        const parent = this.categories.find(
          category => category.path == this.category.parent.value
        );
        body = {
          name: this.category.name.value,
          parentId: parent._id
        };
      } else {
        body = {
          name: this.category.name.value
        };
      }
      console.log("body: ", body);
      return body;
    }
  },
  async created() {
    this.categories = await axios(`${baseUrl}categories`).then(res => res.data);
    this.paths = this.categories.map(category => category.path);
  }
};
</script>

<style>
</style>
