<template>
  <div>
    <v-navigation-drawer
      :style="{'background-color': theme.primary}"
      :value="drawer"
      absolute
      dark
      temporary
    >
      <div class="menu">
        <v-text-field
          color="white"
          label="Procurar uma categoria"
          class="search-bar"
          v-model="treeFilter"
        />
        <Tree :data="treeData" :options="treeOptions" ref="tree" :filter="treeFilter"/>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Tree from "liquor-tree";
import axios from "axios";
import baseUrl from "@/api/api";
import store from "@/store/store";
import { mapActions } from "vuex";

export default {
  components: { Tree },
  data: () => ({
    treeData: [],
    treeOptions: {
      propertyNames: { text: "name", id: "_id" },
      filter: {
        emptyText: "Categoria não encontrada :("
      },
      store: {
        store,
        getter: () => {
          return store.getters.getTree;
        },
        dispatcher(tree) {
          store.dispatch("setTree", tree);
        }
      }
    },
    treeFilter: ""
  }),
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    drawer() {
      return this.$store.getters.getDrawer;
    }
  },
  methods: {
    onNodeSelect(node) {
      this.$router.push({
        name: "articlesByCategory",
        params: { id: node.id }
      });
    }
  },
  mounted() {
    this.$refs.tree.$on("node:selected", this.onNodeSelect);
  }
};
</script>

<style>
:root {
  --hover-color: rgba(255, 255, 255, 0.1);
}
.tree-anchor {
  color: #fff;
}
.tree-arrow.has-child:after {
  border-color: #fff;
}
.tree-node.selected > .tree-content {
  background-color: var(--hover-color) !important;
}
.tree-content:hover {
  background-color: var(--hover-color) !important;
}
.search-bar {
  margin: 15px;
}
.tree-filter-empty {
  color: white;
  font-size: 17px;
  text-align: center;
}
</style>
