import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const sendOrderRequest = createAsyncThunk(
    'cart/send',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.APP_API_URL}/order/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });


            if (!response.ok) { // проверяем на то есть ли ошибка (если есть заходим в тело)
                let errorMessage = "Wrong input. Try again.";  //  Дефолтная ошибка
                return rejectWithValue(errorMessage); // вызов ошибки createAsyncThunk
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Network or fetch error:", error);
            return rejectWithValue("Request failed. Please check your internet connection and try again.");
        }
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        addProductsToCart: (state, action) => {
            const productInCart = state.cart.find(item => item.id === action.payload.id);
            const quantityToAdd = action.payload.count || 1;
            if (productInCart) {
                productInCart.count += quantityToAdd;
            }
            else {
                state.cart.push({
                    ...action.payload,
                    count: quantityToAdd,

                    // Сохраняем discont_price только если он был передан
                    ...(action.payload.discont_price && {
                        discont_price: action.payload.discont_price
                    })
                })
            }
        },
        incrementCart: (state, action) => {
            const item = state.cart.find(p => p.id === action.payload)
            if (item) item.count += 1
        },
        decrementCart: (state, action) => {
            const item = state.cart.find(p => p.id === action.payload)
            if (item && item.count > 1) item.count -= 1
        },
        removeCart: (state, action) => {
            state.cart = state.cart.filter(p => p.id !== action.payload)
        },
        clearCart: (state) => {
            state.cart = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOrderRequest.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(sendOrderRequest.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(sendOrderRequest.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
})

export const { addProductsToCart, incrementCart, decrementCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


