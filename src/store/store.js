import { authApi } from "@/services/authApi";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import wishlistSlice from "./Slices/wishListSlice";
import cartSlice from "./Slices/cartSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
