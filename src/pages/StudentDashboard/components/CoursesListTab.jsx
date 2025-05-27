import { useGetStudentEnrolledCoursesQuery } from "@/services/coursesApi";
import CourseCardInTab from "./CourseCardInTab";

function CoursesListTab() {
  const { data: enrolledCourses = [], isLoading } =
    useGetStudentEnrolledCoursesQuery();

  return (
    <div className="border-2 border-gray-100 rounded-lg p-5">
      <div className="mb-5">
        <h3 className="text-2xl font-bold">All Enrolled Courses</h3>
        <p className="text-gray-500">
          You are enrolled in {enrolledCourses.length} courses
        </p>
      </div>
      {/* card */}
      {isLoading
        ? "Loading..."
        : enrolledCourses.map((course) => (
            <CourseCardInTab key={course.id} course={course} />
          ))}
      {/* card */}
    </div>
  );
}

export default CoursesListTab;
