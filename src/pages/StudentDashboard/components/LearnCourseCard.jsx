import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";
import { Link } from "react-router-dom";

function LearnCourseCard({ course }) {
  const instructorName =
    typeof course.instructor === "object"
      ? `${course.instructor.firstname} ${course.instructor.lastname}`
      : course.instructor;

  return (
    <div className="border-2 border-gray-100 shadow-lg rounded-2xl transition hover:-translate-y-1">
      <div className="w-full h-64 rounded-t-2xl overflow-hidden relative">
        <img
          className="w-full h-full object-fill"
          src={course.thumbnail || "/default-course.jpg"}
          alt="course image"
        />
      </div>
      <div className="p-6">
        <div className="mb-3">
          <h4 className="text-lg font-semibold">{course.title}</h4>
          <span className="text-gray-500">By {instructorName}</span>
        </div>
        {/* progress */}
        <div className="mb-10">
          <div className="flex justify-between -mb-2">
            <span className="font-semibold">Progress</span>
            <span className="font-semibold">
              {course.Enrollments?.[0].progress}%
            </span>
          </div>
          <Progress
            value={course.Enrollments?.[0].progress}
            className="w-full my-3"
          />
          <div className="-mt-2">
            {course.completedLessons} of {course.totalLessons} lessons completed
          </div>
        </div>
        {/* progress */}
        <Link to={`/courses/${course.id}/lesson`}>
          <Button className="w-full bg-mainColor hover:bg-white hover:text-black hover:border-2 hover:border-gray-100">
            <CirclePlay />
            <span>Continue Learning</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LearnCourseCard;
