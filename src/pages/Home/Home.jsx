import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./Hero-sections/HeroSection";
import StatsSection from "./Stats-section/StatsSection";
import CategoriesSection from "./Categories-section/CategoriesSection";
import FeaturedCoursesSection from "./Featured-courses-section/FeaturedCoursesSection";
import BecomeInstructorSection from "./Become-instructor-Section/BecomeInstructorSection";
import TestimonialsSection from "./Testimonials-section/TestimonialsSection";
import NewsletterSection from "./Newsletter-section/NewsletterSection";

const Home = () => {
  // useEffect(() => {
  //   async function fetchCourses() {
  //     const res = await fetch("/api/courses");
  //     const data = await res.json();
  //     setCourses(data);
  //   }

  //   fetchCourses();
  // }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const categories = [
    {
      title: "Development",
      icon: "book-open",
      courseCount: 4500,
      slug: "development",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Business",
      icon: "briefcase",
      courseCount: 3200,
      slug: "business",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
    },
    {
      title: "Design",
      icon: "award",
      courseCount: 2800,
      slug: "design",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Marketing",
      icon: "list-video",
      courseCount: 2100,
      slug: "marketing",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      title: "IT & Software",
      icon: "graduation-cap",
      courseCount: 1900,
      slug: "it-software",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "Music",
      icon: "heart",
      courseCount: 1700,
      slug: "music",
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
    },
    {
      title: "Photography",
      icon: "book",
      courseCount: 1400,
      slug: "photography",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    },
    {
      title: "Health & Fitness",
      icon: "shopping-cart",
      courseCount: 1200,
      slug: "health-fitness",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
  ];
  useEffect(() => {
    const dummyCourses = [
      {
        id: "1",
        title: "Complete Web Development Bootcamp",
        instructor: "Dr. Angela Yu",
        thumbnail:
          "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
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
        thumbnail:
          "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
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
        thumbnail:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
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
        thumbnail:
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
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
        thumbnail:
          "https://images.unsplash.com/photo-1518770660439-4636190af475",
        price: 17.99,
        originalPrice: 109.99,
        rating: 4.9,
        reviewsCount: 28451,
        category: "Data Science",
        bestseller: true,
      },
    ];

    setCourses(dummyCourses);
    setSearchResults(dummyCourses);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleSearchSubmit = () => {
    navigate(`/search-results?query=${searchTerm}`);
  };

  const [wishlisted, setWishlisted] = useState([]);

  const handleWishlistToggle = (courseId) => {
    setWishlisted((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const testimonials = [
    {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      role: "Software Developer",
      company: "Google",
      testimonial:
        "The web development courses on Learnify helped me land my dream job. The instructors are engaging and the content is current with industry standards.",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      role: "UX Designer",
      company: "Amazon",
      testimonial:
        "I was able to completely change my career from marketing to UX design thanks to the comprehensive design courses available here.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      role: "Data Scientist",
      company: "Microsoft",
      testimonial:
        "The data science bootcamp was exactly what I needed to build practical skills. I can now confidently work with large datasets and build ML models.",
      rating: 4,
    },
  ];

  return (
    <div>
      <HeroSection
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        onSearchClick={handleSearchSubmit}
        searchResults={searchResults}
      />
      <StatsSection />
      <CategoriesSection categories={categories} />
      <FeaturedCoursesSection
        courses={courses}
        wishlisted={wishlisted}
        handleWishlistToggle={handleWishlistToggle}
      />
      <BecomeInstructorSection />
      <TestimonialsSection testimonials={testimonials} />
      <NewsletterSection/>
    </div>
  );
};

export default Home;
