import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetWishlistQuery } from "@/services/wishlistApi";
import WishlistItem from "@/components/common/WishlistItem";
import { removeItem, setWishlistItems } from "@/store/Slices/wishListSlice";

const Wishlist = () => {
  const {
    data: apiWishlistItems = [],
    isLoading,
    error,
  } = useGetWishlistQuery();
  const dispatch = useDispatch();

  // Get wishlist items from Redux store
  const reduxWishlistItems = useSelector((state) => state.wishlist.items);

  // Sync API data with Redux store when API data loads
  useEffect(() => {
    if (apiWishlistItems.length > 0) {
      dispatch(setWishlistItems(apiWishlistItems));
    }
  }, [apiWishlistItems, dispatch]);

  const handleRemove = (item) => {
    console.log("Item removed from wishlist:", item);
    // Remove from Redux store
    dispatch(removeItem(item));

    // TODO: Also make API call to remove from backend
    // You might want to call your API mutation here
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
        <div className="text-center text-red-600">
          <p>
            Error loading wishlist: {error.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  // Use Redux items for rendering (which will be synced with API data)
  const wishlistToRender =
    reduxWishlistItems.length > 0 ? reduxWishlistItems : apiWishlistItems;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      {wishlistToRender.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistToRender.map((item) => (
            <WishlistItem
              key={`${item.userId}-${item.courseId || item.id}`}
              wishlistItem={item}
              onRemove={() => handleRemove(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
