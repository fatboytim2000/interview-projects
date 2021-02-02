<template>
  <div class="container-fluid mt-4">
    <b-row>
      <b-col sm="12">
        <router-link
          :to="{ path: '/' }"
          class="btn btn-secondary btn-sm float-md-right"
          >Continue shopping</router-link
        >
        <h1 class="h1">My Basket</h1>
      </b-col>
    </b-row>

    <b-row v-if="!checkoutComplete"> 
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isEmpty">
              <td colspan="5">You currently have no items in your basket</td>
            </tr>
            <tr v-for="item in basket" :key="item.id">
              <td>{{ item.product }}</td>
              <td>{{ item.unitPrice | currency }}</td>
              <td>{{ item.count }}</td>
              <td>{{ item.totalPrice | currency }}</td>
              <td class="text-right">
                <button
                  @click="removeFromBasket(item.id)"
                  class="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </td>
            </tr>
            <tr v-if="!isEmpty">
              <td>TOTAL:</td>
              <td></td>
              <td></td>
              <td>{{ basketTotal | currency }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row v-if="checkoutComplete">
      <b-col>
        <b-card>
        <h2>
          Thank you, your checkout was successful
        </h2>
        <p>You should shortly receive an
          email confirming your order.</p>
        </b-card>
      </b-col>
    </b-row>

    <b-row v-if="!isEmpty">
      <b-col>
        <button @click="checkOut" class="btn btn-success float-sm-right">
          Checkout
        </button>
      </b-col>
    </b-row>
  </div>
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
    ...mapGetters(['basket', 'basketTotal']),
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
      this.$store.dispatch(CHECKOUT_BASKET);
    },
  },
};
</script>