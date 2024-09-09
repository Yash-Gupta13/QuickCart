import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  userService  from "./user.service";
import { toast } from "react-toastify";
import authService from "../auth/auth.service";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  user: null,
  users:null,
  message: "",
};

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (apiData, thunkApi) => {
    try {
     return await userService.updateUserInfo(apiData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const changeOldPassword = createAsyncThunk(
    "user/changePassword",
    async (apiData , thunkApi)=>{
        try {
            return await userService.changePassword(apiData);
        } catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "user/getAllUser",
    async(_ , thunkApi)=>{
        try {
            return await userService.getAllUsers();
        } catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
)

export const updateUserInfoById = createAsyncThunk(
  "user/updateUserById",
  async(apiData,thunkApi)=>{
    try {
     return await userService.updateUserInfoById(apiData);
    } catch (error) {
       const message =
         (error.response &&
           error.response.data &&
           error.response.data.message) ||
         error.message ||
         error.toString();
       return thunkApi.rejectWithValue(message);
    }
  }
)

export const deleteUserById = createAsyncThunk(
  "user/deleteUserById",
  async(apiData,thunkApi)=>{
    try {
      return await userService.deleteUserById(apiData);
    } catch (error) {
       const message =
         (error.response &&
           error.response.data &&
           error.response.data.message) ||
         error.message ||
         error.toString();
       return thunkApi.rejectWithValue(message);
    }
  }
)


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers : (builder)=>{
    builder
      .addCase(updateUserInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(changeOldPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(changeOldPassword.fulfilled, (state, acttion) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = acttion.payload.message;
        toast.success(acttion.payload.message);
      })
      .addCase(changeOldPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload.data;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.users = null;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateUserInfoById.pending,(state , action)=>{
        state.isLoading = true;
      })
      .addCase(updateUserInfoById.fulfilled , (state, action)=>{
         state.isLoading = false;
         state.isSuccess = true;
         state.isError = false;
         state.message = action.payload.message;
         toast.success(action.payload.message);
      })
      .addCase(updateUserInfoById.rejected , (state, action)=>{
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteUserById.pending,(state,action)=>{
        state.isLoading=true;
      })
      .addCase(deleteUserById.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(deleteUserById.rejected,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  }
});


export default userSlice.reducer;
