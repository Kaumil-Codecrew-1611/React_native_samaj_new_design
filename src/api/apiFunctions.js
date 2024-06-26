import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

export const registerUser = async (userData) => {
    const response = await axiosInstance.post('/user_register', userData);
    return response.data;
};

export const payOrderData = async (orderData) => {
    const response = await axiosInstance.post('/order', orderData);
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

export const loginUser = async (userData) => {
    const response = await axiosInstance.post('/userlogin', userData);
    return response.data;
};

export const homePageSlider = async () => {
    const response = await axiosInstance.get(`/slider`);
    return response.data
};

export const aboutUsContent = async () => {
    const response = await axiosInstance.get(`/aboutus`);
    return response.data
};

export const allVillageListing = async (search) => {
    const response = await axiosInstance.get(`/location?searchValue=${search ? search : ''}`);
    return response.data
};

export const villagesByUser = async (villageId) => {
    const response = await axiosInstance.post('/villagebyuser', { searchValue: villageId });
    return response.data;
};

export const allNewsListing = async () => {
    const response = await axiosInstance.get('/news');
    return response.data
};

export const addFamilyMember = async ({ familyData, mainParentId }) => {
    const response = await axiosInstance.post(`/addfamily/${mainParentId}`, familyData);
    return response.data;
};

export const userPasswordChange = async (userPassword) => {
    const response = await axiosInstance.post('/password_change', userPassword);
    return response.data;
};

export const contactUsDetails = async () => {
    const response = await axiosInstance.get('/listsettings');
    return response.data
};

export const committeeMembers = async () => {
    const response = await axiosInstance.get('/committee_members');
    return response.data
};

export const relationshipDataList = async () => {
    const response = await axiosInstance.get('/relationship-data');
    return response.data
};

export const familyDataById = async (parentId) => {
    const response = await axiosInstance.get(`/familyData/${parentId}`);
    return response.data
};

export const familyDataByUserParentId = async (userDataId) => {
    const response = await axiosInstance.get(`/userList/${userDataId}`);
    return response.data
};

export const newsDetailsById = async (newsId) => {
    const response = await axiosInstance.get(`/news-edit/${newsId}`);
    return response.data
};

export const updateUserProfile = async (payload) => {
    try {
        const { userData, id } = payload;
        const axiosWithHeaders = axios.create({
            baseURL: axiosInstance.defaults.baseURL,
            headers: {
                'Content-Type': 'multipart/form-data',
                'ngrok-skip-browser-warning': 'true'
            },
        });
        const response = await axiosWithHeaders.post(`/profile_image/${id}`, userData);
        return response.data
    } catch (error) {
        console.log(error, "error")
    }
};

export const profileBannerImageUpdate = async (payload) => {
    try {
        const { userData, id } = payload;
        const axiosWithHeaders = axios.create({
            baseURL: axiosInstance.defaults.baseURL,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const response = await axiosWithHeaders.post(`/profile_banner/${id}`, userData);
        return response.data
    } catch (error) {
        console.log(error, "error")
    }
};

export const editUserProfile = async (userId) => {
    const response = await axiosInstance.get(`/user-edit/${userId}`);
    return response.data
};

export const editUserPostProfile = async (userUpdatedData) => {
    const response = await axiosInstance.post(`/user-update/${userUpdatedData.id}`, userUpdatedData.data);
    return response.data;
};

export const handleFamilyUserProfile = async (userProfileId) => {
    const response = await axiosInstance.post(`/user-delete/${userProfileId}`);
    return response.data;
};

export const faqs = async () => {
    const response = await axiosInstance.get('/faq');
    return response.data
};

export const editUserFamilyMembers = async (childId) => {
    const response = await axiosInstance.get(`/childuser-edit/${childId}`);
    return response.data
};

export const updateUserFamilyMembers = async (updatedData) => {
    const response = await axiosInstance.post(`/child_update/${updatedData.id}`, updatedData.data);
    return response.data
};

export const sendMailSupport = async (emailPayload) => {
    const response = await axiosInstance.post('/email_support', emailPayload);
    return response.data;
};

export const joinPageData = async () => {
    const response = await axiosInstance.get('/joinpage');
    return response.data
};

export const numberCheckForRegister = async (numberData) => {
    const response = await axiosInstance.post('/check_mobile', numberData);
    return response.data;
};

export const sendOtpForForgotPassword = async (userEmailDataForForgotPassword) => {
    const response = await axiosInstance.post('/send-otp', userEmailDataForForgotPassword);
    return response.data;
};

export const otpCheckForForgotPassword = async (checkotpForForgotPassword) => {
    const response = await axiosInstance.post('/check-otp', checkotpForForgotPassword);
    return response.data;
};

export const setNewForgotPassword = async (newSetForgotPassword) => {
    const response = await axiosInstance.post(`/forgetpassword/${newSetForgotPassword.userId}`, newSetForgotPassword);
    return response.data
};

export const allUserReview = async (search) => {
    const response = await axiosInstance.get(`/user-list?search=${search ? search : ''}`);
    return response.data
};

export const termAndCondition  = async () => {
    const response = await axiosInstance.get(`/termsandcondition`);
    return response.data
};