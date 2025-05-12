import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronRight, Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import CourseCard from "@/components/common/CourseCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Courses() {
  const [isOpen, setIsopen] = useState(false);

  function handleIsopen() {
    setIsopen(!isOpen);
  }

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
      bestseller: true,
    },
    {
      id: "2",
      title: "Modern React with Redux [2023 Update]",
      instructor: "Stephen Grider",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
      price: 13.99,
      originalPrice: 89.99,
      rating: 4.8,
      reviewsCount: 32105,
      category: "Development",
    },
    {
      id: "3",
      title: "The Complete Digital Marketing Course",
      instructor: "Rob Percival",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      price: 15.99,
      originalPrice: 94.99,
      rating: 4.5,
      reviewsCount: 18942,
      category: "Marketing",
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
      bestseller: true,
    },
  ];
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
        <Button onClick={handleIsopen} className="bg-mainColor">
          Filter
        </Button>
      </div>
      <div className="flex gap-5 container my-10 relative">
        {/* start filter */}
        {isOpen && (
          <>
            <div class="w-0 h-0 left-5 -top-10 absolute z-501 border-l-15 border-l-transparent border-r-15 border-r-transparent border-b-15 border-b-white "></div>
            <div className="w-60 rounded-2xl shrink-0 absolute left-3 -top-7 z-500 bg-gray-50 shadow-black shadow-2xl p-10">
              {/* start rating */}
              <div>
                <h4 className="font-bold mb-5">Ratings</h4>
                {/* rate */}
                <div>
                  {[4.5, 4, 3.5, 3.0].map((rating, index) => (
                    <div key={index} className="flex items-center my-2">
                      <Checkbox id={`rating-${index}`} />
                      <Label
                        htmlFor={`rating-${index}`}
                        className=" ml-2 flex items-center"
                      >
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              } `}
                            />
                          ))}
                        </div>
                        <span>{rating} & up</span>
                      </Label>
                    </div>
                  ))}
                </div>
                {/* rate */}
              </div>
              {/* end rating */}
              {/* start level */}
              <div>
                <h4 className="font-bold mb-5 mt-10">Course Level</h4>
                {/* level */}
                <div>
                  {["Beginner", "Intermediate", "Advanced"].map(
                    (level, index) => (
                      <div key={index} className="flex gap-3 my-3">
                        <Checkbox id={`level-${index}`} />
                        <Label htmlFor={`level-${index}`}>{level}</Label>
                      </div>
                    )
                  )}
                </div>
                {/* level */}
              </div>
              {/* end level */}
              {/* start price */}
              <div>
                <h4 className="font-bold mb-5 mt-10">Price</h4>
                <div>
                  {["free", "paid"].map((level, index) => (
                    <div key={index} className="flex gap-3 my-3">
                      <Checkbox id={`level-${index}`} />
                      <Label htmlFor={`level-${index}`}>{level}</Label>
                    </div>
                  ))}
                </div>
              </div>
              {/* end price */}
              {/* start price range */}
              <h4 className="font-bold mb-5 mt-10">Price Range</h4>
              <div>
                <input className="w-full" type="range" min="1" max="100" />
                <div className="flex justify-between">
                  <span className="min">$ 1</span>
                  <span className="max">$ 100</span>
                </div>
              </div>
              {/* end price range */}
              <Button className="mt-5 bg-mainColor">Applay Filter</Button>
            </div>
          </>
        )}
        {/* end filter */}
        {/* start courses container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 ">
          {dummyCourses.map((course) => (
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
