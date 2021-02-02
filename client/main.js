import Vue from 'vue'
import accounting from 'accounting';
import store from './store';
import App from './App.vue'
import router from './router';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.filter('currency', function (val) {
  return accounting.formatMoney(val, '£');
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
