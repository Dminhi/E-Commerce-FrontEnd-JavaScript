import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllColors = createAsyncThunk('colors/getAllColors', async ({ page, limit }) => {
    const response = await axios.get(`http://localhost:8080/api.myservice.com/v1/admin/colors?page=${page}&limit=${limit}`);
    return response.data.data;
});

export const addColor = createAsyncThunk('colors/addColor', async (formData) => {
    const response = await axios.post('http://localhost:8080/api.myservice.com/v1/admin/colors', formData);
    return response.data;
});

export const updateColor = createAsyncThunk('colors/updateColor', async (formData) => {
    const response = await axios.put(`http://localhost:8080/api.myservice.com/v1/admin/colors/${formData.id}`, formData);
    return response.data;
});

export const toggleColorStatus = createAsyncThunk('colors/toggleColorStatus', async (id) => {
    const response = await axios.patch(`http://localhost:8080/api.myservice.com/v1/admin/colors/${id}`);
    return response.data.data;
});

const colorSlice = createSlice({
    name: 'colors',
    initialState: {
        data: { content: [] },
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllColors.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllColors.rejected, (state) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addColor.fulfilled, (state, action) => {
                state.data.content.push(action.payload);
            })
            .addCase(updateColor.fulfilled, (state, action) => {
                const index = state.data.content.findIndex(color => color.id === action.payload.id);
                if (index !== -1) {
                    state.data.content[index] = action.payload;
                }
            })
            .addCase(toggleColorStatus.fulfilled, (state, action) => {
                const index = state.data.content.findIndex(color => color.id === action.payload.id);
                if (index !== -1) {
                    state.data.content[index].status = action.payload.status;
                }
            })
            .addCase(toggleColorStatus.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default colorSlice.reducer;
