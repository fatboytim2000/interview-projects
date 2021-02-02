import store from './../store';
import { SHOW_ERROR } from './../store/actions';

export function defaultResponseInterceptor (axios) {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // send any errors to our Error action
      store.dispatch(SHOW_ERROR, error.response.status);
      return Promise.reject(error);
    },
  );
}
