import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Star, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toggleItem } from "@/store/Slices/wishListSlice";

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
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === id);

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

  const handleWishlistToggle = () => {
    dispatch(
      toggleItem({
        id,
        title,
        instructor: instructorName,
        image: finalThumbnail,
        price: numericPrice,
      })
    );
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
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8">
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
