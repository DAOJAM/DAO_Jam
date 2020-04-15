/* eslint-disable */
"use strict";

import axios from "axios";
import { Loading, Message } from 'element-ui';
import utils from './utils'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// baseURL: process.env.baseURL || process.env.apiUrl || ""
// timeout: 60 * 1000, // Timeout
// withCredentials: true, // Check cross-site Access-Control

const _axios = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30000,
  headers: {},
});

// let loadingInstance = null;
_axios.interceptors.request.use(
  (config) => {
    // console.log('user request interceptors', config, config.noLoading)
    // if (!config.noLoading) {
      // loadingInstance = Loading.service({
      //   background: 'rgba(0, 0, 0, 0.1)'
      // });
    // }
    if (utils.getCookie('ACCESS_TOKEN')) config.headers['x-access-token'] = utils.getCookie('ACCESS_TOKEN');
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
    (response) => {
      // if(loadingInstance) loadingInstance.close();
      if(response.status === 429) {
        Message.closeAll()
        Message({
          message: 'Post frequently, please try again later',
          type: 'error'
        })
      }
      return response.data;
    },
    (error) => {
      // loadingInstance.close()
      console.log(error.message)

      if (error.message.includes('status code 401')) {
        Message.closeAll()
        Message({
          message: 'The login status is abnormal, please log in again',
          type: 'error'
        })
        if (process.browser && window && window.$nuxt) window.$nuxt.$store.commit('setLoginModal', true)
      }

      // 超时处理
      if (error.message.includes('timeout')) {
        Message.closeAll()
        Message({
          message: 'Request timed out',
          type: 'error'
        })
      }
      if (error.message.includes('Network Error')) {
        console.log('Network Error')
      }
      // loadingInstance.close()
      return Promise.reject(error);
    }
);

export default _axios;
