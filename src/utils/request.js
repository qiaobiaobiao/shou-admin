import axios from 'axios'
import router from '@/router'

var http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
});

// 请求拦截
http.interceptors.request.use(function (config) {
  if(config.url!=='/login'){
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截
http.interceptors.response.use(function (response) {
  // console.log(response)
  if(response.data.meta.status === 401) {
    router.replace('/')
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default http
