import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import {
  useGetCourseReviewsQuery,
  useAddReviewMutation,
} from "@/services/reviewsApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReviewDialog } from "./ReviewDialog";
import { toast } from "sonner";

function ReviewTab({ course }) {
  const { data: reviewsData, refetch } = useGetCourseReviewsQuery(course.id);
  const [addReview] = useAddReviewMutation();
  const reviews = reviewsData || [];

  // Calculate rating distribution
  const ratingDistribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    ratingDistribution[review.rating]++;
  });

  // Calculate percentage for each rating
  const ratingPercentages = {};
  const totalRatings = course.ratingCount || 1;

  Object.keys(ratingDistribution).forEach((rating) => {
    ratingPercentages[rating] = Math.round(
      (ratingDistribution[rating] / totalRatings) * 100
    );
  });

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`size-4 ${
            i <= rating ? "fill-amber-300 text-amber-300" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const handleAddReview = async (reviewData) => {
    try {
      await addReview({
        courseId: course.id,
        rating: reviewData.rating,
        comment: reviewData.comment,
      }).unwrap();

      await refetch(); // Refetch reviews after successful submission

      toast.success("Review submitted successfully", {
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      toast.error("Failed to submit review", {
        description: "Please try again later",
      });
      console.error("Failed to add review:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-2xl">Student Reviews</h3>
        {course.isEnrolled && <ReviewDialog onSubmit={handleAddReview} />}
      </div>

      <div className="flex gap-15 flex-wrap items-center mb-5">
        {/* Rating summary */}
        <div className="text-center mx-auto md:mx-0">
          <span className="text-mainColor font-bold text-5xl">
            {parseFloat(course.averageRating || 0).toFixed(1)}
          </span>
          <div className="rating flex mt-5 justify-center">
            {renderStars(Math.round(parseFloat(course.averageRating || 0)))}
          </div>
          <span className="text-gray-500">
            {course.ratingCount || 0} rating
            {course.ratingCount !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Rating distribution */}
        <div className="mx-auto md:mx-0">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex gap-3 items-center">
              <div className="flex gap-1 w-8">
                <span>{rating}</span>
                <Star className="fill-amber-300 text-orange-200 size-4" />
              </div>
              <Progress
                value={ratingPercentages[rating] || 0}
                className="w-50 my-3"
              />
              <span className="w-10 text-sm">
                {ratingDistribution[rating] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="mb-5">
            <div className="flex gap-5">
              <Avatar>
                <AvatarFallback>
                  {review.User?.firstname[0]}
                  {review.User?.lastname[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h5>
                  {review.User?.firstname} {review.User?.lastname}
                </h5>
                <div className="flex gap-2 items-center">
                  <div className="rating flex">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-[12px] text-gray-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                <p className="text-lg mt-3">{review.comment}</p>
              </div>
            </div>
            <hr className="my-5" />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </>
  );
}

export default ReviewTab;
