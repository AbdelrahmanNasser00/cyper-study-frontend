import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search as SearchIcon,
  Star,
  Clock,
  Users,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLazySearchQuery } from "@/services/searchApi";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [triggerSearch, { data: results = [], isLoading, isError }] =
    useLazySearchQuery();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setHasSearched(true);
      triggerSearch(searchTerm);
    }
  };

  // Reset hasSearched when search term changes
  useEffect(() => {
    setHasSearched(false);
  }, [searchTerm]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-4 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search courses, instructors, or topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="pl-10 py-6 rounded-full text-sm md:text-base text-black bg-white"
        />
        <Button
          onClick={handleSearch}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 bg-[#3a4cb1] hover:bg-[#4e62d3] focus-visible:ring-[#4e62d3]">
          Search
        </Button>
      </div>

      {hasSearched && (
        <div className="absolute left-0 right-0 mt-3 z-10">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-xl p-4 flex items-center justify-center">
              <div className="animate-pulse text-gray-500">
                Finding courses...
              </div>
            </div>
          ) : isError ? (
            <div className="bg-white rounded-xl shadow-xl p-4 text-red-500">
              Couldn't load results. Try again.
            </div>
          ) : results?.length > 0 ? (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden divide-y divide-gray-100">
              {results.map((course) => (
                <Link
                  to={`/courses/${course.id}`}
                  key={course.id}
                  className="block hover:bg-gray-50 transition-colors duration-150">
                  <div className="p-4 flex gap-4">
                    <div className="flex-shrink-0 w-32 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={course.thumbnail || "/course-placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-start text-gray-900 truncate">
                        {course.title}
                      </h3>
                      <p className="text-sm text-start text-gray-500 mt-1">
                        {course.instructor.firstname}{" "}
                        {course.instructor.lastname}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                        <div className="flex items-center text-gray-600">
                          <Star className="w-3 h-3 mr-1 text-yellow-500 fill-yellow-500" />
                          {course.rating || "4.7"} (
                          {course.reviewsCount || "120"})
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-3 h-3 mr-1 text-gray-400" />
                          {course.enrolledStudents || "1.2k"} students
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-3 h-3 mr-1 text-gray-400" />
                          {course.duration || "6h 20m"}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="w-3 h-3 mr-1 text-gray-400" />
                          {course.lessonsCount || "12"} lessons
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-4">
                      {course.price ? (
                        <span className="font-medium text-[#3a4cb1]">
                          ${course.price}
                        </span>
                      ) : (
                        <span className="font-medium text-green-600">Free</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-xl p-6 text-center">
              <p className="text-gray-500">
                No courses found for "{searchTerm}"
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Try different keywords
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
