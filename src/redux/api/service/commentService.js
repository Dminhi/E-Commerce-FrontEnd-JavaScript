import { jsonAxios } from "..";
import { notify } from "../../../utils/notification";

export const COMMENTS = async ({ page, pageSize, id }) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/user/comment/${id}?page=${page}&size=${pageSize}`, {
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

export const ADD_COMMENT = async (formComment) => {
    try {
        const response = await jsonAxios.post("/api.myservice.com/v1/user/comment/add", formComment)
        return response;
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}

export const COMMENT_CHANGE_STATUS = async (id) => {
    const user = JSON.parse(localStorage.getItem("userAccount")) || {};
    const accessToken = user.accessToken;
    try {
        const response = await jsonAxios.delete(`/api.myservice.com/v1/admin/comment/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}

export const LIST_COMMENTS = async ({ page, pageSize }) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/comment?page=${page}&size=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        notify("error", error.response.data.error.details)
        return { banners: [], currentPage: 1, pageSize: 5, totalElement: 0 };
    }
};