<template>
  <div class="product-list container-fluid mt-4">
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

    <b-pagination class="float-sm-right"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="searchPageSize"
      @change="handlePageChange"
    ></b-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { SEARCH_PRODUCTS } from './../store/actions';

export default {
  data() {
    return {
      searchText: "",
      currentPage: 1,
    };
  },
  async created() {
    this.search();
  },
  computed: {
    ...mapGetters(["products", "totalProductPages", "currentProductPage", "searchPageSize"]),
    totalRows() {
      return this.totalProductPages * this.searchPageSize;
    },
    isNextPage() {
      return this.currentProductPage < this.totalProductPages;
    },
    isPreviousPage() {
      return this.currentProductPage > 0;
    },
  },
  methods: {
    handlePageChange(value) {
      this.$store.dispatch(SEARCH_PRODUCTS, {
        searchText: this.searchText,
        pageIndex: value - 1,
      });
    },
    async search(reset) {
      this.$store.dispatch(SEARCH_PRODUCTS, {
        searchText: this.searchText,
        pageIndex: reset ? 0 : this.currentProductPage,
      });
    },
  },
};
</script>