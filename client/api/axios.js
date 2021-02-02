// import Vue from 'vue';
import axios from 'axios';

import * as interceptor from './interceptor';

// how we want axios to be configured
const config = {
  baseURL: '/api',
  json: true,
  timeout: 30 * 1000, // Timeout
};

// create a new `axios`` instance
const axiosInst = axios.create(config);

// connect whatever type of interecptors are required
interceptor.defaultResponseInterceptor(axiosInst);

export default axiosInst;
