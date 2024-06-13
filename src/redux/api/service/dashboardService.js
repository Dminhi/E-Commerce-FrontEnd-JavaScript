import { jsonAxios } from "..";

export const DASHBOARD_REVENUE = async() => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/dashboard/revenue`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
};

export const DASHBOARD_PRODUCTDETAIL = async() => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/dashboard/productdetailOrder`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
};

export const DASHBOARD_ORDERS = async() => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/dashboard/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
};