import Vue from 'vue';
import ProductList from './view/ProductList.vue';
import ProductDetails from './view/ProductDetails.vue';
import Basket from './view/Basket.vue';
import Checkout from './view/Checkout.vue';
import VueRouter from 'vue-router'
import store from './store';
import {CLEAR_ERROR} from './store/actions';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    { path: '/', component: ProductList },
    { path: '/details', component: ProductDetails },
    { path: '/basket', component: Basket },
    { path: '/checkout', component: Checkout },
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch(CLEAR_ERROR);
  next();
})

export default router;