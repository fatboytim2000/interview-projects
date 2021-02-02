import { state, getters, actions, mutations } from '../index';
import api from '../../api/api';
import { SEARCH_PRODUCTS, CHECKOUT_BASKET, REMOVE_FROM_BASKET } from '../actions';


// What we'd expect the initial state to be
const initialState = {
  products: [],
  totalProductPages: 0,
  currentProductPage: 0,
  currentProduct: {},
  basket: [],
  orderId: null,
  error: null,
};


// TESTS
describe('store', () => {
  let vuex;

  beforeEach(() => {
    vuex = {
      commit: jest.fn(),
      dispatch: jest.fn(() => Promise.resolve({})),
      state: initialState,
    };
  });

  // testing State and Getters
  // ====================================================
  describe('store/getters', () => {

    it('defines the default state as expected', () => {
      expect(state).toEqual(initialState);
    });

    it('obtains the correct value via the `products` getter', () => {
      expect(getters.products(state)).toEqual([]);
    });

    it('obtains the correct value via the `totalProductPages` getter', () => {
      expect(getters.totalProductPages(state)).toEqual(0);
    });

    it('obtains the correct value via the `currentProductPage` getter', () => {
      expect(getters.currentProductPage(state)).toEqual(0);
    });

    it('obtains the correct value via the `currentProduct` getter', () => {
      expect(getters.currentProduct(state)).toEqual({});
    });

    it('obtains the correct value via the `basket` getter', () => {
      expect(getters.basket(state)).toEqual({});
    });
    
    it('obtains the correct value via the `orderId` getter', () => {
      expect(getters.orderId(state)).toEqual(null);
    });
    
    it('obtains the correct value via the `error` getter', () => {
      expect(getters.error(state)).toEqual(null);
    });

  });

   // testing Actions
  // ====================================================
  describe('store/actions', () => {
    it('SEARCH_PRODUCTS handles successful request', async () => {
      const products = [{
        product: 'product 1',
        id: '1',
        price: '£1.01'
      }, {
        product: 'product 2',
        id: '2',
        price: '£1.02'
      }];

      api.search = jest.fn(() => Promise.resolve({ products, currentPage: 0, totalPages: 1 }));
      await actions[SEARCH_PRODUCTS](vuex, { searchText: 'sauce', pageIndex: 0 });
      expect(api.search).toHaveBeenCalledWith('sauce', 0, 25);
      expect(vuex.commit.mock.calls[0][0]).toEqual(SEARCH_PRODUCTS);
    });

    it('CHECKOUT_BASKET handles successful request', async () => {
      
      api.checkout = jest.fn(() => Promise.resolve({ orderId: '987' }));
      await actions[CHECKOUT_BASKET](vuex);
      expect(vuex.commit).toHaveBeenCalledWith(CHECKOUT_BASKET, '987');
    });
  });

  // testing Mutations
  // ====================================================
  describe('store/mutations', () => {
    it('SEARCH_PRODUCTS updates the state', () => {
      const products = [{
        product: 'product 1',
        id: '1',
        price: '£1.01'
      }, {
        product: 'product 2',
        id: '2',
        price: '£1.02'
      }];
      let testState = { ...state };
      mutations[SEARCH_PRODUCTS](testState, { products, currentPage: 3, totalPages: 15 });

      expect(testState.products).toEqual(products);
      expect(testState.currentProductPage).toEqual(3);
      expect(testState.totalProductPages).toEqual(15);
    });


    it('REMOVE_FROM_BASKET updates the state', () => {
      let basket = [{
        product: 'product 1',
        id: '1',
        price: '£1.01'
      }, {
        product: 'product 2',
        id: '2',
        price: '£1.02'
      }, {
        product: 'product 3',
        id: '3',
        price: '£1.03'
      }];
      let testState = { ...state, basket };
      mutations[REMOVE_FROM_BASKET](testState, '2');
      expect(testState.basket.length).toEqual(2);
    });
  });
});