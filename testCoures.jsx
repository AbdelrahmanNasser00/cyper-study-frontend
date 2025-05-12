import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronRight, Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

// Simple CourseCard component for demonstration
const CourseCard = ({
  title,
  instructor,
  price,
  originalPrice,
  rating,
  reviewsCount,
  bestseller,
}) => (
  <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
    <div className="bg-gray-200 h-40 relative">
      {bestseller && (
        <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
          Bestseller
        </span>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg mb-1 truncate">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{instructor}</p>
      <div className="flex items-center mb-2">
        <span className="font-bold text-amber-500 mr-1">{rating}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3 w-3 ${
                star <= Math.floor(rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">
          ({reviewsCount.toLocaleString()})
        </span>
      </div>
      <div className="flex items-center">
        {price === 0 ? (
          <span className="font-bold">Free</span>
        ) : (
          <>
            <span className="font-bold">${price.toFixed(2)}</span>
            <span className="text-gray-500 line-through text-sm ml-2">
              ${originalPrice.toFixed(2)}
            </span>
          </>
        )}
      </div>
    </div>
  </div>
);

function Courses() {
  const dummyCourses = [
    {
      id: "1",
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      price: 19.99,
      originalPrice: 129.99,
      rating: 4.7,
      reviewsCount: 45892,
      category: "Development",
      level: "beginner",
      bestseller: true,
    },
    {
      id: "2",
      title: "Modern React with Redux [2023 Update]",
      instructor: "Stephen Grider",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
      price: 13.99,
      originalPrice: 89.99,
      rating: 3,
      reviewsCount: 32105,
      category: "Development",
      level: "intermediate",
    },
    {
      id: "3",
      title: "The Complete Digital Marketing Course",
      instructor: "Rob Percival",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      price: 0,
      originalPrice: 94.99,
      rating: 4.5,
      reviewsCount: 18942,
      category: "Marketing",
      level: "beginner",
    },
    {
      id: "4",
      title: "UX/UI Design Fundamentals",
      instructor: "Daniel Walter Scott",
      thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
      price: 12.99,
      originalPrice: 84.99,
      rating: 4.6,
      reviewsCount: 12675,
      category: "Design",
      level: "intermediate",
    },
    {
      id: "5",
      title: "Data Science & Machine Learning Bootcamp",
      instructor: "Jose Portilla",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      price: 17.99,
      originalPrice: 109.99,
      rating: 4.9,
      reviewsCount: 28451,
      category: "Data Science",
      level: "advanced",
      bestseller: true,
    },
  ];

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedPriceTypes, setSelectedPriceTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  // Apply filters immediately when any filter changes
  useEffect(() => {
    applyFilters();
  }, [selectedRatings, selectedLevels, selectedPriceTypes, priceRange]);

  // Initialize filtered courses on first render
  useEffect(() => {
    setFilteredCourses(dummyCourses);
  }, []);

  function handleRatingChange(rating) {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  }

  function handleLevelChange(level) {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  }

  function handlePriceTypeChange(type) {
    setSelectedPriceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function toggleFilterPanel() {
    setIsOpen(!isOpen);
  }

  function applyFilters() {
    const filtered = dummyCourses.filter((course) => {
      // Rating filter - match if course rating is equal to or higher than any selected rating
      const ratingMatch =
        selectedRatings.length === 0 ||
        selectedRatings.some((rating) => course.rating >= rating);

      // Level filter - case insensitive comparison
      const levelMatch =
        selectedLevels.length === 0 ||
        selectedLevels.some(
          (level) => course.level?.toLowerCase() === level.toLowerCase()
        );

      // Price type filter (free/paid)
      const priceTypeMatch =
        selectedPriceTypes.length === 0 ||
        (selectedPriceTypes.includes("free") && course.price === 0) ||
        (selectedPriceTypes.includes("paid") && course.price > 0);

      // Price range filter - apply only to paid courses
      const priceRangeMatch =
        course.price === 0 || // Free courses always pass price range filter
        (course.price >= priceRange[0] && course.price <= priceRange[1]);

      return ratingMatch && levelMatch && priceTypeMatch && priceRangeMatch;
    });

    setFilteredCourses(filtered);
  }

  function resetFilters() {
    setSelectedRatings([]);
    setSelectedLevels([]);
    setSelectedPriceTypes([]);
    setPriceRange([0, 100]);
  }

  return (
    <div>
      {/* Header section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb navigation */}
          <div className="flex items-center mb-4">
            <span>Home</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span>Categories</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span>Development</span>
          </div>

          <h2 className="text-4xl font-bold mb-4">Development Courses</h2>
          <p className="max-w-xl mb-6">
            Explore our wide range of courses in this category and start your
            learning journey today.
          </p>
          <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">
            {filteredCourses.length} courses
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter toggle button */}
        <div className="mb-6">
          <Button
            onClick={toggleFilterPanel}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isOpen ? "Hide Filters" : "Show Filters"}
          </Button>
          {selectedRatings.length > 0 ||
          selectedLevels.length > 0 ||
          selectedPriceTypes.length > 0 ||
          priceRange[0] > 0 ||
          priceRange[1] < 100 ? (
            <Button onClick={resetFilters} variant="outline" className="ml-2">
              Reset Filters
            </Button>
          ) : null}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar - conditionally rendered based on isOpen */}
          {isOpen && (
            <div className="w-full md:w-64 bg-gray-50 p-6 rounded-lg shadow-md">
              {/* Rating filter */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Ratings</h4>
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <div key={rating} className="flex items-center mb-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={() => handleRatingChange(rating)}
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="ml-2 flex items-center"
                    >
                      <div className="flex mr-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm">{rating} & up</span>
                    </Label>
                  </div>
                ))}
              </div>

              {/* Level filter */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Course Level</h4>
                {["beginner", "intermediate", "advanced"].map((level) => (
                  <div key={level} className="flex items-center mb-2">
                    <Checkbox
                      id={`level-${level}`}
                      checked={selectedLevels.includes(level)}
                      onCheckedChange={() => handleLevelChange(level)}
                    />
                    <Label
                      htmlFor={`level-${level}`}
                      className="ml-2 capitalize"
                    >
                      {level}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Price type filter */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4">Price</h4>
                {["free", "paid"].map((priceType) => (
                  <div key={priceType} className="flex items-center mb-2">
                    <Checkbox
                      id={`price-${priceType}`}
                      checked={selectedPriceTypes.includes(priceType)}
                      onCheckedChange={() => handlePriceTypeChange(priceType)}
                    />
                    <Label
                      htmlFor={`price-${priceType}`}
                      className="ml-2 capitalize"
                    >
                      {priceType}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Price range filter */}
              <div>
                <h4 className="font-bold text-lg mb-4">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value)}
                  min={0}
                  max={100}
                  step={1}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          )}

          {/* Course grid */}
          <div
            className={`flex-1 ${
              filteredCourses.length === 0
                ? "flex items-center justify-center"
                : ""
            }`}
          >
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">
                  No courses match your filters
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filter criteria
                </p>
                <Button onClick={resetFilters}>Reset All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
