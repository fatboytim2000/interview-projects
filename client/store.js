import Vue from 'vue';
import Vuex from 'vuex';
import productApi from './productsApi';
import accounting from 'accounting';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        products: [],
        totalProductPages: 0,
        currentProductPage: 0,
        currentProduct: {},
        basket: [],
    },
    getters: {
        products: state => state.products,
        totalProductPages: state => state.totalProductPages,
        currentProductPage: state => state.currentProductPage,
        currentProduct: state => state.currentProduct,
        basket: state => state.basket.reduce((total, value) => {
            const quantity = ((total[value.id] && total[value.id].count) || 0) + 1;
            total[value.id] = {
                id: value.id,
                count: quantity,
                product: value.product,
                unitPrice: accounting.unformat(value.price),
                totalPrice: accounting.unformat(value.price) * quantity
            };
            return total;
        }, {}),
        basketTotal: state => state.basket.reduce((total, value) => (total || 0) + accounting.unformat(value.price), 0),
    },
    actions: {
        getProducts({ commit }, { searchText, pageIndex }) {
            return new Promise((resolve) => {
                productApi.search(searchText, pageIndex).then(resp => {
                    commit('updateProductList', resp);
                    resolve();
                });
            });
        },
        getProduct({ commit }, productId) {
            return new Promise((resolve) => {
                productApi.get(productId).then(product => {
                    commit('setCurrentProduct', product);
                    resolve();
                });
            });
        },
        // addToBasket({ commit }, product) {
        //     return new Promise((resolve) => {
        //         commit('setCurrentProduct', product);
        //         resolve();
        //     });
        // },
        checkOut({ commit, state }) {
            return new Promise((resolve) => {
                productApi.checkout(state.basket).then(() => {
                    commit('checkOut');
                    resolve();
                });
            });
        },
    },
    mutations: {
        updateProductList(state, data) {
            state.products = data.products;
            state.currentProductPage = data.currentPage;
            state.totalProductPages = data.totalPages;
        },
        setCurrentProduct(state, product) {
            state.currentProduct = product;
        },
        removeFromBasket(state, id) {
            // removes one "unit" of the particular product from the basket
            state.basket.splice(state.basket.findIndex(p => p.id === id), 1)
        },
        addToBasket(state, product) {
            state.basket.push({ ...product });
        },
        checkOut(state) {
            state.basket = [];
        },
    }
});

export default store;