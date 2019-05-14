<template>
  <v-layout row wrap>
    <v-flex xs12 style="padding:3vh;">
      <p class="headline font-weight-bold">Criar um novo artigo</p>
      <v-divider :color="theme.fontColor"></v-divider>
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Nome:
      <v-text-field
        class="mt-3"
        label="Digite o nome do artigo"
        solo
        prepend-inner-icon="edit"
        v-model="article.name.value"
        :error="article.name.error"
        :error-messages="article.name.errorMessages"
      />
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Descrição:
      <v-text-field
        class="mt-3"
        label="Digite a descrição da categoria"
        solo
        prepend-inner-icon="short_text"
        v-model="article.description.value"
        :error="article.description.error"
        :error-messages="article.description.errorMessages"
      />
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Imagem:
      <v-text-field
        class="mt-3"
        label="Digite a url da imagem"
        solo
        prepend-inner-icon="image"
        v-model="article.imageUrl.value"
        :error="article.imageUrl.error"
        :error-messages="article.imageUrl.errorMessages"
      />
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Categoria:
      <v-select
        :items="paths"
        class="mt-3"
        label="Selecione uma categoria"
        solo
        prepend-inner-icon="folder_open"
        v-model="article.category.value"
        :error="article.category.error"
        :error-messages="article.category.errorMessages"
      />
    </v-flex>
    <v-flex xs12 class="ml-5 mr-5 mt-4">
      Conteúdo:
      <VueEditor v-model="article.content.value"/>
      <!-- <v-text-field
        class="mt-3"
        solo
        prepend-inner-icon="text_format"
        v-model="article.content.value"
        :error="article.content.error"
        :error-messages="article.content.errorMessages"
      />-->
    </v-flex>
    <v-flex xs12 text-xs-center class="mt-5 mb-5">
      <v-btn :color="theme.primary" dark large @click="createArticle">Enviar</v-btn>
    </v-flex>
    <v-snackbar
      color="green"
      v-model="successCreatedArticle"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Artigo criado com sucesso!
      <v-btn color="white" flat @click="successCreatedArticle = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="red"
      v-model="failedCreatedArticle"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Erro ao criar artigo, por favor tente novamente.
      <v-btn color="white" flat @click="failedCreatedArticle = false">Fechar</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import axios from "axios";
import baseUrl from "@/api/api";
import { mapActions } from "vuex";
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },
  data() {
    return {
      article: {
        name: { error: false, errorMessages: [], value: "" },
        description: { error: false, errorMessages: [], value: "" },
        imageUrl: { error: false, errorMessages: [], value: "" },
        content: { error: false, errorMessages: [], value: "" },
        category: { error: false, errorMessages: [], value: "" }
      },
      successCreatedArticle: false,
      failedCreatedArticle: false
    };
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    paths() {
      return this.$store.getters.getPaths;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    token() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    ...mapActions(["loadArticles"]),
    ...mapActions({ loadArticles: "loadArticles" }),
    createArticle() {
      if (this.validateAllFields()) {
        axios
          .post(`${baseUrl}articles`, this.mountBody(), {
            headers: {
              Authorization: "Bearer " + this.token,
              "Access-Control-Allow-Origin": "*"
            }
          })
          .then(res => {
            if (res.status == 200 && res.data) {
              this.successCreatedArticle = true;
              this.resetForm();
              this.loadArticles();
            } else {
              this.failedCreatedArticle = true;
            }
          })
          .catch(err => {
            this.failedCreatedArticle = true;
          });
      }
    },
    validateAllFields() {
      this.removeErrors(["name", "description", "category", "content"]);
      this.validateName();
      this.validateDescription();
      this.validateContent();
      this.validateCategory();
      return !this.hasErrors();
    },
    validateName() {
      if (this.article.name.value.length < 5) {
        this.addError("name", ["The name must have at least 2 characters"]);
      }
    },
    validateDescription() {
      if (this.article.description.value.length < 10) {
        this.addError("description", [
          "The description must have at least 10 characters"
        ]);
      }
    },
    validateContent() {
      if (this.article.content.value.length < 20) {
        this.addError("content", [
          "The content must have at least 20 characters"
        ]);
      }
    },
    validateCategory() {
      const category = this.categories.find(
        c => c.path == this.article.category.value
      );
      if (!category) {
        this.addError("category", ["The category must be selected"]);
      }
      return;
    },
    addError(field, messages) {
      this.article[field].error = true;
      this.article[field].errorMessages = messages;
    },
    removeErrors(fields) {
      fields.map(field => {
        this.article[field].error = false;
        this.article[field].errorMessages = [];
      });
    },
    hasErrors() {
      if (
        !this.article.name.error &&
        !this.article.description.error &&
        !this.article.imageUrl.error &&
        !this.article.category.error &&
        !this.article.content.error
      ) {
        return false;
      }
      return true;
    },
    resetForm() {
      this.article = {
        name: { error: false, errorMessages: [], value: "" },
        description: { error: false, errorMessages: [], value: "" },
        imageUrl: { error: false, errorMessages: [], value: "" },
        content: { error: false, errorMessages: [], value: "" },
        category: { error: false, errorMessages: [], value: "" }
      };
    },
    mountBody() {
      let body = {};

      const category = this.categories.find(
        c => c.path == this.article.category.value
      );

      if (this.article.imageUrl.value.length > 0) {
        body = {
          name: this.article.name.value,
          category: category._id,
          description: this.article.description.value,
          imageUrl: this.article.imageUrl.value,
          content: this.article.content.value,
          author: "5cd180cb057c214bcc3139aa"
        };
      } else {
        body = {
          name: this.article.name.value,
          category: category._id,
          description: this.article.description.value,
          content: this.article.content.value,
          author: "5cd180cb057c214bcc3139aa"
        };
      }

      return body;
    }
  }
};
</script>

<style>
</style>
