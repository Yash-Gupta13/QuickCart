import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apSlice } from "../api/apiSlice";

const store = configureStore({
  reducer: {
    [apSlice.reducerPath]: apSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware.concat(apSlice.middleware),
  devTools: true,
});


setupListeners(store.dispatch);

export default store