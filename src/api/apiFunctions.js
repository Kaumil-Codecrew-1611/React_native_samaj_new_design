// src/api/apiFunctions.js
import axiosInstance from '../utils/axiosInstance';

export const registerUser = async (userData) => {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
};

export const payOrderData = async (orderData) => {
    const response = await axiosInstance.post('/order', orderData);

    return response.data;
};

export const viewDetails = async () => {
    const response = await axiosInstance.get('/details');
    return response.data;
};

export const addDetails = async (details) => {
    const response = await axiosInstance.post('/addDetails', details);
    return response.data;
};

export const changePassword = async (passwordData) => {
    const response = await axiosInstance.post('/changePassword', passwordData);
    return response.data;
};

export const getLocationData = async () => {

    const response = await axiosInstance.get('/location');

    return response.data;
};
export const getAmountData = async () => {

    const response = await axiosInstance.get('/listsettings?amount=1');

    return response.data;
};