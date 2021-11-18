<template>
  <Header v-model="searchText" :passedSearchProps="searchText" />
  <SelectTable
    v-model="this.favorites.displayFavorites"
    @reset-page-to-one="resetPageToOne"
    :isFavorite="this.favorites.displayFavorites"
  />
  <Loading v-if="tableData.length < 1" />
  <Table
    v-if="computedTableData"
    :passedData="computedTableData"
    :config="configTable"
    :favoritesOn="this.favorites.displayFavorites"
    :toggleFavorites="toggleFavorites"
    @toggle-favorite="toggleFavorites"
  />
  <Pagination
    v-if="
      (!this.favorites.displayFavorites && computedTableData) ||
      favoriteCharacters.length > 0
    "
    :totalRecords="
      this.searchText.text.length > 0
        ? computedTableData.lengt
        : this.favorites.displayFavorites
        ? favoriteCharacters.length
        : tableData.length
    "
    :perPageOptions="perPageOptions"
    :passedPage="this.pagination.page"
    v-model="pagination"
    :key="this.pagination.key"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import SelectTable from "./components/SelectTable.vue";
import Table from "./components/Table.vue";
import Pagination from "./components/Pagination.vue";
import Loading from "./components/Loading.vue";

export type Character = {
  created: string;
  episode: string;
  name: string;
  gender: "unknown" | "Female" | "Male" | "Genderless";
  id: number;
  image: string;
  species: string;
  isFavorite: boolean;
};

const perPageOptions = [8, 15, 20];
const NUM_OF_LOADED_PAGES = 3;

export default defineComponent({
  name: "App",
  components: {
    Pagination,
    Header,
    SelectTable,
    Table,
    Loading,
  },
  data: () => ({
    failedToLoad: { failed: false, reason: "" },
    searchText: { text: "", sortBy: "name" },
    favorites: { displayFavorites: false },
    favoriteCharacters: [] as Character[] | never,
    perPageOptions,
    tableData: [] as Character[] | never,
    pagination: { page: 1, perPage: perPageOptions[0], key: 1 },
    configTable: [
      {
        key: "image",
        title: "Photo",
        type: "image",
      },
      {
        key: "id",
        title: "CharacterID",
        type: "text",
      },
      {
        key: "name",
        title: "Name",
        type: "text",
      },
      {
        key: "gender",
        title: "Gender",
        type: "text",
      },
      {
        key: "species",
        title: "Species",
        type: "text",
      },
      {
        key: "episode",
        title: "Last Episode",
        type: "episode-link",
      },
      {
        key: "isFavorite",
        title: "Add To Favorites",
        type: "favorite-type",
      },
    ],
  }),
  mounted(): Promise<Character[]> {
    const setFailedtoLoad = (res: any) => {
      this.failedToLoad.failed = true;
      this.failedToLoad.reason = res.json();
    };

    async function fetchMetaData() {
      let allData: Character[] = [];
      let morePagesAvailable = true;
      let currentPage = 0;

      while (morePagesAvailable) {
        currentPage++;
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${currentPage}`
        );
        let {
          results,
          info,
        }: { results: Character[]; info: { pages: number } } =
          await response.json();
        results.forEach(
          (el) =>
            fetch(el.episode[el.episode.length - 1])
              .then((res) => res.json())
              .then((res) => (el.episode = res.episode))
              .catch((res) => setFailedtoLoad(res)),

          results.forEach((e) => allData.push(e))
        );
        morePagesAvailable = currentPage < (NUM_OF_LOADED_PAGES || info.pages);
      }

      allData.forEach((el) => (el.isFavorite = false));
      return allData;
    }
    fetchMetaData().then((res) => {
      this.tableData = res;
    });
    return fetchMetaData().then((res) => res);
  },
  computed: {
    computedTableData() {
      if (this.tableData.length < 1) {
        return [];
      }
      let ArrayToCompute = this.favorites.displayFavorites
        ? this.favoriteCharacters
        : this.tableData;

      if (this.searchText.text.trim().length > 0) {
        ArrayToCompute = this.filtered(
          this.searchText.sortBy,
          this.searchText.text
        );
      }

      const firstIndex = (this.pagination.page - 1) * this.pagination.perPage;
      const lastIndex = this.pagination.page * this.pagination.perPage;

      return ArrayToCompute.slice(firstIndex, lastIndex);
    },
  },
  methods: {
    resetPageToOne() {
      this.pagination.page = 1;
      console.log(this.pagination.page);
      this.pagination.key = Math.random();
    },
    filtered(sorter: string, searchString: string): Character[] {
      const ArrayToFilter = this.favorites.displayFavorites
        ? this.favoriteCharacters
        : this.tableData;

      if (searchString.trim().length < 1) {
        return this.tableData;
      }

      let sortCriterium: keyof Character;
      switch (sorter) {
        case "Episode":
          sortCriterium = "episode";
          break;
        case "Identifier":
          sortCriterium = "id";
          break;
        default:
          sortCriterium = "name";
          break;
      }

      return ArrayToFilter.filter((el) =>
        el[sortCriterium]
          .toString()
          .toLowerCase()
          .includes(searchString.trim().toLowerCase())
      );
    },
    toggleFavorites(id: number) {
      this.tableData.forEach((el) => {
        if (el.id === id) {
          el.isFavorite = !el.isFavorite;
        }

        this.favoriteCharacters = this.tableData.filter(
          (el) => el.isFavorite === true
        );
        console.log(id, "toggleFavs");
      });
    },
  },
});
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0px;
  margin: 0px;
}
</style>
