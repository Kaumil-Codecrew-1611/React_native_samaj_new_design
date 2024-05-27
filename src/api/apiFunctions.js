// src/api/apiFunctions.js
import axiosInstance from '../utils/axiosInstance';

export const registerUser = async (userData) => {
    const response = await axiosInstance.post('/user_register', userData);
    return response.data;
};

export const payOrderData = async (orderData) => {
    // console.log(orderData,'')
    const response = await axiosInstance.post('/order', orderData);
    console.log(response.data, " hey response")
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
    // console.log(response)
    return response.data;
};
export const getAmountData = async () => {

    const response = await axiosInstance.get('/listsettings?amount=1');

    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axiosInstance.post('/userlogin', userData);
    return response.data;
};