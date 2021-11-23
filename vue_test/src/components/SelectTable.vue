<template>
  <div class="select__table__wrapper">
    <button
      type="button"
      class="select__table__button"
      v-bind:class="{ active: !isFavorite }"
      v-on:click="selectAllCharacters()"
    >
      All Characters
    </button>
    <button
      type="button"
      class="select__table__button"
      v-bind:class="{ active: isFavorite }"
      v-on:click="selectFavorites()"
    >
      Favorites
    </button>
  </div>
</template>

<script>
export default {
  name: "SelectTable",
  props: ["isFavorite"],
  methods: {
    selectAllCharacters() {
      this.$emit("update:modelValue", false);
      this.$emit("reset-page-to-one", 1);
    },
    selectFavorites() {
      this.$emit("update:modelValue", true);
      this.$emit("reset-page-to-one", 1);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap");

* {
  font-family: Poppins;
  font-size: 16px;
  font-weight: 300;
  color: #a9b1bd;
}

.select__table__wrapper {
  padding-left: 140px;
  padding-top: 32px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  height: 78px;
  border-top: #a9b1bd 1px solid;
}

.select__table__button {
  border: none;
  background-color: transparent;
}

.active {
  color: #11b0c8;
  position: relative;
  font-weight: 500;
}

.active::after {
  position: absolute;
  content: "";
  height: 3px;
  background-color: #11b0c8;
  width: 100%;
  top: 100%;
  right: 0%;
}

@media only screen and (max-width: 960px) {
  .select__table__wrapper {
      padding-left: 20px;
  }
}

@media only screen and (min-width: 2000px) {
  .select__table__wrapper {
    max-width: 1400px;
    margin: auto;
  }
}


</style>