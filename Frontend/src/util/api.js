import axios from 'axios';
import { backend_url } from './variables';

const api = axios.create({
  baseURL: backend_url, // Replace this with your desired base URL
  headers: {
    'Content-Type': 'application/json',
  }
});


// api.interceptors.request.use((config) => {
//   console.log('Request Headers:', config.headers);
//   return config;
// }, (error) => {
//   console.error('Request Error:', error);
//   return Promise.reject(error);
// });


export default api;