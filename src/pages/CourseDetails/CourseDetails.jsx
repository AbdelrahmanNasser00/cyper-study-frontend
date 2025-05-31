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
import { useParams } from "react-router-dom";
import {
  useGetCourseByIdQuery,
  useGetProgressQuery,
  useGetStudentEnrolledCourseByIdQuery,
} from "@/services/coursesApi";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSpinner from "@/components/common/loadingSpinner";
import { useSelector } from "react-redux";
import { selectIsStudent } from "@/store/Slices/authSlice";

// Default course data structure
const defaultCourse = {
  title: "Course Title",
  description: "No description available",
  price: 0,
  discountedPrice: 0,
  rating: 0,
  totalRatings: 0,
  totalStudents: 0,
  lastUpdated: new Date().toLocaleDateString(),
  totalHours: 0,
  totalLessons: 0,
  level: "Not Specified",
  category: "General",
  thumbnail: backgroundImg,
  instructor: {
    firstname: "Instructor",
    lastname: "Name",
    name: "Instructor Name",
  },
  isEnrolled: false,
  isWishlisted: false,
  lessons: [],
};

function CourseDetails() {
  const { id } = useParams();
  const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(id);
  const { data: enrollmentData } = useGetStudentEnrolledCourseByIdQuery(id);
  const { data: progress } = useGetProgressQuery(
    enrollmentData?.isEnrolled ? id : null
  );
  const isStudent = useSelector(selectIsStudent);

  console.log(progress);

  // Merge API data with defaults
  const course = {
    ...defaultCourse,
    ...courseData,
    ...(enrollmentData?.course || {}),
    isEnrolled: enrollmentData?.isEnrolled || false,
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="container mx-auto p-4 text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Error loading course details
          </h2>
          <p className="text-gray-600 mt-2">
            Please try again later or refresh the page
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{ backgroundImage: `url(${course.thumbnail || backgroundImg})` }}
        className="bg-cover bg-center min-h-dvh flex items-center justify-center relative">
        <div className="bg-black absolute size-full opacity-30"></div>
        {/* Course Card */}
        <div className="bg-white flex-wrap lg:flex-nowrap justify-center container relative top-5 rounded-2xl p-10 shadow-lg flex gap-10">
          {/* Left Content */}
          <div className="flex-1">
            <div className="label-date flex gap-2 flex-wrap">
              <Badge className="bg-amber-400 text-black">
                {course.category}
              </Badge>
              <Badge className="bg-mainColor">{course.level}</Badge>
              <span className="text-sm text-gray-600">
                Last updated: {course.lastUpdated}
              </span>
            </div>

            <div className="header-description mt-4">
              <h2 className="mb-5 text-4xl font-bold">{course.title}</h2>
              <p className="max-w-[800px] text-gray-700">
                {course.description}
              </p>
            </div>

            <div className="rate-users justify-center flex-col lg:justify-self-start lg:flex-row text-center flex my-7 gap-4">
              <div className="flex gap-2 items-center">
                <div className="rating flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`text-orange-200 ${
                        index < Math.floor(course.rating)
                          ? "fill-amber-300"
                          : ""
                      }`}
                    />
                  ))}
                </div>
                <span>{course.rating.toFixed(1)}</span>
                <span className="text-gray-500">
                  ({course.totalRatings} ratings)
                </span>
              </div>

              <div className="flex justify-center gap-3 items-center">
                <Users className="w-5 h-5" />
                <span className="text-gray-500">
                  {course.totalStudents.toLocaleString()} students
                </span>
              </div>

              <div className="flex justify-center gap-3 items-center">
                <User className="w-5 h-5" />
                <span className="text-gray-500">
                  Created By:{" "}
                  {`${course.instructor.firstname} ${course.instructor.lastname}`}
                </span>
              </div>
            </div>

            <div className="contentInfo justify-center lg:justify-self-start flex gap-8 flex-wrap">
              <div className="flex gap-2 items-center">
                <Clock className="w-5 h-5" />
                <span>{course.totalHours} hours</span>
              </div>

              <div className="flex gap-2 items-center">
                <TvMinimalPlay className="w-5 h-5" />
                <span>
                  {course.lessons?.length || course.totalLessons} lessons
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <BookOpen className="w-5 h-5" />
                <span>{course.level}</span>
              </div>
            </div>
          </div>

          {/* Right Side Card */}
          {isStudent && (
            <SmallCardDetails
              price={course.price}
              discountedPrice={course.discountedPrice}
              isEnrolled={course.isEnrolled}
              progress={progress}
              courseId={course.id}
            />
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <TabsInCourseDetails
        course={course}
        lessons={course.lessons || []}
        whatYouWillLearn={course.whatYouWillLearn || []}
        requirements={course.requirements || []}
      />
    </>
  );
}

export default CourseDetails;
