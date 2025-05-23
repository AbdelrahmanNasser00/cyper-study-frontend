import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import CourseCard from "@/components/common/CourseCard";
import { useTopCoursesQuery } from "@/services/coursesApi";

function FeaturedCoursesSection() {
  const {
    data: topCourses = [],
    isLoading,
    isError,
    error,
  } = useTopCoursesQuery();

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
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-[#00c1d4]" />
            <p className="mt-4 text-gray-600">Loading featured courses...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-lg">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <p className="mt-4 text-red-600 font-medium">
              Failed to load featured courses
            </p>
            <p className="text-sm text-red-500 mt-2">
              {error?.data?.message || "Please try again later"}
            </p>
            <Button
              variant="outline"
              className="mt-4 text-red-500 border-red-300 hover:bg-red-50"
              onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

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
          </>
        )}
      </div>
    </section>
  );
}

export default FeaturedCoursesSection;
