import { jsonAxios } from "..";

export const REVIEWS = async ({ page, pageSize }) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/review?page=${page}&size=${pageSize}`, {
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

export const ADD_REVIEW = async (formReview) => {
    try {
        const response = await jsonAxios.post("/api.myservice.com/v1/admin/review/add", formReview)
        return response;
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}

export const REVIEW_CHANGE_STATUS = async (item) => {
    const user = JSON.parse(localStorage.getItem("userAccount")) || {};
    const accessToken = user.accessToken;
    try {
        const response = await jsonAxios.delete(`/api.myservice.com/v1/admin/review/${item}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}

export const REVIEW = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/review/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};