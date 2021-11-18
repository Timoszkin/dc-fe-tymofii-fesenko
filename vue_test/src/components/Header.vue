<template>
  <header class="header">
    <img
      src="../images/logo.png"
      alt="rick and morty logo"
      width="240"
      height="70"
    />
    <div class="searchbox">
      <span class="searchbar__text searchbox__element"> Search By </span>
      <div class="custom-select">
        <select
          name="select-search"
          id="standard-select"
          class="select__box"
          v-on:change="onChange($event)"
        >
          <option value="Name" class="select__field">Name</option>

          <option value="Name" class="select__field">Identifier</option>
          <option value="Name" class="select__field">Episode</option>
        </select>
      </div>
      <input
        type="text"
        class="select__box searchbox__element searchbox__input"
        v-on:keyup="(event) => addSearchText(event)"
      />
      <span class="icon"></span>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["passedSearchProps"],
  data: function () {
    return { text: "", sortBy: "Name" };
  },
  methods: {
    addSearchText(event) {
      this.text = event.target.value;
      this.$emit("update:modelValue", { text: this.text, sortBy: this.sortBy });
    },
    onChange: function (e) {
      let name = e.target.options[e.target.options.selectedIndex].text;
      this.sortBy = name;
      console.log(this.sortBy);
      this.$emit("update:modelValue", { text: this.text, sortBy: this.sortBy });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

* {
  font-family: Poppins;
  color: #a9b1bd;
  font-size: 16px;
}

@media only screen and (max-width: 960px) {
  .header {
    display: flex;
    height: fit-content;
    flex-direction: column;
    padding: 40px 0;
  }

  .searchbox {
    margin-top: 20px;
  }
}

header {
  margin: 0px;
  padding-left: 140px;
  padding-top: 32px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
}

.searchbox {
  height: 56px;
  width: 505px;
  margin-left: 80px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-style: solid;
  border-color: #a9b1bd;
  border-width: 2px;
  border-radius: 10px;
}

.icon {
  filter: invert(77%) sepia(52%) saturate(7286%) hue-rotate(150deg)
    brightness(97%) contrast(87%);
  width: 24px;
  height: 24px;
  background-image: url("../images/search.svg");
  background-size: contain;
  background-repeat: no-repeat;
  margin: auto;
}

.searchbar__text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.select__box {
  border: none;
  background-color: transparent;
  margin: 15px;
}

.select__field {
  width: 100%;
  border: 1px solid #a9b1bd;
}

.searchbox__element {
  padding: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  height: 100%;
  border-right: 1px solid #a9b1bd;
}

.searchbox__input {
  margin: 0px;
  border-right: none;
  border-left: 1px solid #a9b1bd;
}
</style>

<style scoped>
</style>