import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonAxios } from "../../api";

export const ADD_USER = createAsyncThunk("auth/ADD_USER", async (formRegister) => {
    const response = await jsonAxios.post("/api.myservice.com/v1/admin/account/add", formRegister);
    return response.data;
})

export const USER_LIST = createAsyncThunk("USER_LIST", async ({ page, size }) => {
    try {
        const response = await jsonAxios.get(`/api.myservice.com/v1/admin/account?page=${page}&size=${size}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }

})