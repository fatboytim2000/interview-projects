import Vue from 'vue';
import Vuex from 'vuex';
import vuexSession from './sessionStorage';
import { SEARCH_PRODUCTS, LOAD_PRODUCT, CHECKOUT_BASKET, REMOVE_FROM_BASKET, ADD_TO_BASKET, SHOW_ERROR, CLEAR_ERROR } from './actions';
import api from './../api/api';
import accounting from 'accounting';
import router from './../router';

Vue.use(Vuex);

const SEARCH_PAGE_SIZE = 25;

const state = {
    products: [],
    totalProductPages: 0,
    currentProductPage: 0,
    currentProduct: {},
    basket: [],
    orderId: null,
    error: null,
};

const getters = {
    products: state => state.products,
    totalProductPages: state => state.totalProductPages,
    currentProductPage: state => state.currentProductPage,
    currentProduct: state => state.currentProduct,
    searchPageSize: () => SEARCH_PAGE_SIZE,
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
    basketItemCount: state => state.basket ? state.basket.length : 0,
    basketTotal: state => state.basket.reduce((total, value) => (total || 0) + accounting.unformat(value.price), 0),
    orderId: state => state.orderId,
    error: state => state.error,
};

const actions = {
    [SEARCH_PRODUCTS] ({ commit }, { searchText, pageIndex }) {
        return new Promise((resolve) => {
            api.search(searchText, pageIndex, SEARCH_PAGE_SIZE).then(resp => {
                commit(SEARCH_PRODUCTS, resp);
                resolve();
            });
        });
    },
    [LOAD_PRODUCT] ({ commit }, productId) {
        return new Promise((resolve) => {
            api.get(productId).then(product => {
                commit(LOAD_PRODUCT, product);
                resolve();
            });
        });
    },
    [CHECKOUT_BASKET] ({ commit, state }) {
        return new Promise((resolve) => {
            api.checkout(state.basket).then(resp => {
                commit(CHECKOUT_BASKET, resp.orderId);
                router.push({ path: '/checkout' });
                resolve();
            });
        });
    },
    [SHOW_ERROR] ({ commit }, code) {
        return new Promise((resolve) => {
            commit(SHOW_ERROR, code);
            resolve();
        });
    },
    [CLEAR_ERROR] ({ commit }, code) {
        return new Promise((resolve) => {
            commit(CLEAR_ERROR, code);
            resolve();
        });
    },
};

const mutations = {
    [SEARCH_PRODUCTS] (state, data) {
        state.products = data.products;
        state.currentProductPage = data.currentPage;
        state.totalProductPages = data.totalPages;
    },
    [LOAD_PRODUCT] (state, product) {
        state.currentProduct = product;
    },
    [REMOVE_FROM_BASKET] (state, id) {
        // removes one "unit" of the particular product from the basket
        state.basket.splice(state.basket.findIndex(p => p.id === id), 1)
    },
    [ADD_TO_BASKET] (state, product) {
        state.basket.push({ ...product });
    },
    [CHECKOUT_BASKET] (state, orderId) {
        state.basket = [];
        state.orderId = orderId;
    },
    [SHOW_ERROR] (state, code) {
        let message = null;
        switch (code) {
            case 404: message = 'The requested item was not found';
                break;
            default:
                message = 'An unexpected problem was encountered, please try again later';
                break;
        }

        state.error = message;
    },
    [CLEAR_ERROR] (state) {
        state.error = null;
    },
};

const store = new Vuex.Store({
    plugins: [vuexSession],
    state,
    getters,
    actions,
    mutations,
});

export default store;
export { state, getters, actions, mutations, store };