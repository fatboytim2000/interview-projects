import { shallowMount } from '@vue/test-utils';
import View from '../ProductList.vue';
import { SEARCH_PRODUCTS } from './../../store/actions';

const mockDispatch = jest.fn();

// Start testing
describe('views/productlist', () => {
  let test;

  beforeEach(() => {
    test = shallowMount(View, {
      mocks: {
        $store: {
          getters: {
            currentProductPage: 0,
            totalProductPages: 2,
            searchPageSize: 35,
            products: []
          },
          dispatch: mockDispatch,
        },
      },
    });
    mockDispatch.mockClear();
  });

  it('renders the page container', () => {
    expect(test.find('.product-list').exists()).toBe(true);
  });

  it('returns the total row count', () => {
    expect(test.vm.totalRows).toEqual(70);
  });

  it('returns true that there is a next page', () => {
    expect(test.vm.isNextPage).toEqual(true);
  });

  it('returns false that there is not a previous page', () => {
    expect(test.vm.isPreviousPage).toEqual(false);
  });

  it('handle page change triggers an action to be dispatched', () => {
    test.vm.$store.dispatch = mockDispatch;
    test.vm.handlePageChange(2);
    expect(mockDispatch).toHaveBeenCalledWith(SEARCH_PRODUCTS, {
      searchText: '',
      pageIndex: 1
    });
  });
});
