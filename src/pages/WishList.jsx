import React, { useContext } from "react";
import { useGetWishlistQuery } from "@/services/wishlistApi";
import WishlistItem from "@/components/common/WishlistItem";
import { WishlistContext } from "@/context/WishlistContext"; // Import context

const Wishlist = () => {
  const { data: wishlistItems = [], isLoading, error } = useGetWishlistQuery();
  const { updateWishlistCount } = useContext(WishlistContext); // Access context

  const handleRemove = (item) => {
    console.log("Item removed from wishlist");
    updateWishlistCount(wishlistItems.length - 1); // Update count
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <WishlistItem
              key={`${item.userId}-${item.courseId}`}
              wishlistItem={item}
              onRemove={() => handleRemove(item)} // Use callback
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
