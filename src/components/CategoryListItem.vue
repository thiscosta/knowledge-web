<template>
  <div>
    <v-dialog v-model="edition" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title :style="[{'color':theme.fontColor}]">{{ category.name }}</v-list-tile-title>
            <v-list-tile-sub-title :style="[{'color':theme.fontColor}]">{{ category.path }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-spacer/>
          <v-list-tile-action>
            <!-- <v-icon :color="theme.primary" v-on="on"  @click.prevent="editCategory()">edit</v-icon> -->
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
              <v-card-title class="headline">Excluir categoria</v-card-title>
              <v-card-text>Tem certeza que deseja excluir a categoria {{ category.name }}?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="theme.primary" flat @click="deletion = false">Cancelar</v-btn>
                <v-btn :color="theme.primary" flat @click="removeCategory()">Excluir</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-tile>
      </template>
      <v-card :style="[{'background-color' : theme.backgroundColor}, {'color':theme.fontColor}]">
        <v-card-title>
          <span class="headline">Editar: {{ category.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  :color="theme.primary"
                  label="Nome"
                  v-model="categoryEdition.name"
                  :error="nameError.length > 0"
                  :error-messages="nameError"
                  :dark="theme.name == 'dark'"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                Caminho:
                <v-select
                  :items="paths"
                  class="mt-3"
                  label="Selecione o caminho da categoria"
                  solo
                  prepend-inner-icon="folder_open"
                  v-model="categoryEdition.parentId"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="theme.primary" flat @click="edition = false">Cancelar</v-btn>
          <v-btn :color="theme.primary" flat @click="editCategory">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      color="green"
      v-model="successEditedCategory"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Categoria editada com sucesso!
      <v-btn color="white" flat @click="successEditedCategory = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="red"
      v-model="failedEditedCategory"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Erro ao editar categoria, por favor tente novamente.
      <v-btn color="white" flat @click="failedEditedCategory = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="green"
      v-model="successDeletedCategory"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Categoria excluída com sucesso!
      <v-btn color="white" flat @click="successDeletedCategory = false">Fechar</v-btn>
    </v-snackbar>
    <v-snackbar
      color="red"
      v-model="failedDeletedCategory"
      multi-line="multi-line"
      right
      :timeout="5000"
      top
    >
      Erro ao excluir categoria, por favor tente novamente.
      <v-btn color="white" flat @click="failedDeletedCategory = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import baseUrl from "@/api/api";
import { mapActions } from "vuex";

export default {
  props: ["category"],
  data() {
    return {
      edition: false,
      deletion: false,
      nameError: [],
      categoryEdition: {},
      successEditedCategory: false,
      failedEditedCategory: false,
      successDeletedCategory: false,
      failedDeletedCategory: false
    };
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    token() {
      return this.$store.getters.getToken;
    },
    paths() {
      return this.$store.getters.getPaths;
    }
  },
  methods: {
    ...mapActions(["loadTree", "loadCategories"]),
    ...mapActions({ loadTree: "loadTree", loadCategories: "loadCategories" }),
    editCategory() {
      if (this.validateAllFields()) {
        this.fillParentId();
        axios
          .put(
            `${baseUrl}categories/${this.category._id}`,
            this.categoryEdition,
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then(result => this.handleCategoryEdition(result));
      }
    },
    fillParentId() {
      this.categoryEdition.parentId = this.$store.getters.getCategories.find(
        category => category.path === this.categoryEdition.parentId
      )._id;
    },
    fillParentPath() {
      if (this.categoryEdition.parentId) {
        this.categoryEdition.parentId = this.$store.getters.getCategories.find(
          category => category._id === this.category.parentId
        ).path;
      }
    },
    async handleCategoryEdition(res) {
      if (res.status == 200 && res.data) {
        this.successEditedCategory = true;
        this.edition = false;
        this.categoryEdition = res.data;
        await this.loadCategories();
        this.loadTree();
        this.fillParentPath();
      } else {
        this.failedEditedCategory = true;
      }
    },
    validateAllFields() {
      this.removeErrors(["name"]);
      this.validateName();
      return !this.hasErrors();
    },
    validateName() {
      if (this.categoryEdition.name.length < 2) {
        this.addError("name", ["The name must have at least 2 characters"]);
        return false;
      }
      return true;
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
      if (this.nameError.length > 0) {
        return true;
      }
      return false;
    },
    removeCategory() {
      axios
        .delete(`${baseUrl}categories/${this.category._id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(result => this.handleCategoryDeletion(result));
    },
    handleCategoryDeletion(response) {
      if (response.status == 204) {
        this.successDeletedCategory = true;
        this.loadCategories();
        this.loadTree();
        this.deletion = false;
        this.edition = false;
      } else {
        this.failedDeletedCategory = true;
      }
    }
  },
  created() {
    this.categoryEdition = { ...this.category };
    this.fillParentPath();
  }
};
</script>

<style>
</style>
