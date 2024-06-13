import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Lay danh sach category khong phan trang
export const getAllCategory = createAsyncThunk('products/getAllCategory', async () => {
    const response = await axios.get('http://localhost:8080/api.myservice.com/v1/categories/new-categories');
    console.log(response);
    return response.data.data;
});

// Lay danh sach brand khong phan trang
export const getAllBrand = createAsyncThunk('products/getAllBrand', async () => {
    const response = await axios.get('http://localhost:8080/api.myservice.com/v1/brands/new-brands');
    return response.data.data;
});

// Lay danh sach san pham khong phan trang
export const getAllProduct = createAsyncThunk('products/getAllProduct', async () => {
    const response = await axios.get('http://localhost:8080/api.myservice.com/v1/products/new-products');
    return response.data.data;
});

// Lay danh sach san pham co phan trang
export const getAllProducts = createAsyncThunk('products/getAllProducts', async ({ page = 0, limit = 10 }) => {
    const response = await axios.get(`http://localhost:8080/api.myservice.com/v1/admin/products?page=${page}&limit=${limit}`); 
    return response.data.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (formData) => {
    const response = await axios.post('http://localhost:8080/api.myservice.com/v1/admin/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (formData) => {
    const response = await axios.put(`http://localhost:8080/api.myservice.com/v1/admin/products/${formData.get('id')}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
});

export const toggleProductStatus = createAsyncThunk('products/toggleProductStatus', async (id) => {
    const response = await axios.patch(`http://localhost:8080/api.myservice.com/v1/admin/products/${id}`);
    return response.data.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: {
            content: [],
            totalElements: 0,
        },
        categories: [],
        brands: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.data.content.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.data.content.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.data.content[index] = action.payload;
                }
            })
            .addCase(toggleProductStatus.fulfilled, (state, action) => {
                const index = state.data.content.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.data.content[index].status = action.payload.status;
                }
            })
            .addCase(toggleProductStatus.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(getAllBrand.fulfilled, (state, action) => {
                state.brands = action.payload;
            });
    },
});

export default productSlice.reducer;