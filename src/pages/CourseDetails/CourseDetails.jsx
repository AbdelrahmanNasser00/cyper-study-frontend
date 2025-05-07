import { Badge } from "@/components/ui/badge";
import backgroundImg from "/Course.jpg";
import {
  BookOpen,
  Clock,
  Star,
  TvMinimalPlay,
  User,
  Users,
} from "lucide-react";
import SmallCardDetails from "./Components/SmallCardDetails";
import TabsInCourseDetails from "./Components/TabsInCourseDetails";

function CourseDetails() {
  // Course data object for API integration
  const course = {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more. This comprehensive course takes you from beginner to advanced.',
    price: 89.99,
    discountedPrice: 19.99,
    rating: 4.8,
    totalRatings: 12547,
    totalStudents: 54239,
    lastUpdated: 'March 2023',
    totalHours: 65,
    totalLessons: 412,
    level: 'All Levels',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80',
    instructor: {
      name: 'Jane Doe',
      title: 'Senior Web Developer & Instructor',
      bio: 'Teaching web development for over 10 years with experience at top tech companies.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      courses: 15,
      students: 124500,
      rating: 4.9
    },
    progress: 35, // Only if user is enrolled
    isEnrolled: true,
    whatYouWillLearn: [
      'Build responsive websites with HTML, CSS, and JavaScript',
      'Create dynamic web applications with React',
      'Develop backend services with Node.js',
      'Deploy your applications to production'
    ],
    requirements: [
      'Basic computer skills',
      'No prior programming experience required',
      'All tools and software used in this course are free',
      'A stable internet connection for video streaming'
    ],
    isWishlisted: false
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${backgroundImg})` }}
        className="bg-cover bg-center min-h-dvh flex items-center justify-center relative">
        <div className="bg-black absolute size-full opacity-30"></div>
        {/* start card */}
        <div className="bg-white flex-wrap lg:flex-nowrap justify-center container relative top-5 rounded-2xl p-10 shadow-lg flex gap-10">
          <div>
            {" "}
            {/* start left-content */}
            <div className="label-date flex gap-2">
              <Badge className="bg-amber-400 text-black">{course.category}</Badge>
              <Badge className="bg-mainColor">{course.level}</Badge>
              <span>Last updated: {course.lastUpdated}</span>
            </div>
            <div className="header-description">
              <h2 className="mb-5 mt-3 text-4xl font-bold">
                {course.title}
              </h2>
              <p className="max-w-[800px]">
                {course.description}
              </p>
            </div>
            <div className="rate-users justify-center flex-col lg:justify-self-start lg:flex-row text-center flex my-7 gap-4">
              <div className="flex gap-2">
                <div className="rating flex ">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index}
                      className={`text-orange-200 ${index < Math.floor(course.rating) ? 'fill-amber-300' : ''}`} 
                    />
                  ))}
                </div>
                <span>{course.rating}</span>
                <span className="text-gray-500">({course.totalRatings} ratings)</span>
              </div>
              <div className="flex justify-center gap-3">
                <Users />
                <span className="text-gray-500">{course.totalStudents} students</span>
              </div>
              <div className="flex justify-center gap-3">
                <User />
                <span className="text-gray-500">Created By : {course.instructor.name}</span>
              </div>
            </div>
            <div className="contentInfo justify-center lg:justify-self-start  flex gap-8">
              <div className="flex gap-2 text-center flex-col lg:flex-row justify-center">
                <Clock className="mx-auto" />
                <span>{course.totalHours} hours</span>
              </div>
              <div className="flex gap-2 text-center flex-col lg:flex-row justify-center">
                <TvMinimalPlay className="mx-auto" />
                <span>{course.totalLessons} lessons</span>
              </div>
              <div className="flex gap-2 text-center flex-col lg:flex-row justify-centers">
                <BookOpen className="mx-auto" />
                <span>{course.level}</span>
              </div>
            </div>
            {/* end left-content */}
          </div>
          {/* start smallCard */}
          <SmallCardDetails />
          {/* end smallCard */}
        </div>
        {/* end card */}
      </div>
      <TabsInCourseDetails />
    </>
  );
}

export default CourseDetails;
