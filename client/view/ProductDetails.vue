<template>
  <div class="basket container-fluid mt-4">
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

    <button @click="addToBasket" class="btn btn-success btn-sm">
      Add to basket
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      product: {},
    };
  },
  async created() {
    this.$store.dispatch("getProduct", this.$route.query.id);
  },
  computed: {
    ...mapGetters(["currentProduct", "basketTotal"]),
  },
  methods: {
    addToBasket() {
      this.$store.commit("addToBasket", this.currentProduct);
      this.$bvToast.toast(
        "Total value of items in your basket: " + this.basketTotal,
        {
          title: "Added item to your basket",
          variant: "success",
        }
      );
      // router.push("/basket");
    },
  },
};
</script>