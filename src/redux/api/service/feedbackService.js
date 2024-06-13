import { jsonAxios } from "..";

export const FEEDBACKS = async({ page, pageSize }) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/feedback?page=${page}&size=${pageSize}`, {
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

export const ADD_FEEDBACK = async(formFeedback) => {
    try {
        const response = await jsonAxios.post("/api.myservice.com/v1/admin/feedback/add", formFeedback)
        return response;
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}
export const FEEDBACK_CHANGE_STATUS = async(item) => {
    const user = JSON.parse(localStorage.getItem("userAccount")) || {};
    const accessToken = user.accessToken;
    try {
        const response = await jsonAxios.delete(`/api.myservice.com/v1/admin/feedback/${item}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}