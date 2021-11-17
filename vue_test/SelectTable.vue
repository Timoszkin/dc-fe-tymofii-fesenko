/* eslint-disable */

<template>
  <div class="select__table__wrapper">
    <button
      type="button"
      class="select__table__button"
      v-bind:class="{'active': !isFavorite}"
      v-on:click="selectAllCharacters()"
    >
      All Characters
    </button>
    <button
      type="button"
      class="select__table__button"
      v-bind:class="{'active': isFavorite}"
      v-on:click="selectFavorites()"
    >
      Favorites
    </button>
  </div>
</template>

<script>
export default {
  name: "SelectTable",
  props: ['isFavorite'],
  methods: {
    selectAllCharacters() {
      console.log('all')
      this.$emit("update:modelValue", false);
    },
    selectFavorites() {
      console.log('favs');
      this.$emit("update:modelValue", true);
    }
  },
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap');

* {
  font-family: Poppins;
  font-size: 16px;
  font-weight: 300;
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
  border-top: #A9B1BD 1px solid
}

.select__table__button {
  border: none;
  background-color: transparent;
}

.active {
  color: #11B0C8;
  position:relative;
  font-weight: 500;
}

.active::after{
  position: absolute;
  content: "";
  height: 3px;
  background-color: #11B0C8;
  width: 100%;
  top: 100%;
  right: 0%
}

</style>