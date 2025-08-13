import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    likedProducts: [],
    loading: false,
    error: null
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const response = await fetch(`${import.meta.env.APP_API_URL}/products/all`);

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

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getLikedProducts(state, action) {
            const productId = action.payload;
            if (state.likedProducts.includes(productId)) {
                state.likedProducts = state.likedProducts.filter(id => id !== productId)
            } else { 
                state.likedProducts.push(productId) 
             }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    }
})

export const { getLikedProducts } = productsSlice.actions;
export default productsSlice.reducer;
