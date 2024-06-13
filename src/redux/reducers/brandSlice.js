import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllBrand = createAsyncThunk('brands/getAllBrand', async ({ page, limit }) => {
    const response = await axios.get(`http://localhost:8080/api.myservice.com/v1/admin/brands?page=${page}&limit=${limit}`);
    return response.data.data;
});

export const addBrand = createAsyncThunk('brands/addBrand', async (formData) => {
    const response = await axios.post('http://localhost:8080/api.myservice.com/v1/admin/brands', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
});

export const updateBrand = createAsyncThunk('brands/updateBrand', async (formData) => {
    const response = await axios.put(`http://localhost:8080/api.myservice.com/v1/admin/brands/${formData.get('id')}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
});

export const toggleBrandStatus = createAsyncThunk('brands/toggleBrandStatus', async (id) => {
    const response = await axios.patch(`http://localhost:8080/api.myservice.com/v1/admin/brands/${id}`);
    return response.data.data;
});

const brandSlice = createSlice({
    name: 'brands',
    initialState: {
        data: { content: [] },
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBrand.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllBrand.rejected, (state,action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addBrand.fulfilled, (state, action) => {
                state.data.content.push(action.payload);
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                const index = state.data.content.findIndex(brand => brand.id === action.payload.id);
                if (index !== -1) {
                    state.data.content[index] = action.payload;
                }
            })
            .addCase(toggleBrandStatus.fulfilled, (state, action) => {
                const index = state.data.content.findIndex(brand => brand.id === action.payload.id);
                if (index !== -1) {
                    state.data.content[index].status = action.payload.status;
                }
            })
            .addCase(toggleBrandStatus.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default brandSlice.reducer;
