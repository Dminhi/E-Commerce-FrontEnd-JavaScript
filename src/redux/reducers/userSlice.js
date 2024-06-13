import { ADD_USER, USER_LIST } from "./thunk/userThunk";

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        currentPage: 0,
        totalElement: 0,
        size: 5,
        data: [],
        error: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ADD_USER.fulfilled, (state, action) => {
                console.log(action.payload)
            })
            .addCase(USER_LIST.pending, (state) => {
                state.isLoading = true
            })
            .addCase(USER_LIST.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload.content
                state.currentPage = action.payload.currentPage;
                state.size = action.payload.pageSize;
                state.totalElement = action.payload.totalElement;
            })
            .addCase(USER_LIST.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export default userSlice.reducer;