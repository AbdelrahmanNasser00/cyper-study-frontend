import HeroSection from "./Components/Hero-sections/HeroSection";
import StatsSection from "./Components/Stats-section/StatsSection";
import CategoriesSection from "./Components/Categories-section/CategoriesSection";
import FeaturedCoursesSection from "./Components/Featured-courses-section/FeaturedCoursesSection";
import BecomeInstructorSection from "./Components/Become-instructor-Section/BecomeInstructorSection";
import TestimonialsSection from "./Components/Testimonials-section/TestimonialsSection";
import NewsletterSection from "./Components/Newsletter-section/NewsletterSection";

const Home = () => {
  // useEffect(() => {
  //   async function fetchCourses() {
  //     const res = await fetch("/api/courses");
  //     const data = await res.json();
  //     setCourses(data);
  //   }

  //   fetchCourses();
  // }, []);

  const categories = [
    {
      title: "Design",
      icon: "award",
      courseCount: 10,
      slug: "Design",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Data Science",
      icon: "book",
      courseCount: 6,
      slug: "Data Science",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    },
    {
      title: "Language Learning",
      icon: "book-open",
      courseCount: 6,
      slug: "Language Learning",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    },
    {
      title: "Finance & Accounting",
      icon: "settings",
      courseCount: 6,
      slug: "Finance & Accounting",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
    {
      title: "Health & Fitness",
      icon: "shopping-cart",
      courseCount: 4,
      slug: "Health & Fitness",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
    {
      title: "Music",
      icon: "heart",
      courseCount: 5,
      slug: "Music",
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
    },
    {
      title: "Development",
      icon: "book-open",
      courseCount: 5,
      slug: "Development",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Cybersecurity",
      icon: "briefcase",
      courseCount: 5,
      slug: "Cybersecurity",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      role: "Software Developer",
      company: "Google",
      testimonial:
        "The web development courses on Cyber Study helped me land my dream job. The instructors are engaging and the content is current with industry standards.",
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
      <HeroSection />
      <StatsSection />
      <CategoriesSection categories={categories} />
      <FeaturedCoursesSection />
      <BecomeInstructorSection />
      <TestimonialsSection testimonials={testimonials} />
      <NewsletterSection />
    </div>
  );
};

export default Home;
