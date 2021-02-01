import Vue from 'vue'
import accounting from "accounting";
import store from './store';
import App from './App.vue'
import ProductList from './view/ProductList.vue';
import ProductDetails from './view/ProductDetails.vue';
import Basket from './view/Basket.vue';
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.filter('currency', function (val) {
  return accounting.formatMoney(val, '£');
});


Vue.config.productionTip = false

export const router = new VueRouter({
  routes: [
    { path: '/', component: ProductList },
    { path: '/details', component: ProductDetails },
    { path: '/basket', component: Basket },
  ]
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
