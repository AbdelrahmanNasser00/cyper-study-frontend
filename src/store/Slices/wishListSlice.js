import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleItem: (state, action) => {
      // Check for both id and courseId to be more flexible
      const itemId = action.payload.id || action.payload.courseId;
      const exists = state.items.find(
        (item) => item.id === itemId || item.courseId === itemId
      );

      if (exists) {
        // Remove item
        state.items = state.items.filter(
          (item) => item.id !== itemId && item.courseId !== itemId
        );
      } else {
        // Add item
        state.items.push(action.payload);
      }
    },
    setWishlistItems: (state, action) => {
      // Set all wishlist items (useful for initial load)
      state.items = action.payload;
    },
    removeItem: (state, action) => {
      // Dedicated remove action
      const itemId = action.payload.id || action.payload.courseId;
      state.items = state.items.filter(
        (item) => item.id !== itemId && item.courseId !== itemId
      );
    },
  },
});

export const { toggleItem, setWishlistItems, removeItem } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
