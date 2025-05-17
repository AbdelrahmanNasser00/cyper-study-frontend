import { Medal } from "lucide-react";
import CourseImg from "../../../../public/Course.jpg";

import { Button } from "@/components/ui/button";

function CertificateCard() {
  return (
    <div className=" border-2 border-gray-200 rounded-sm ">
      <div className="relative">
        <div className="absolute w-full bg-white/70 flex h-full items-center justify-center">
          <div>
            <div className="flex justify-center">
              <Medal className="text-mainColor" />
            </div>
            <span>UI/UX Design Masterclass</span>
            <p className="text-center">Certificate of Completion</p>
          </div>
        </div>
        <img src={CourseImg} alt="Course certificate image" />
      </div>
      <div className="flex justify-between p-5">
        <Button className="bg-mainColor border-2 border-gray-50 hover:border-gray-300 hover:bg-white hover:border-2  hover:text-black">
          View
        </Button>
        <Button className="bg-mainColor border-2 border-gray-50 hover:border-gray-300 hover:bg-white hover:border-2  hover:text-black  ">
          download
        </Button>
      </div>
    </div>
  );
}

export default CertificateCard;
