import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice.js'
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
};


const authPersistReducer = persistReducer(authPersistConfig , authReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk,
    }),
});

export const persistor = persistStore(store);