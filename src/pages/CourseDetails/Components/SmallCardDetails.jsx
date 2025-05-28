import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  FileVideo,
  Heart,
  Users,
  ShoppingCart,
  Download,
  InfinityIcon,
  PlayCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "@/services/cartApi";

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/Slices/cartSlice"; // Add this import

function SmallCardDetails({
  price,
  discountedPrice,
  isEnrolled,
  progress,
  courseId,
  title, // Add title prop
}) {
  const [addToCartApi] = useAddToCartMutation();
  const dispatch = useDispatch(); // Add this
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const handleAction = async () => {
    // Make async
    if (isEnrolled) {
      navigate(`/courses/${courseId}/lesson`);
    } else {
      try {
        // Call API
        await addToCartApi(courseId);

        // Dispatch to Redux store
        dispatch(
          addToCart({
            id: courseId,
            title, // Make sure to pass title
            price: discountedPrice || price,
          })
        );
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  };
  // const displayPrice =
  //   discountedPrice < price ? (
  //     <div className="flex gap-2 items-center my-3">
  //       <span className="text-2xl font-bold">${discountedPrice}</span>
  //       <span className="text-gray-500 line-through">${price}</span>
  //     </div>
  //   ) : (
  //     <div className="text-2xl font-bold my-3">${price}</div>
  //   );

  return (
    <div className="bg-gray-100 rounded-2xl p-5 w-80">
      {isEnrolled ? (
        <div className="progress-section">
          <h4 className="text-lg font-semibold">Your Progress</h4>
          <div className="my-4">
            <Progress value={progress?.progressPercentage || 0} />
            <div className="flex justify-between mt-2 text-sm">
              <span>
                {progress?.completedLessons || 0} of{" "}
                {progress?.totalLessons || 0} lessons
              </span>
              <span className="font-medium">
                {progress?.progressPercentage || 0}%
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="price-section">
          <div className="text-2xl font-bold my-3">${price}</div>

          <p className="text-sm text-gray-600 mb-3">
            Includes full lifetime access
          </p>
        </div>
      )}

      <Button
        onClick={handleAction}
        className="w-full py-6 text-lg"
        variant={isEnrolled ? "default" : "primary"}
      >
        {isEnrolled ? (
          <>
            <PlayCircle className="mr-2" />
            Continue Learning
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2" />
            Add to Cart
          </>
        )}
      </Button>

      <div className="mt-5">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={isWishlisted ? "fill-red-500" : ""} />
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        <h5 className="font-bold">This course includes:</h5>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <FileVideo className="text-blue-500" />
            <span>On-demand video</span>
          </li>
          <li className="flex items-center gap-2">
            <Download className="text-blue-500" />
            <span>Downloadable resources</span>
          </li>
          <li className="flex items-center gap-2">
            <InfinityIcon className="text-blue-500" />
            <span>Full lifetime access</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SmallCardDetails;
