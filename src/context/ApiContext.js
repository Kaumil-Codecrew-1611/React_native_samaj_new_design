// src/context/ApiContext.js
import React, { createContext, useReducer } from 'react';
import { registerUser, viewDetails, addDetails, changePassword, getLocationData, getAmountData, payOrderData, loginUser } from '../api/apiFunctions';
import { apiRequest } from './apiHelper';

const ApiContext = createContext();

const apiReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, [action.payload.key]: action.payload.data };
        case 'RESET_DATA':
            return { ...state, [action.payload.key]: null };
        default:
            return state;
    }
};

export const ApiProvider = ({ children }) => {
    const [state, dispatch] = useReducer(apiReducer, {});

    const setData = (key, data) => {
        dispatch({ type: 'SET_DATA', payload: { key, data } });
    };

    const resetData = (key) => {
        dispatch({ type: 'RESET_DATA', payload: { key } });
    };

    const register = (userData) => apiRequest(registerUser, userData, setData, 'registerResponse');
    const viewUserDetails = () => apiRequest(viewDetails, null, setData, 'detailsResponse');
    const addNewDetails = (details) => apiRequest(addDetails, details, setData, 'addDetailsResponse');
    const changeUserPassword = (passwordData) => apiRequest(changePassword, passwordData, setData, 'changePasswordResponse');
    const getLocation = () => apiRequest(getLocationData, null, setData, 'locationData');
    const getAmount = () => apiRequest(getAmountData, null, setData, 'amountData');
    const PayOrder = (orderData) => apiRequest(payOrderData, orderData, setData, 'orderDataResponse');
    const loginAPICall = (userData) => apiRequest(loginUser, userData, setData, 'loginDataResponse');
    // loginUser
    return (
        <ApiContext.Provider value={{ state, register, viewUserDetails, addNewDetails, changeUserPassword, resetData, getLocation, getAmount, PayOrder, loginAPICall }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;
