import { formDataAxios, jsonAxios } from "..";

import { notify } from "../../../utils/notification";

export const USER = async (id) => {
    try {
        console.log(id);
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/account/${id}`)
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        notify("error", error.response.data.error.details)
    }

}

export const USER_LOCK = async (item) => {
    try {
        const response = await jsonAxios.put(`http://localhost:8080/api.myservice.com/v1/admin/account/${item.id}`)
        if (response.data.data.status) {
            notify("success", "Đã mở khoá thành công")
        } else {
            notify("success", "Đã khoá thành công")
        }
        return response
    } catch (error) {
        notify("error", error.response.data.error.details)
    }

}

export const USER_CHANGE_PASSWORD = async (values) => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.put(`/api.myservice.com/v1/user/account/change-password`, values, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        notify("success", response.data.message)
        return response
    } catch (error) {
        notify("error", error.response.data.error.details)
    }

}

export const USER_EDIT = async (formUserEdit) => {
    try {
        const formData = new FormData();
        formData.append("fullName", formUserEdit.fullName);
        formData.append("phone", formUserEdit.phone);
        if (formUserEdit.avatar != null) {
            formData.append("avatar", formUserEdit.avatar);
        }
        formData.append("email", formUserEdit.email);

        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await formDataAxios.put(`/api.myservice.com/v1/user/account`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const userAccountJSON = response.data.data;
        localStorage.setItem(
            "userAccount",
            JSON.stringify({ ...user, ...userAccountJSON })
        );
        return response;
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
};