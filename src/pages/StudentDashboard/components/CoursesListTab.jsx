import CourseCardInTab from "./CourseCardInTab";

function CoursesListTab() {
  return (
    <div className="border-2 border-gray-100 rounded-lg p-5">
      <div className="mb-5">
        <h3 className="text-2xl font-bold">All Enrolled Courses</h3>
        <p className="text-gray-500">You are enrolled in 3 courses</p>
      </div>
      {/* card */}
      <CourseCardInTab></CourseCardInTab>
      <CourseCardInTab></CourseCardInTab>
      <CourseCardInTab></CourseCardInTab>
      {/* card */}
    </div>
  );
}

export default CoursesListTab;
