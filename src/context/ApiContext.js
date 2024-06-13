import React, { createContext, useReducer } from 'react';
import {
    aboutUsContent,
    addFamilyMember,
    allNewsListing,
    allVillageListing,
    changePassword,
    committeeMembers,
    contactUsDetails,
    editUserFamilyMembers,
    editUserPostProfile,
    editUserProfile,
    familyDataById,
    familyDataByUserParentId,
    faqs,
    getAmountData,
    getLocationData,
    handleFamilyUserProfile,
    homePageSlider,
    joinPageData,
    loginUser,
    newsDetailsById,
    payOrderData,
    profileBannerImageUpdate,
    registerUser,
    relationshipDataList,
    sendMailSupport,
    updateUserFamilyMembers,
    updateUserProfile,
    userPasswordChange,
    villagesByUser,
} from '../api/apiFunctions';
import { apiRequest } from './apiHelper';

const ApiContext = createContext();

const apiReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, [action.payload.key]: action.payload.data };
        case 'RESET_DATA':
            return { ...state, [action.payload.key]: null };
        case 'RESET_ALL_DATA':
            const resetState = Object.keys(state).reduce((acc, key) => {
                acc[key] = null;
                return acc;
            }, {});
            return resetState;
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
    const resetAllData = () => {
        dispatch({ type: 'RESET_ALL_DATA' });
    };

    const register = (userData) => apiRequest(registerUser, userData, setData, 'registerResponse');
    const changeUserPassword = (passwordData) => apiRequest(changePassword, passwordData, setData, 'changePasswordResponse');
    const getLocation = () => apiRequest(getLocationData, null, setData, 'locationData');
    const getAmount = () => apiRequest(getAmountData, null, setData, 'amountData');
    const PayOrder = (orderData) => apiRequest(payOrderData, orderData, setData, 'orderDataResponse');
    const loginAPICall = (userData) => apiRequest(loginUser, userData, setData, 'loginDataResponse');
    const homePageAllSlider = () => apiRequest(homePageSlider, null, setData, 'homesliderimage');
    const aboutUsContentApi = () => apiRequest(aboutUsContent, null, setData, 'aboutusallcontent');
    const villagesListing = (search) => apiRequest(allVillageListing, search, setData, 'villagesListing');
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
    const updateUserBannerProfileImage = (payload) => apiRequest(profileBannerImageUpdate, payload, setData, 'updateUserBannerProfileImage');
    const supportMailSend = (emailPayload) => apiRequest(sendMailSupport, emailPayload, setData, 'supportMailSend');
    const joinPageContent = () => apiRequest(joinPageData, null, setData, 'joinPageDetails');

    return (
        <ApiContext.Provider value={{
            state,
            register,
            changeUserPassword,
            resetData,
            resetAllData,
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
            updateUserBannerProfileImage,
            supportMailSend,
            joinPageContent,
        }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;
