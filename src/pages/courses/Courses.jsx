import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronRight, Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import CourseCard from "@/components/common/CourseCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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
      // Handle ratings - check if rating meets or exceeds selected rating
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((rating) => course.rating >= rating);

      // Handle level - case insensitive comparison
      const matchesLevel =
        selectedLevels.length === 0 ||
        selectedLevels.some(
          (level) => course.level?.toLowerCase() === level.toLowerCase()
        );

      // Handle price type (free/paid)
      const matchesPriceType =
        selectedPriceTypes.length === 0 ||
        (selectedPriceTypes.includes("free") && course.price === 0) ||
        (selectedPriceTypes.includes("paid") && course.price > 0);

      // Handle price range
      const matchesPriceRange =
        course.price === 0 || // Free courses always pass price range filter
        (course.price >= priceRange[0] && course.price <= priceRange[1]);

      return (
        matchesRating && matchesLevel && matchesPriceType && matchesPriceRange
      );
    });
    // console.log("Filtered courses:", filtered.length);
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
      {/* start head part */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-15">
        <div className="container">
          {/* start menu */}
          <div className="flex items-center">
            <span>Home</span>
            <ChevronRight className="size-4" />
            <span>Categories</span>
            <ChevronRight className="size-4" />
            <span>Development</span>
          </div>
          {/* end menu */}
          <h2 className="py-5 font-bold text-4xl">Development Courses</h2>
          <p className="pb-8 max-w-xl">
            Explore our wide range of courses in this category and start your
            learning journey today.
          </p>
          <span className="bg-white/20 p-2 rounded-lg">127 courses</span>
        </div>
      </div>
      {/* end head part */}
      {/* start content */}
      <div className="container mt-10">
        <Button
          onClick={toggleFilterPanel}
          className="bg-blue-600 hover:bg-blue-700">
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
      <div className="flex gap-5 container my-10 relative">
        {/* start filter */}
        {isOpen && (
          <>
            <div className="w-0 h-0 left-5 -top-10 absolute z-51 border-l-15 border-l-transparent border-r-15 border-r-transparent border-b-15 border-b-white "></div>
            <div className="w-60 rounded-2xl shrink-0 absolute left-3 -top-7 z-50 bg-gray-50 shadow-black shadow-2xl p-10">
              {/* start rating */}
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
                      className="ml-2 flex items-center">
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
              {/* end rating */}
              {/* start level */}
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
                      className="ml-2 capitalize">
                      {level}
                    </Label>
                  </div>
                ))}
              </div>
              {/* end level */}
              {/* start price */}
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
                      className="ml-2 capitalize">
                      {priceType}
                    </Label>
                  </div>
                ))}
              </div>
              {/* end price */}
              {/* start price range */}
              <h4 className="font-bold mb-5 mt-10">Price Range</h4>
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
              {/* end price range */}
            </div>
          </>
        )}
        {/* end filter */}
        {/* start courses container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 ">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course}></CourseCard>
          ))}
        </div>
        {/* end courses container */}
      </div>
      {/* end content */}
    </div>
  );
}

export default Courses;
