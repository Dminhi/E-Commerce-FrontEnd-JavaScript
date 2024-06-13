import { jsonAxios } from "..";

export const ORDERS_BY_STATUS = async({ page, pageSize, status }) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/user/history/order?page=${page}&size=${pageSize}&orderStatus=${status}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        notify("error", error.response.data.error.details)
        return { content: [], currentPage: 1, pageSize: 10, totalElement: 0 };
    }
};
export const ORDERS = async({ page, pageSize }) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/user/history?page=${page}&size=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        notify("error", error.response.data.error.details)
        return { content: [], currentPage: 1, pageSize: 10, totalElement: 0 };
    }
};

export const ADMIN_ORDERS = async({ page, pageSize }) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/orders?page=${page}&size=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        notify("error", error.response.data.error.details)
        return { banners: [], currentPage: 1, pageSize: 10, totalElement: 0 };
    }
};

export const ORDERS_CHANGE_STATUS = async({ orderId, status }) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.put(`/api.myservice.com/v1/admin/orders/status?orderId=${orderId}&orderStatus=${status}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        notify("error", error.response.data.error.details)
        return { banners: [], currentPage: 1, pageSize: 10, totalElement: 0 };
    }
};