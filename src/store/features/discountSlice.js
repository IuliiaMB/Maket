import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendDiscountRequest = createAsyncThunk(
    'discount/send',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.APP_API_URL}/sale/send`, { 
                method: "POST",
                headers: { // указываем, что данные будут в формате JSON
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });


            if (!response.ok) { // проверяем на то есть ли ошибка (если есть заходим в тело)
                let errorMessage = "Wrong input. Try again.";  //  Дефолтная ошибка
                try {
                    const errorData = await response.json(); // получаем тело ответа от бека
                    
                    if (errorData.message) { // считываем текст ошибки от бека если тот есть 
                        errorMessage = errorData.message;
                    }
                } catch (jsonError) { // в процессе получки тело ответа от бека произошла ошибка
                    errorMessage = "An unexpected error occurred. Please try again.";
                }
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


const discountSlice = createSlice({
    name: "discount",
    initialState: {
        loading: false,
        success: false,
        error: null,
        message: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendDiscountRequest.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
                state.message = null;
            })
            .addCase(sendDiscountRequest.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.message = "The discount has been successfully sent by email.";
                state.error = null;
            })
            .addCase(sendDiscountRequest.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
                state.message = null;
            });
    },
});

export const { resetDiscountState } = discountSlice.actions;

export default discountSlice.reducer