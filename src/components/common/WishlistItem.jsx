import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/Slices/cartSlice";
import { useGetCourseByIdQuery } from "@/services/coursesApi";
import { useRemoveFromWishlistMutation } from "@/services/wishlistApi";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Import Link

const WishlistItem = ({ wishlistItem, onRemove }) => {
  const dispatch = useDispatch();
  const {
    data: course,
    isLoading,
    error,
  } = useGetCourseByIdQuery(wishlistItem.courseId);
  const [removeFromWishlist, { isLoading: isRemoving }] =
    useRemoveFromWishlistMutation();

  const handleRemove = async () => {
    try {
      await removeFromWishlist(wishlistItem.courseId).unwrap();
      if (onRemove) onRemove();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const handleAddToCart = () => {
    if (course) {
      const cartItem = {
        id: course.id,
        title: course.title,
        instructor: `${course.instructor?.firstname} ${course.instructor?.lastname}`,
        image: course.thumbnail,
        price: course.price,
      };
      dispatch(addToCart(cartItem));
    }
  };

  if (isLoading) {
    return (
      <div className="relative border p-4 rounded-lg shadow hover:shadow-md bg-white">
        <div className="animate-pulse">
          <div className="w-full h-40 bg-gray-200 mb-4 rounded"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="relative border p-4 rounded-lg shadow hover:shadow-md bg-white">
        <Button
          onClick={handleRemove}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8"
          disabled={isRemoving}
        >
          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
        </Button>
        <div className="w-full h-40 bg-gray-200 mb-4 rounded flex items-center justify-center">
          <span className="text-gray-500">Course not found</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-500">
          Course ID: {wishlistItem.courseId}
        </h2>
        <p className="text-sm text-gray-600">Error loading course details</p>
      </div>
    );
  }

  const instructorName = course.instructor
    ? `${course.instructor.firstname} ${course.instructor.lastname}`
    : "Unknown Instructor";

  return (
    <div className="relative border p-4 rounded-lg shadow hover:shadow-md bg-white">
      <Button
        onClick={handleRemove}
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8"
        disabled={isRemoving}
      >
        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
      </Button>
      <Link to={`/courses/${course.id}`} className="block">
        {" "}
        {/* Add Link */}
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-40 object-cover mb-4 rounded"
        />
        <h2 className="text-xl font-semibold">{course.title}</h2>
        <p className="text-sm text-gray-600">By {instructorName}</p>
        <p className="mt-2 text-lg font-bold text-blue-600">
          ${parseFloat(course.price || 0).toFixed(2)}
        </p>
      </Link>
      <Button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Add to cart
      </Button>
    </div>
  );
};

export default WishlistItem;
