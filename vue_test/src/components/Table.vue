<template>
  <h2 v-if="passedData.length < 1 && favoritesOn && !searchText">
    No Characters have been selected as favorites.
  </h2>
  <h2 v-if="passedData.length < 1 && searchText">
    No Characters have been found.
  </h2>
  <table v-if="passedData.length > 0">
    <thead class="table__head">
      <tr>
        <th></th>
        <th v-for="(obj, ind) in config" :key="ind" class="table__head--cell">
          {{ obj.title }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in passedData" :key="index">
        <td></td>
        <td v-for="(obj, ind) in config" :key="ind" class="table__cell">
          <span v-if="obj.type === 'text' && obj.key !== 'gender'">{{
            row[obj.key]
          }}</span>
          <span v-if="obj.type === 'text' && obj.key === 'gender'">
            <span
              v-bind:class="{
                'icon--gender male': row[obj.key] === 'Male',
                'icon--gender female': row[obj.key] === 'Female',
                'icon--gender genderless': row[obj.key] === 'Genderless',
                'icon--gender unknown': row[obj.key] === 'unknown',
              }"
            >
            </span>
            {{ row[obj.key] }}
          </span>
          <div v-if="obj.type === 'image'" class="image__container">
            <img
              :src="row[obj.key]"
              alt="character picture"
              class="character__image"
            />
          </div>
          <span v-if="obj.type === 'episode-link'">{{ row[obj.key] }}</span>
          <button
            v-if="obj.type === 'favorite-type'"
            v-bind:class="{
              'button__favorite button': !row.isFavorite,
              'button__unFavorite button': row.isFavorite,
            }"
            v-on:click="this.$emit('toggle-favorite', row.id)"
          ></button>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: ["passedData", "config", "favoritesOn", "toggleFavorites", "searchText"],
  emits: ["toggle-favorite"],
};
</script>

<style scoped>
* {
  font-family: Poppins;
  color: #a9b1bd;
  text-align: left;
  box-sizing: border-box;
}

table {
  width: 100%;
  border-spacing: 20;
  table-layout: fixed;
  border-collapse: collapse;
}

.table__head {
  margin: 20px;
  width: 100%;
  height: 54px;
  background-color: rgba(229, 234, 244, 0.25);
  font-weight: 500;
}

.table__head--cell {
  max-width: 250px;
}

.table__cell {
  font-weight: 300;
  margin: 0px;
  max-width: 250px;
}

tr:not(:first-child) {
  height: 76px;
  justify-content: center;
  border-style: dashed;
  border: 1px solid #e5eaf4;
}

h2 {
  margin-left: 140px;
}

.character__image {
  margin: 0px;
  height: 68px;
  width: 43px;
  object-fit: cover;
}

.button__favorite {
  background-image: url("../assets/star.png");
}

.button {
  filter: invert(77%) sepia(52%) saturate(7286%) hue-rotate(150deg)
    brightness(97%) contrast(87%);
  background-color: transparent;
  width: 43px;
  height: 43px;
  background-position: center;
  background-repeat: no-repeat;
  border: 3px solid black;
  border-radius: 5px;
}

.button__unFavorite {
  filter: none;
  filter: invert();
  background-image: url("../assets/star.png");
  background-color: #ee4f37;
  border-color: #ee4f37;
}

.image__container {
  height: 74px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.icon--gender {
  filter: invert(77%) sepia(15%) saturate(207%) hue-rotate(177deg)
    brightness(91%) contrast(86%);
  width: 24px;
  height: 24px;
  display: inline-block;
  position: relative;
  top: 4px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.icon--gender.male {
  background-image: url("../assets/male.svg");
}

.icon--gender.female {
  background-image: url("../assets/female.svg");
}

.icon--gender.unknown {
  top: 16px;
  background-image: url("../assets/unknown.svg");
}

.icon--gender.genderless {
  background-image: url("../assets/genderless.svg");
}


@media only screen and (min-width: 961px) {
  th:first-child,
  td:first-child {
    width: 140px;
  }
}

@media only screen and (max-width: 960px) {
  th:first-child,
  td:first-child {
    width: 20px;
  }

  .table__head--cell,
  .table__cell {
    max-width: 150px;
  }
}

@media only screen and (min-width: 1600px) {
  th:last-child,
  td:last-child {
    padding-right: 440px;
  }
}

@media only screen and (max-width: 1600px)  {
  td:last-child, th:last-child  {
    display: none;
  }
}

@media only screen and (min-width: 2000px) {
  table {
    max-width: 1400px;
    margin: auto;
  }

  h2 {
    text-align: center;
   }

  td:last-child, th:last-child  {
    display: none;
  }
}

</style>
