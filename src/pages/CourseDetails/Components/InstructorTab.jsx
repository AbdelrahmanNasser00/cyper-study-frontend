import { BookOpen, Star, Users } from "lucide-react";
import instructorImage from "/instructor-removebg-preview.png";
import { Button } from "@/components/ui/button";
function InstructorTab() {
  return (
    <div className="flex gap-10 flex-wrap lg:flex-nowrap">
      {/* start image */}
      <div className="w-32 h-32 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-mainColor flex-shrink-0">
        <img
          src={instructorImage}
          alt="instructor image"
          className="w-full h-full object-cover"
        />
      </div>
      {/* end image */}
      {/* start info */}
      <div className="mx-auto lg:mx-0">
        <h3 className="text-2xl font-bold mx-auto lg:mx-0 w-fit">Jane Doe</h3>
        <p className="mt-3 mx-auto lg:mx-0 w-fit">
          Senior Web Developer & Instructor
        </p>
        <div className="rate-users justify-center flex-col lg:justify-self-start lg:flex-row text-center flex my-4 gap-4">
          <div className="flex gap-2 mx-auto">
            <div className="rating flex ">
              <Star className="text-orange-200 fill-amber-300" />
            </div>
            <span>4.8</span>
            <span className="text-gray-500">(12,547 ratings)</span>
          </div>
          <div className="flex justify-center gap-3">
            <BookOpen />
            <span className="text-gray-500">15 Course</span>
          </div>
          <div className="flex justify-center gap-3">
            <Users />
            <span className="text-gray-500">54,239 students</span>
          </div>
        </div>
        <p className="text-center">
          Teaching web development for over 10 years with experience at top tech
          companies.
        </p>
        <Button className="mt-5 block mx-auto lg:mx-0 bg-mainColor hover:bg-white hover:text-black hover:border-1">
          View Full Profile
        </Button>
      </div>
      {/* start info */}
    </div>
  );
}

export default InstructorTab;
