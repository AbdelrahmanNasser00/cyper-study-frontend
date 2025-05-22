import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CourseCard from "@/components/common/CourseCard";

function FeaturedCoursesSection({ courses, wishlisted, handleWishlistToggle }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <span className="bg-[#00c1d4]/10 text-[#00c1d4] px-4 py-1 rounded-full text-sm mb-3 inline-block">
              Featured Courses
            </span>
            <h2 className="font-poppins font-bold text-3xl mb-2">
              Most Popular Courses
            </h2>
            <p className="text-muted-foreground">
              Learn from expert instructors with real-world experience
            </p>
          </div>
          {/* <Link to="/courses">
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link> */}
        </div>

        {/* Content grid for both large and small screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              isWishlisted={wishlisted.includes(course.id)}
              onWishlistToggle={() => handleWishlistToggle(course.id)}
            />
          ))}
        </div>

        {/* Mobile button to view all courses */}
        <div className="mt-8 text-center md:hidden">
          <Link to="/courses" className="mt-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 mx-auto">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCoursesSection;
