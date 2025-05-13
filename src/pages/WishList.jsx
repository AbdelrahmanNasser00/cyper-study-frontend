import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleItem } from "@/store/Slices/wishListSlice";
import { addToCart } from "@/store/Slices/cartSlice"; // <-- ✅ add this
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  const handleRemove = (course) => {
    dispatch(toggleItem(course));
  };

  const handleAddToCart = (course) => {
    dispatch(addToCart(course)); 
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((course) => (
            <div
              key={course.id}
              className="relative border p-4 rounded-lg shadow hover:shadow-md bg-white"
            >
              <Button
                onClick={() => handleRemove(course)}
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8"
              >
                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              </Button>

              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover mb-4 rounded"
              />

              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600">By {course.instructor}</p>
              <p className="mt-2 text-lg font-bold text-blue-600">
                ${course.price}
              </p>

              <Button
                onClick={() => handleAddToCart(course)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Add to cart
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
