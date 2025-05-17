import { Progress } from "@/components/ui/progress";
import courseImg from "../../../../public/courseDashboard.avif";
import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";

function LearnCourseCard() {
  return (
    <div className="border-2 border-gray-100 shadow-lg rounded-2xl transition hover:-translate-y-1">
      <div>
        <img
          className="w-full h-full object-fill"
          src={courseImg}
          alt="course image"
        />
      </div>
      <div className="p-6">
        <div className="mb-3">
          <h4 className="text-lg font-semibold">
            Complete Web Development Bootcamp
          </h4>
          <span className="text-gray-500">By Jane Doe</span>
        </div>
        {/* progress */}
        <div className="mb-10">
          <div className="flex justify-between -mb-2">
            <span className="font-semibold">progress</span>
            <span className="font-semibold">80%</span>
          </div>
          <Progress value={80} className="w-full my-3" />
          <div className="-mt-2">114 of 152 lessons completed</div>
        </div>
        {/* progress */}
        <Button className="w-full bg-mainColor hover:bg-white hover:text-black hover:border-2 hover:border-gray-100">
          <CirclePlay />
          <span>Continue Learning</span>
        </Button>
      </div>
    </div>
  );
}

export default LearnCourseCard;
