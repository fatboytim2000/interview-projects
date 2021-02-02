<template>
  <b-card>
    <h2>
      Thank you, your checkout was successful
    </h2>
    <h3>Your order id is: {{ orderId }}</h3>
    <p>
      You should shortly receive an email confirming your order.
    </p>
    <router-link
      :to="{ path: '/' }"
      class="btn btn-secondary btn-sm float-md-right">Continue shopping</router-link>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { CHECKOUT_BASKET, REMOVE_FROM_BASKET } from './../store/actions';

export default {
  data() {
    return {
      product: {},
      checkoutComplete: false,
    };
  },
  computed: {
    ...mapGetters(['basket', 'basketTotal', 'orderId']),
    isEmpty() {
      return (
        Object.keys(this.basket).length === 0 &&
        this.basket.constructor === Object
      );
    },
  },
  methods: {
    removeFromBasket(id) {
      this.$store.commit(REMOVE_FROM_BASKET, id);
    },
    checkOut() {
      this.$store.dispatch(CHECKOUT_BASKET).then(() => {
        this.checkoutComplete = true;
      });
    },
  },
};
</script>