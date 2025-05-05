import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HeroSection({
  searchTerm,
  onSearchChange,
  onSearchClick,
  searchResults,
}) {
  return (
    <section className="bg-gradient-to-r from-[#3c59e8] to-[#01c0d3] py-24 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#3c59e8] to-[#01c0d3] opacity-90"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in">
            Expand Your Career{" "}
            <span className="text-[#f9b15e]">Opportunities</span>
          </h1>
          <p
            className="text-lg md:text-xl mb-8 text-white/90 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Learn the most in-demand skills from expert instructors. Thousands
            of courses starting at just $12.99.
          </p>

          <div
            className="relative max-w-lg mx-auto animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />

            <Input
              type="search"
              placeholder="What do you want to learn today?"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 py-6 rounded-full text-sm md:text-base text-black bg-white"
            />

            <Button
              type="button"
              onClick={onSearchClick}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 bg-[#3a4cb1] hover:bg-[#4e62d3] focus-visible:ring-[#4e62d3] "

            >
              Search
            </Button>

            {searchTerm && searchResults.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-10">
                {searchResults.map((course) => (
                  <li
                    key={course.id}
                    className="flex items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-all"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div className="flex flex-col flex-grow text-left">
                      <Link
                        to={`/course/${course.id}`}
                        className="text-lg font-semibold text-black hover:text-blue-500 transition-colors"
                      >
                        {course.title}
                      </Link>
                      <span className="text-sm text-gray-500">
                        {course.instructor}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              100,000+ Courses
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              Expert Instructors
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              Lifetime Access
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              Money Back Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
