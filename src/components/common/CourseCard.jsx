import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/services/wishlistApi"; // <-- ✅ Corrected import path
import { toast } from "react-hot-toast"; // or your preferred toast library

const CourseCard = ({
  id,
  title,
  instructor,
  thumbnail,
  price,
  averageRating,
  ratingCount,
  level,
  bestseller = false,
  isBestseller = false,
  category,
  studentsCount,
}) => {
  // Fetch wishlist data from backend
  const { data: wishlistData, isLoading: wishlistLoading } =
    useGetWishlistQuery();
  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoving }] =
    useRemoveFromWishlistMutation();

  // Check if course is in wishlist
  const isWishlisted = wishlistData?.some(
    (item) => item.courseId === id || item.id === id
  );

  // Convert instructor object to string "Firstname Lastname"
  const instructorName = instructor
    ? `${instructor.firstname} ${instructor.lastname}`
    : "Unknown Instructor";

  // Convert price and rating from string to number
  const numericPrice = parseFloat(price) || 0;
  const numericRating = parseFloat(averageRating) || 0;
  const numericRatingCount = ratingCount || 0;

  const finalBestseller = bestseller || isBestseller;
  const finalThumbnail = thumbnail;

  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        // Find the wishlist item to get its ID for removal
        const wishlistItem = wishlistData.find(
          (item) => item.courseId === id || item.id === id
        );
        if (wishlistItem) {
          await removeFromWishlist(wishlistItem.id).unwrap();
          toast.success("Removed from wishlist");
        }
      } else {
        // Add to wishlist
        await addToWishlist({
          courseId: id,
          // Include any additional data your backend expects
        }).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Wishlist operation failed:", error);
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <div className="course-card border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
      {/* Course Thumbnail */}
      <div className="relative">
        <Link to={`/courses/${id}`}>
          <img
            src={finalThumbnail}
            alt={title}
            className="w-full aspect-video object-cover"
          />
        </Link>

        {/* Wishlist Button */}
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleWishlistToggle();
          }}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8"
          disabled={isAdding || isRemoving || wishlistLoading}
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
          />
        </Button>

        {/* Bestseller Badge */}
        {finalBestseller && (
          <Badge className="absolute top-2 left-2 bg-[#f9b15e] text-black font-medium">
            Bestseller
          </Badge>
        )}
      </div>

      {/* Course Details */}
      <div className="p-4">
        <Link to={`/courses/${id}`} className="block">
          <h3 className="font-poppins font-semibold text-lg line-clamp-2 mb-1 hover:text-[#354ebc] transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-2">
          by {instructorName}
        </p>

        {level && (
          <Badge variant="outline" className="text-xs mb-2 mr-2">
            {level}
          </Badge>
        )}

        {studentsCount && (
          <span className="text-xs text-muted-foreground block mb-2">
            {studentsCount.toLocaleString()} students
          </span>
        )}

        {/* Ratings */}
        <div className="flex items-center gap-1 mb-2">
          <span className="font-medium">{numericRating.toFixed(1)}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={`${
                  star <= Math.round(numericRating)
                    ? "fill-[#f9b15e] text-[#f9b15e]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({numericRatingCount.toLocaleString()})
          </span>
        </div>

        {/* Category */}
        {category && (
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${numericPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
