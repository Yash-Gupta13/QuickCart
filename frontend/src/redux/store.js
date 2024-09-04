import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice.js'
import userReducer from './user/user.slice.js'
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
};

const userPersistConfig = {
  key : "user",
  storage
}


const authPersistReducer = persistReducer(authPersistConfig , authReducer);
const userPersistReducer = persistReducer(userPersistConfig , userReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistReducer,
    user: userPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk,
    }),
});

export const persistor = persistStore(store);