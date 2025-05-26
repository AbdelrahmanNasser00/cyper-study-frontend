import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronRight, Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import CourseCard from "@/components/common/CourseCard";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useGetCoursesByCategoryQuery } from "@/services/coursesApi";
import { data, useParams } from "react-router-dom";
import LoadingSpinner from "@/components/common/loadingSpinner";

function Courses() {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedPriceTypes, setSelectedPriceTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const { categoryId } = useParams();
  const {
    data: categoryCourses,
    isLoading,
    error,
  } = useGetCoursesByCategoryQuery(categoryId);

  useEffect(() => {
    if (categoryCourses?.Courses) {
      setFilteredCourses(categoryCourses.Courses);
    }
  }, [categoryCourses]);

  useEffect(() => {
    if (!categoryCourses?.Courses) return;
    const filtered = categoryCourses.Courses.filter((course) => {
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some(
          (rating) => Number(course.averageRating) >= rating
        );

      const matchesLevel =
        selectedLevels.length === 0 ||
        selectedLevels.some(
          (level) =>
            course.level &&
            course.level.toLowerCase().trim() === level.toLowerCase().trim()
        );

      const matchesPriceType =
        selectedPriceTypes.length === 0 ||
        (selectedPriceTypes.includes("free") && Number(course.price) === 0) ||
        (selectedPriceTypes.includes("paid") && Number(course.price) > 0);

      const matchesPriceRange =
        Number(course.price) >= priceRange[0] &&
        Number(course.price) <= priceRange[1];

      return (
        matchesRating && matchesLevel && matchesPriceType && matchesPriceRange
      );
    });
    setFilteredCourses(filtered);
  }, [
    selectedRatings,
    selectedLevels,
    selectedPriceTypes,
    priceRange,
    categoryCourses,
  ]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className=" min-h-dvh col-span-full text-center py-10 flex items-center justify-center">
        <div>
          <h2 className="text-5xl font-bold text-gray-700">
            No courses available
          </h2>
          <p className="text-gray-500 text-2xl mt-2">Coming soon...</p>
        </div>
      </div>
    );
  }

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
            <span>{categoryCourses?.name || "Category"}</span>
          </div>
          {/* end menu */}
          <h2 className="py-5 font-bold text-4xl">
            {categoryCourses?.name || "Category"}
          </h2>
          <p className="pb-8 max-w-xl">
            {categoryCourses?.description ||
              "Explore our wide range of courses in this category and start your learning journey today."}
          </p>
          <span className="bg-white/20 p-2 rounded-lg">
            {categoryCourses?.Courses?.length || 0} courses
          </span>
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
        priceRange[1] < 500 ? (
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
                  max={500}
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
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
        {/* end courses container */}
      </div>
      {/* end content */}
    </div>
  );
}

export default Courses;
