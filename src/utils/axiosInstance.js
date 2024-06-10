// src/utils/axiosInstance.js
import axios from 'axios';
import toastMessage from './toastMessage';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  // You can add common headers here if needed
  // headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
  headers: { "x-api-key": process.env.API_KEY }
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    if (
      response.data.message && response.data.showMessage && response.status === 200
    ) {
      toastMessage(response.data.message);
    }
    return response
  },
  error => {
    let message = 'An unknown error occurred';

    if (error.response && error.response.data && error.response.data.error) {
      message = error.response.data.error;
    } else if (error.message) {
      message = error.message;
    }
    toastMessage(message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
