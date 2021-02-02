import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import View from '../ProductDetails.vue';
import { ADD_TO_BASKET } from './../../store/actions';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const mockDispatch = jest.fn();
const mockCommit = jest.fn();

const currentProduct = {
  id: '12345',
  product: 'Can of beans',
  price: '£1.99'
};

// stub everything thats included here
const stubs = [
  'router-link'
];

// Start testing
describe('views/productdetails', () => {
  let test;

  beforeEach(() => {
    test = shallowMount(View, {
      localVue,
      router,
      mocks: {
        $store: {
          getters: {
            currentProduct: currentProduct,
            basketItemCount: 0,
            basketTotal: 0,
          },
          dispatch: mockDispatch,
        },
        stubs,
      },
    });
    mockDispatch.mockClear();
    mockCommit.mockClear();
  });

  it('renders the page container', () => {
    expect(test.find('.product-details').exists()).toBe(true);
  });

  it('adds the product to the basket', () => {
    //test.vm.$store.dispatch = mockDispatch;
    test.vm.$store.commit = mockCommit;
    test.vm.addToBasket();
    expect(mockCommit).toHaveBeenCalledWith(ADD_TO_BASKET, currentProduct);
  });
});
