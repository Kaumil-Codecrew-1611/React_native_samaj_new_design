// src/utils/axiosInstance.js
import axios from 'axios';
import errorHandler from './errorHandler';

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    // You can add common headers here if needed
    // headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
    headers: { "x-api-key": process.env.API_KEY }
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        errorHandler(error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
