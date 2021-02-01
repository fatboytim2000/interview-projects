<template>
  <div class="container-fluid mt-4">
    <b-row>
      <b-col sm="12" md="8">
        <h1 class="h1">Products</h1>
      </b-col>
      <b-col sm="12" md="4">
        <b-input
          id="search-input-name"
          type="text"
          placeholder="enter keywords to search"
          @keyup.enter.native="search(true)"
          v-model="searchText"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in products" :key="record.id">
              <td>{{ record.product }}</td>
              <td>{{ record.price }}</td>
              <td class="text-right">
                <router-link
                  :to="{ path: '/details', query: { id: record.id } }"
                  class="btn btn-success btn-sm"
                  >View details</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div v-if="isNextPage">
          <button @click="nextPage" class="button-success button-sm">
            Next &gt;
          </button>
        </div>
        <div v-if="isPreviousPage">
          <button @click="previousPage" class="button-success button-sm">
            &lt; Previous
          </button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchText: "",
    };
  },
  async created() {
    this.search();
  },
  computed: {
    ...mapGetters(["products", "totalProductPages", "currentProductPage"]),
    isNextPage() {
      return this.currentProductPage < this.totalProductPages;
    },
    isPreviousPage() {
      return this.currentProductPage > 0;
    },
  },
  methods: {
    nextPage() {
      this.$store.dispatch("getProducts", {
        searchText: this.searchText,
        pageIndex: this.currentProductPage + 1,
      });
    },
    previousPage() {
      this.$store.dispatch("getProducts", {
        searchText: this.searchText,
        pageIndex: this.currentProductPage - 1,
      });
    },
    async search(reset) {
      this.$store.dispatch("getProducts", {
        searchText: this.searchText,
        pageIndex: reset ? 0 : this.currentProductPage,
      });
    },
  },
};
</script>