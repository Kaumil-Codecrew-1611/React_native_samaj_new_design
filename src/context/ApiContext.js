// src/context/ApiContext.js
import React, { createContext, useReducer } from 'react';
import {
    registerUser, viewDetails,
    addDetails,
    changePassword,
    getLocationData,
    getAmountData,
    payOrderData,
    loginUser,
    homePageSlider,
    aboutUsContent,
    allVillageListing,
    villagesByUser,
    allNewsListing,
    addFamilyMember,
    userPasswordChange,
    contactUsDetails,
    committeeMembers,
    relationshipDataList,
    familyDataById,
    familyDataByUserParentId,
    newsDetailsById,
    updateUserProfile,
    editUserProfile,
    editUserPostProfile,
    handleFamilyUserProfile,
    faqs,
    editUserFamilyMembers,
    updateUserFamilyMembers,
} from '../api/apiFunctions';
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
    const homePageAllSlider = () => apiRequest(homePageSlider, null, setData, 'homesliderimage');
    const aboutUsContentApi = () => apiRequest(aboutUsContent, null, setData, 'aboutusallcontent');
    const villagesListing = (search) => apiRequest(allVillageListing, search, setData, 'villagesListing'); //village listing
    const allUserByVillageId = (villageId) => apiRequest(villagesByUser, villageId, setData, 'allUserByVillage');
    const newsListing = () => apiRequest(allNewsListing, null, setData, 'allNewsListing');
    const addFamilyMemberDetails = (familyData) => apiRequest(addFamilyMember, familyData, setData, 'addFamilyMemberDetails');
    const userChangePassword = (userPassword) => apiRequest(userPasswordChange, userPassword, setData, 'userChangePassword');
    const contactUsPageDetails = () => apiRequest(contactUsDetails, null, setData, 'contactUsPageDetails');
    const allcommitteeMembersListing = () => apiRequest(committeeMembers, null, setData, 'allcommitteeMembersListing');
    const allRelationshipDataList = () => apiRequest(relationshipDataList, null, setData, 'allRelationshipDataList');
    const allDataOfFamilyById = (parentId) => apiRequest(familyDataById, parentId, setData, 'allDataOfFamilyById');
    const userDataByParentId = (userDataId) => apiRequest(familyDataByUserParentId, userDataId, setData, 'userDataByParentId');
    const newsDataById = (newsId) => apiRequest(newsDetailsById, newsId, setData, 'newsDataById');
    const updateUserProfileImage = (payload) => apiRequest(updateUserProfile, payload, setData, 'updateUserProfileImage');
    const updateUserProfileUser = (userId) => apiRequest(editUserProfile, userId, setData, 'updateUserProfileUser');
    const updateUserPostProfile = (userUpdatedData) => apiRequest(editUserPostProfile, userUpdatedData, setData, 'updateUserPostProfile');
    const handleDeleteProfileUser = (userProfileId) => apiRequest(handleFamilyUserProfile, userProfileId, setData, 'handleDeleteProfileUser');
    const allfaqListing = () => apiRequest(faqs, null, setData, 'allfaqListing');

    const editFamilyDetailsUser = (childId) => apiRequest(editUserFamilyMembers, childId, setData, 'editFamilyDetailsUser');
    const updateFamilyDetailsUser = (updatedData) => apiRequest(updateUserFamilyMembers, updatedData, setData, 'updateFamilyDetailsUser');

    return (
        <ApiContext.Provider value={{
            state,
            register,
            viewUserDetails,
            addNewDetails,
            changeUserPassword,
            resetData,
            getLocation,
            getAmount,
            PayOrder,
            loginAPICall,
            homePageAllSlider,
            aboutUsContentApi,
            villagesListing,
            allUserByVillageId,
            newsListing,
            addFamilyMemberDetails,
            userChangePassword,
            contactUsPageDetails,
            allcommitteeMembersListing,
            allRelationshipDataList,
            allDataOfFamilyById,
            userDataByParentId,
            newsDataById,
            updateUserProfileImage,
            updateUserProfileUser,
            updateUserPostProfile,
            handleDeleteProfileUser,
            allfaqListing,
            editFamilyDetailsUser,
            updateFamilyDetailsUser,
        }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;
