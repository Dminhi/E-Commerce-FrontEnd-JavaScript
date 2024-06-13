import { formDataAxios, jsonAxios } from "..";

export const BANNER = async ({ page, pageSize }) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/banner?page=${page}&size=${pageSize}`, {
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

export const ADD_BANNER = async (formBanner) => {
    try {
        const response = await formDataAxios.post("/api.myservice.com/v1/admin/banner/add", formBanner)
        console.log(response);
        return response;
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}

export const BANNER_CHANGE_STATUS = async (item) => {
    console.log(item);
    const user = JSON.parse(localStorage.getItem("userAccount")) || {};
    const accessToken = user.accessToken;
    try {
        const response = await jsonAxios.delete(`/api.myservice.com/v1/admin/banner/${item}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}

export const BANNER_FIND_BY_ID = async (item) => {
    const user = JSON.parse(localStorage.getItem("userAccount")) || {};
    const accessToken = user.accessToken;
    try {
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/banner/${item}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}

export const BANNER_EDIT = async (id, formBannerEdit) => {
    try {
        const response = await formDataAxios.put(`/api.myservice.com/v1/admin/banner/${id}`, formBannerEdit)
        return response
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}

export const BANNER_ACTIVE = async () => {
    try {
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/banner/true`)
        return response.data.data;
    } catch (error) {
        notify("error", error.response.data.error.details)
        return { banners: [] };
    }
};

export const SEARCH_BANNER = async ({ page, pageSize, search }) => {
    try {
        console.log(search);
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/banner/search?page=${page}&size=${pageSize}&search=${search}`)
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};