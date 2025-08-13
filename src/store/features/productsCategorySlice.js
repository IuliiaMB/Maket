import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    error: null,
    category : {}
}

export const fetchProductsCategory = createAsyncThunk(
    'productsCategory/fetchProductsCategory',
        async (categoryId) => {
        try {
            const response = await fetch(`${import.meta.env.APP_API_URL}/categories/${categoryId}`);
             
            if (!response.ok) {
                throw new Error("Products not Found !!!");
            }

            const data = await response.json();

            return data;
        } catch (e) {
            return e;
        }
    }
)

const productsCategorySlise = createSlice({
    name: 'productsCategory',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchProductsCategory.pending, state => {
            state.loading = true;
        }) 
        .addCase(fetchProductsCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data;
            state.category = action.payload.category;
        }) 
        .addCase(fetchProductsCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
    }
})
export default productsCategorySlise.reducer;