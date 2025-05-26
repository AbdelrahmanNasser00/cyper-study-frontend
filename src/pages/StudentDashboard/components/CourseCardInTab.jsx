import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TvMinimalPlay } from "lucide-react";

function CourseCardInTab({ course }) {
  const instructorName =
    typeof course.instructor === "object"
      ? `${course.instructor.firstname} ${course.instructor.lastname}`
      : course.instructor;

  return (
    <div className="flex items-center gap-5 p-5 border-2 border-gray-100 rounded-2xl mb-5 flex-col md:flex-row">
      <img
        src={course.image || "/default-course.jpg"}
        className="w-48 h-fit rounded-lg"
        alt="Course image"
      />
      <div className="grow">
        {/* title and instructor */}
        <div>
          <h5 className="text-lg font-semibold">{course.title}</h5>
          <p className="text-gray-500">By {instructorName}</p>
        </div>
        {/* title and instructor */}
        {/* progress */}
        <div>
          <div className="flex justify-between -mb-2">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="w-full my-3" />
        </div>
        {/* progress */}
      </div>
      <Button className="bg-mainColor border-2 border-gray-50 hover:border-gray-300 hover:bg-white hover:border-2  hover:text-black  ">
        <TvMinimalPlay />
        Continue
      </Button>
    </div>
  );
}

export default CourseCardInTab;
