<template>
  <section v-if="pages">
    <div class="pagination-container">
      <i
        class="fal fa-chevron-left"
        @click="changePage(-1)"
        v-bind:class="{ 'fal stop': page === 1 }"
      />
      <span v-if="page > 2" class="fal" @click="changePage(0)">
        {{ 1 }}
      </span>
      <span v-if="page > 3" class="fal"> ... </span>
      <span v-if="page > 1" class="fal" @click="changePage(-1)">
        {{ page - 1 }}
      </span>
      <span class="fal active" @click="changePage(page)">
        {{ page }}
      </span>
      <span v-if="pages > page" class="fal" @click="changePage(+1)">
        {{ page + 1 }}
      </span>
      <span
        v-if="page < pages - 1 && pages > page"
        class="fal"
        @click="changePage(+2)"
      >
        {{ page + 2 }}
      </span>
      <span
        v-if="page < pages - 2 && pages > page"
        class="fal"
        @click="changePage(+3)"
      >
        {{ page + 3 }}
      </span>
      <span v-if="page < pages - 4" class="fal"> ... </span>
      <span v-if="page < pages - 3" class="fal" @click="changePage(pages)">
        {{ pages }}
      </span>
      <i
        v-bind:class="{ 'fal stop': pages === page }"
        class="fal fa-chevron-right"
        @click="changePage(1)"
      />
    </div>
    <div class="pagination-container">
      <p style="color: #a9b1bd">Dispaly:</p>
      <span
        class="showing fal"
        :class="perPage === amount && 'active'"
        v-for="(amount, index) in perPageOptions"
        :key="index"
        @click="setPerPage(amount)"
      >
        {{ amount }}
      </span>
    </div>
  </section>
  <h2 v-if="!page">No characters found!</h2>
</template>

<script>
export default {
  props: ["totalRecords", "perPageOptions", "passedPage"],
  data: function () {
    return {
      page: 1 || this.props.passedPages,
      perPage: this.perPageOptions[0],
    };
  },
  computed: {
    pages() {
      const remainder = this.totalRecords % this.perPage;
      if (remainder > 0) {
        return Math.floor(this.totalRecords / this.perPage) + 1;
      } else {
        return this.totalRecords / this.perPage;
      }
    },
  },
  methods: {
    setPerPage(amount) {
      this.perPage = amount;
      this.$emit("update:modelValue", { page: this.page, perPage: amount });
    },
    changePage(val) {
      switch (val) {
        case 0:
          this.page = 1;
          break;
        case -1:
          this.page = this.page > 1 ? this.page - 1 : this.page;
          break;
        case 1:
          this.page = this.page < this.pages ? this.page + 1 : this.page;
          break;
        case 2:
          this.page = this.page + 1 < this.pages ? this.page + 2 : this.page;
          break;
        case 3:
          this.page = this.page + 2 < this.pages ? this.page + 3 : this.page;
          break;
        case this.pages:
          this.page = this.pages;
          break;
      }
      this.$emit("update:modelValue", {
        page: this.page,
        perPage: this.perPage,
      });
    },
  },
};
</script>
<style scoped>


section {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  padding-bottom: 100px;
}

.fal {
  width: 40px;
  height: 40px;
  filter: invert(77%) sepia(52%) saturate(7286%) hue-rotate(150deg)
    brightness(97%) contrast(87%);
  display: flex;
  margin: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  border: solid black 3px;
  background-position: center;
  border-radius: 5px;
}

.fal.active {
  filter: none;
  color: white;
  background-color: #11b0c8;
  border-color: #11b0c8;
}

.fal.stop {
  filter: none;
  filter: invert();
  background-color: #ee4f37;
  border-color: #ee4f37;
}

.fa-chevron-right {
  background-image: url("../assets/arrow_right.svg");
}
.fa-chevron-left {
  background-image: url("../assets/arrow_left.svg");
}

.showing {
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
}

@media only screen and (max-width: 960px) {
  section {
    display: flex;
    flex-direction: column;
  }
  .pagination-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0, auto;
    padding: 10px;
  }
}

@media only screen and (min-width: 961px) {
  section {
    display: flex;
    flex-direction: row;
  }

  .pagination-container {
    margin-left: 100px;
    padding: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 20px;
    font-family: Poppins;
    font-weight: 300;
    color: black;
  }
}


@media only screen and (min-width: 2000px) {
  section {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}

</style>