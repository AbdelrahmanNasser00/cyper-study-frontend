import { Badge } from "@/components/ui/badge";
import backgroundImg from "../../public/Course.jpg";

function CourseDetails() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${backgroundImg})` }}
        className="bg-cover bg-center h-dvh flex items-center justify-center"
      >
        {/* start card */}
        <div className="bg-white container h-[90%] relative top-5 rounded-2xl p-10 shadow-lg">
          {/* start left-content */}
          <div className="label-date flex gap-2">
            <Badge>Development</Badge>
            <Badge>All Levels</Badge>
            <span>Last updated: March 2023</span>
          </div>
          {/* end left-content */}
          {/* start smallCard */}
          {/* end smallCard */}
        </div>
        {/* end card */}
      </div>
    </>
  );
}

export default CourseDetails;
