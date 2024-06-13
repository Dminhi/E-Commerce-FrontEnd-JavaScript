import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkCategoryName = createAsyncThunk('categories/checkCategoryName', async (categoryName) => {
    const response = await axios.get(`http://localhost:8080/api.myservice.com/v1/admin/categories/categoryName?categoryName=${categoryName}`);
    return response.data.exists;
});

export const getAllCategory = createAsyncThunk('categories/getAllCategory', async ({ page, limit }) => {
    const response = await axios.get(`http://localhost:8080/api.myservice.com/v1/admin/categories?page=${page}&limit=${limit}`);
    return response.data.data;
});

export const getAllCategoryHome = createAsyncThunk('categories/getAllCategoryHome', async () => {
    const response = await axios.get(`http://localhost:8080/api.myservice.com/v1/categories`);
    return response.data.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (formData) => {
    const response = await axios.post('http://localhost:8080/api.myservice.com/v1/admin/categories', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.data; 
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (formData) => {
    const response = await axios.put(`http://localhost:8080/api.myservice.com/v1/admin/categories/${formData.get('id')}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.data;
});

export const toggleCategoryStatus = createAsyncThunk('categories/toggleCategoryStatus', async (id) => {
    const response = await axios.patch(`http://localhost:8080/api.myservice.com/v1/admin/categories/${id}`);
    return response.data.data;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        data: null,
        isLoading: false,
        nameCheck: { isLoading: false, exists: false },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllCategory.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.data.content.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.data.content.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.data.content[index] = action.payload;
                }
            })
            .addCase(toggleCategoryStatus.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(checkCategoryName.pending, (state) => {
                state.nameCheck.isLoading = true;
            })
            .addCase(checkCategoryName.fulfilled, (state, action) => {
                state.nameCheck.isLoading = false;
                state.nameCheck.exists = action.payload;
            })
            .addCase(checkCategoryName.rejected, (state) => {
                state.nameCheck.isLoading = false;
                state.nameCheck.exists = false;
            })
            .addCase(getAllCategoryHome.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategoryHome.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllCategoryHome.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default categorySlice.reducer;
