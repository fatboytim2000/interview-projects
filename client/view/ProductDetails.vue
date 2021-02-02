<template>
  <div class="product-details container-fluid mt-4">
    <router-link
      :to="{ path: '/' }"
      class="btn btn-secondary btn-sm float-md-right"
      >Continue shopping</router-link
    >
    <h1 class="h1">Product details</h1>

    <div class="detail">
      <strong>Title</strong>
      <span>{{ currentProduct.product }}</span>
    </div>

    <div class="detail">
      <strong>Price</strong>
      <span>{{ currentProduct.price }}</span>
    </div>

    <button v-if="currentProduct.id" @click="addToBasket" class="btn btn-success btn-sm">
      Add to basket
    </button>
  </div>
</template>

<script>
import accounting from 'accounting';
import { mapGetters } from 'vuex';
import { LOAD_PRODUCT, ADD_TO_BASKET } from './../store/actions';

export default {
  data() {
    return {
      product: {},
    };
  },
  async created() {
    this.$store.dispatch(LOAD_PRODUCT, this.$route.query.id);
  },
  computed: {
    ...mapGetters(['currentProduct','basketTotal', 'basketItemCount']),
  },
  methods: {
    addToBasket() {
      this.$store.commit(ADD_TO_BASKET, this.currentProduct);
      this.$bvToast.toast(
        `${this.basketItemCount} item(s) in your basket worth ${accounting.formatMoney(this.basketTotal, '£')}`, 
        {
          title: "Added item to your basket",
          variant: "success",
        }
      );
    },
  },
};
</script>