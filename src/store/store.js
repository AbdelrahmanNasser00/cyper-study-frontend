import { authApi } from "@/services/authApi";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import wishlistSlice from "./Slices/wishListSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
    wishlist: wishlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
