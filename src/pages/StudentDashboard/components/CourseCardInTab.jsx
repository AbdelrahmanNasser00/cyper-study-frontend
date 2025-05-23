import { Progress } from "@/components/ui/progress";
import CourseImg from "/Course.jpg";
import { Button } from "@/components/ui/button";
import { TvMinimalPlay } from "lucide-react";

function CourseCardInTab() {
  return (
    <div className="flex items-center gap-5 p-5 border-2 border-gray-100 rounded-2xl mb-5 flex-col md:flex-row">
      <img
        src={CourseImg}
        className="w-48 h-fit rounded-lg"
        alt="Course image"
      />
      <div className="grow">
        {/* title and instractor */}
        <div>
          <h5 className="text-lg font-semibold">All Enrolled Courses</h5>
          <p className="text-gray-500">By Jane Doe</p>
        </div>
        {/* title and instractor */}
        {/* progress */}
        <div>
          <div className="flex justify-between -mb-2">
            <span>Progress</span>
            <span>75%</span>
          </div>
          <Progress value={35} className="w-full my-3" />
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
