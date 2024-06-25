// src/context/apiHelper.js
export const apiRequest = async (apiFunction, params, callBack, contextKey) => {
    try {
        const data = await apiFunction(params);
        callBack(contextKey, data);
        return data;
    } catch (error) {
        console.log(error)
        // Error handled by interceptor
    }
};
