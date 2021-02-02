import VuexPersistence from 'vuex-persist';
import {
  ADD_TO_BASKET, REMOVE_FROM_BASKET,CHECKOUT_BASKET,
} from './actions';

// sessionStorage state and mutations
const sessMutations = [
  ADD_TO_BASKET, REMOVE_FROM_BASKET,CHECKOUT_BASKET,
];

export const config = {
  storage: window.sessionStorage,
  reducer: state => ({
    basket: state.basket,
  }),
  filter: mutation => sessMutations.includes(mutation.type),
};

export default new VuexPersistence(config).plugin;
