import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  userService  from "./user.service";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  user: null,
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


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers : (builder)=>{
    builder
    .addCase(updateUserInfo.pending,(state, action)=>{
        state.isLoading = true;
    })
    .addCase(updateUserInfo.fulfilled , (state , action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
        toast.success(action.payload.message);
    })
    .addCase(updateUserInfo.rejected , (state,action)=>{
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
        toast.error(action.payload);
    })
  }
});


export default userSlice.reducer;
