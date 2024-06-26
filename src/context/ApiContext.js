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
    numberCheckForRegister,
    otpCheckForForgotPassword,
    payOrderData,
    profileBannerImageUpdate,
    registerUser,
    relationshipDataList,
    sendMailSupport,
    sendOtpForForgotPassword,
    setNewForgotPassword,
    updateUserFamilyMembers,
    updateUserProfile,
    userPasswordChange,
    villagesByUser,
    allUserReview,
    termAndCondition,
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

    const allfaqListing = () => apiRequest(faqs, null, setData, 'allfaqListing');
    const getAmount = () => apiRequest(getAmountData, null, setData, 'amountData');
    const getLocation = () => apiRequest(getLocationData, null, setData, 'locationData');
    const newsListing = () => apiRequest(allNewsListing, null, setData, 'allNewsListing');
    const joinPageContent = () => apiRequest(joinPageData, null, setData, 'joinPageDetails');
    const homePageAllSlider = () => apiRequest(homePageSlider, null, setData, 'homesliderimage');
    const newsDataById = (newsId) => apiRequest(newsDetailsById, newsId, setData, 'newsDataById');
    const register = (userData) => apiRequest(registerUser, userData, setData, 'registerResponse');
    const aboutUsContentApi = () => apiRequest(aboutUsContent, null, setData, 'aboutusallcontent');
    const loginAPICall = (userData) => apiRequest(loginUser, userData, setData, 'loginDataResponse');
    const PayOrder = (orderData) => apiRequest(payOrderData, orderData, setData, 'orderDataResponse');
    const villagesListing = (search) => apiRequest(allVillageListing, search, setData, 'villagesListing');
    const contactUsPageDetails = () => apiRequest(contactUsDetails, null, setData, 'contactUsPageDetails');
    const allUserByVillageId = (villageId) => apiRequest(villagesByUser, villageId, setData, 'allUserByVillage');
    const allDataOfFamilyById = (parentId) => apiRequest(familyDataById, parentId, setData, 'allDataOfFamilyById');
    const supportMailSend = (emailPayload) => apiRequest(sendMailSupport, emailPayload, setData, 'supportMailSend');
    const updateUserProfileUser = (userId) => apiRequest(editUserProfile, userId, setData, 'updateUserProfileUser');
    const allRelationshipDataList = () => apiRequest(relationshipDataList, null, setData, 'allRelationshipDataList');
    const allcommitteeMembersListing = () => apiRequest(committeeMembers, null, setData, 'allcommitteeMembersListing');
    const updateUserProfileImage = (payload) => apiRequest(updateUserProfile, payload, setData, 'updateUserProfileImage');
    const editFamilyDetailsUser = (childId) => apiRequest(editUserFamilyMembers, childId, setData, 'editFamilyDetailsUser');
    const changeUserPassword = (passwordData) => apiRequest(changePassword, passwordData, setData, 'changePasswordResponse');
    const userChangePassword = (userPassword) => apiRequest(userPasswordChange, userPassword, setData, 'userChangePassword');
    const addFamilyMemberDetails = (familyData, mainParentId) => apiRequest(addFamilyMember, { familyData, mainParentId }, setData, 'addFamilyMemberDetails');
    const userDataByParentId = (userDataId) => apiRequest(familyDataByUserParentId, userDataId, setData, 'userDataByParentId');
    const updateFamilyDetailsUser = (updatedData) => apiRequest(updateUserFamilyMembers, updatedData, setData, 'updateFamilyDetailsUser');
    const updateUserPostProfile = (userUpdatedData) => apiRequest(editUserPostProfile, userUpdatedData, setData, 'updateUserPostProfile');
    const forgotPasswordApi = (newSetForgotPassword) => apiRequest(setNewForgotPassword, newSetForgotPassword, setData, 'forgotPasswordApi');
    const handleDeleteProfileUser = (userProfileId) => apiRequest(handleFamilyUserProfile, userProfileId, setData, 'handleDeleteProfileUser');
    const updateUserBannerProfileImage = (payload) => apiRequest(profileBannerImageUpdate, payload, setData, 'updateUserBannerProfileImage');
    const numberCheckForRegisterUser = (numberData) => apiRequest(numberCheckForRegister, numberData, setData, 'numberCheckForRegisterUser');
    const checkOtpForForgotPassword = (checkotpForForgotPassword) => apiRequest(otpCheckForForgotPassword, checkotpForForgotPassword, setData, 'checkOtpForForgotPassword');
    const sendOTPForgotPassword = (userEmailDataForForgotPassword) => apiRequest(sendOtpForForgotPassword, userEmailDataForForgotPassword, setData, 'sendOTPForgotPassword');
    const allUserDirectory = (search) => apiRequest(allUserReview, search, setData, 'allUserDirectory');
    const termsAndConditions = () => apiRequest(termAndCondition, null, setData, 'termsAndConditions');

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
            numberCheckForRegisterUser,
            sendOTPForgotPassword,
            checkOtpForForgotPassword,
            forgotPasswordApi,
            allUserDirectory,
            termsAndConditions,
        }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;
