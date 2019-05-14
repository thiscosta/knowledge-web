<template>
  <div>
    <v-dialog
      v-model="edition"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      max-width="600px"
    >
      <template v-slot:activator="{ on }">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title :style="[{'color':theme.fontColor}]">{{ article.name }}</v-list-tile-title>
            <v-list-tile-sub-title
              :style="[{'color':theme.fontColor}]"
            >{{ formatDate(article.createdAt) }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-spacer/>
          <v-list-tile-action>
            <v-icon :color="theme.primary" v-on="on">edit</v-icon>
          </v-list-tile-action>

          <v-dialog v-model="deletion" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-list-tile-action>
                <v-icon :color="'red'" v-on="on" @click.prevent>delete</v-icon>
              </v-list-tile-action>
            </template>
            <v-card
              :style="[{ 'background-color':theme.backgroundColor}, {'color':theme.fontColor}]"
            >
              <v-card-title class="headline">Excluir artigo</v-card-title>
              <v-card-text>Tem certeza que deseja excluir o artigo {{ article.name }}?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="theme.primary" flat @click="deletion = false">Cancelar</v-btn>
                <v-btn :color="theme.primary" flat @click="removeArticle()">Excluir</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-tile>
      </template>
      <v-card :style="[{'background-color' : theme.backgroundColor}, {'color':theme.fontColor}]">
        <v-card-title>
          <span class="headline">Editar: {{ article.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                Nome:
                <v-text-field
                  class="mt-3"
                  label="Digite o nome do artigo"
                  prepend-inner-icon="edit"
                  v-model="articleEdition.name"
                  :error="nameError.length > 0"
                  :error-messages="nameError"
                  :dark="theme.name == 'dark'"
                />
              </v-flex>
              <v-flex xs12>
                Descrição:
                <v-text-field
                  class="mt-3"
                  label="Digite a descrição da categoria"
                  prepend-inner-icon="short_text"
                  v-model="articleEdition.description"
                  :error="descriptionError.length > 0"
                  :error-messages="descriptionError"
                  :dark="theme.name == 'dark'"
                />
              </v-flex>
              <v-flex xs12>
                Imagem:
                <v-text-field
                  class="mt-3"
                  label="Digite a url da imagem"
                  prepend-inner-icon="image"
                  v-model="articleEdition.imageUrl"
                  :dark="theme.name == 'dark'"
                />
              </v-flex>
              <v-flex xs12>
                Categoria:
                <v-select
                  :items="paths"
                  class="mt-3"
                  label="Selecione uma categoria"
                  prepend-inner-icon="folder_open"
                  v-model="articleEdition.category"
                  :error="categoryError.length > 0"
                  :error-messages="categoryError"
                  :dark="theme.name == 'dark'"
                />
              </v-flex>
              <v-flex xs12>
                Conteúdo:
                <VueEditor v-model="articleEdition.content"/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="theme.primary" flat @click="edition = false">Cancelar</v-btn>
          <v-btn :color="theme.primary" flat @click="editArticle">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      color="green"
      v-model="successEditedArticle"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Artigo editado com sucesso!
      <v-btn color="white" flat @click="successEditedArticle = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="red"
      v-model="failedEditedArticle"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Erro ao editar artigo, por favor tente novamente.
      <v-btn color="white" flat @click="failedEditedArticle = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="green"
      v-model="successDeletedArticle"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Artigo excluído com sucesso!
      <v-btn color="white" flat @click="successDeletedArticle = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="red"
      v-model="failedDeletedArticle"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Erro ao excluir artigo, por favor tente novamente.
      <v-btn color="white" flat @click="failedDeletedArticle = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import baseUrl from "@/api/api";
import { mapActions } from "vuex";
import moment from "moment";
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },
  props: ["article"],
  data() {
    return {
      edition: false,
      deletion: false,
      nameError: [],
      descriptionError: [],
      contentError: [],
      categoryError: [],
      articleEdition: {},
      successEditedArticle: false,
      failedEditedArticle: false,
      successDeletedArticle: false,
      failedDeletedArticle: false
    };
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    token() {
      return this.$store.getters.getToken;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    paths() {
      return this.$store.getters.getPaths;
    }
  },
  methods: {
    ...mapActions(["loadArticles"]),
    ...mapActions({ loadArticles: "loadArticles" }),
    editArticle() {
      console.log("oi editArticle");
      if (this.validateAllFields()) {
        this.fillParentId();
        axios
          .put(`${baseUrl}articles/${this.article._id}`, this.articleEdition, {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          })
          .then(result => this.handleArticleEdition(result));
      }
    },
    async handleArticleEdition(res) {
      if (res.status == 200 && res.data) {
        this.successEditedArticle = true;
        this.edition = false;
        this.articleEdition = res.data;
        this.loadArticles();
        this.fillParentPath();
      } else {
        this.failedEditedArticle = true;
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
      if (this.articleEdition.name.length < 5) {
        this.addError("name", ["The name must have at least 2 characters"]);
      }
    },
    validateDescription() {
      if (this.articleEdition.description.length < 10) {
        this.addError("description", [
          "The description must have at least 10 characters"
        ]);
      }
    },
    validateContent() {
      if (this.articleEdition.content.length < 20) {
        this.addError("content", [
          "The content must have at least 20 characters"
        ]);
      }
    },
    validateCategory() {
      const category = this.categories.find(
        c => c.path == this.articleEdition.category
      );
      if (!category) {
        this.addError("category", ["The category must be selected"]);
      }
      return;
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
      console.log("name errors: ", this.nameError);
      console.log("description errors: ", this.descriptionError);
      console.log("category errors: ", this.categoryError);
      console.log("content errors: ", this.contentError);
      if (
        !this.articleEdition.name.error &&
        !this.articleEdition.description.error &&
        !this.articleEdition.category.error &&
        !this.articleEdition.content.error
      ) {
        return false;
      }
      return true;
    },
    removeArticle() {
      axios
        .delete(`${baseUrl}articles/${this.article._id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(result => this.handleArticleDeletion(result));
    },
    handleArticleDeletion(response) {
      if (response.status == 204) {
        this.successDeletedArticle = true;
        this.deletion = false;
        this.edition = false;
        this.loadArticles();
      } else {
        this.failedDeletedArticle = true;
      }
    },
    formatDate(date) {
      return moment(date).format("HH:mm DD/MM/YYYY");
    },
    fillParentId() {
      this.articleEdition.category = this.categories.find(
        category => category.path === this.articleEdition.category
      )._id;
    },
    fillParentPath() {
      if (this.articleEdition.category) {
        this.articleEdition.category = this.categories.find(
          category => category._id === this.articleEdition.category
        ).path;
      }
    }
  },
  created() {
    this.articleEdition = { ...this.article };
    this.fillParentPath();
  }
};
</script>

<style>
</style>
