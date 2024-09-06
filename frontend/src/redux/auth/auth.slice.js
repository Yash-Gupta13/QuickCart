import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./auth.service";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  user: null,
  message: "",
};

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (apiData, thunkApi) => {
    try {
      return await authService.userRegister(apiData);
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

export const userSignIn = createAsyncThunk(
  "auth/userSignIn",
  async (apiData, thunkApi) => {
    try {
      return await authService.userSignIn(apiData);
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

export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async (_, thunkApi) => {
    try {
      return await authService.userLogout();
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

export const userRefreshAccessToken = createAsyncThunk(
  "auth/userRefreshAccessToken",
  async (_, thunkApi) => {
    try {
      return await authService.userRefreshAccessToken();
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

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async(_,thunkApi)=>{
        try {
            return await authService.checkAuth();
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.data;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(userSignIn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(userLogout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = null;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(userRefreshAccessToken.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userRefreshAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(userRefreshAccessToken.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(checkAuth.pending , (state, action)=>{
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled , (state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(checkAuth.rejected , (state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload;
        toast.error(action.payload);
      })
  },
});
export const {setUser} = authSlice.actions;
export default authSlice.reducer;
