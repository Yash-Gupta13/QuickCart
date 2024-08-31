import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';
import authService from "./auth.service";

const initialState = {
    isLoading : false,
    isError:false,
    isSuccess : false,
    user : null,
    message : ""
}

export const userSignIn = createAsyncThunk(
    "auth/userSignIn",
    async(apiData , thunkApi)=>{
        try {
            return await authService.userSignIn(apiData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
)



const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{},
    extraReducers : (builder)=>{
        builder
        .addCase(userSignIn.pending, (state,action)=>{
            state.isLoading = true;
        })
        .addCase(userSignIn.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isSuccess = true,
            state.isError = false,
            state.user = action.payload.data,
            state.message = action.payload.message;
            toast.success(action.payload.message);
        })
    }
})


export default authSlice.reducer;