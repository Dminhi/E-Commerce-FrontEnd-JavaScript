import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllProductDetails = createAsyncThunk(
    'productDetails/getAllProductDetails',
    async ({ page = page, limit = limit }) => {
        const response = await axios.get(`http://localhost:8080/api.myservice.com/v1/admin/productDetail?page=${page}&limit=${limit}`);
        console.log(response.data.data);
        return response.data.data;
    }
);

export const addProductDetail = createAsyncThunk(
    'productDetails/addProductDetail',
    async (formData) => {
        const response = await axios.post('http://localhost:8080/api.myservice.com/v1/admin/productDetail', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
);

export const updateProductDetail = createAsyncThunk(
    'productDetails/updateProductDetail',
    async (formData) => {
        const response = await axios.put(`http://localhost:8080/api.myservice.com/v1/admin/productDetail/${formData.get('id')}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
);

export const toggleProductDetailStatus = createAsyncThunk(
    'productDetails/toggleProductDetailStatus',
    async (id) => {
        const response = await axios.patch(`http://localhost:8080/api.myservice.com/v1/admin/productDetail/${id}`);
        return response.data.data;
    }
);

export const getAllColors = createAsyncThunk(
    'productDetails/getAllColors',
    async () => {
        const response = await axios.get('http://localhost:8080/api.myservice.com/v1/colors');
        return response.data.data;
    }
);

const productDetailSlice = createSlice({
    name: 'productDetails',
    initialState: {
        data: {
            content: [],
            totalElements: 0,
        },
        colors: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProductDetails.fulfilled, (state, action) => {
                state.data = action.payload;
                console.log('Fulfilled:', state);
                state.isLoading = false;
            })
            .addCase(getAllProductDetails.rejected, (state, action) => {
                console.log('Rejected:', state, action);
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addProductDetail.fulfilled, (state, action) => {
                state.data.content.push(action.payload);
            })
            .addCase(updateProductDetail.fulfilled, (state, action) => {
                const index = state.data.content.findIndex(detail => detail.id === action.payload.id);
                if (index !== -1) {
                    state.data.content[index] = action.payload;
                }
            })
            .addCase(toggleProductDetailStatus.fulfilled, (state, action) => {
                const index = state.data.content.findIndex(detail => detail.id === action.payload.id);
                if (index !== -1) {
                    state.data.content[index].status = action.payload.status;
                }
            })
            .addCase(getAllColors.fulfilled, (state, action) => {
                state.colors = action.payload;
            });
    },
});

export default productDetailSlice.reducer;
