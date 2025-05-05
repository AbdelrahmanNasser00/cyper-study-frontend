import { Badge } from "@/components/ui/badge";
import backgroundImg from "../../public/Course.jpg";
import {
  BookOpen,
  Clock,
  Star,
  TvMinimalPlay,
  User,
  Users,
} from "lucide-react";
import SmallCardDetails from "@/components/SmallCardDetails";
import TabsInCourseDetails from "@/components/TabsInCourseDetails";

function CourseDetails() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${backgroundImg})` }}
        className="bg-cover bg-center min-h-dvh flex items-center justify-center relative"
      >
        <div className="bg-black absolute size-full opacity-30"></div>
        {/* start card */}
        <div className="bg-white flex-wrap lg:flex-nowrap justify-center container relative top-5 rounded-2xl p-10 shadow-lg flex gap-10">
          <div>
            {" "}
            {/* start left-content */}
            <div className="label-date flex gap-2">
              <Badge className="bg-amber-400 text-black">Development</Badge>
              <Badge className="bg-mainColor">All Levels</Badge>
              <span>Last updated: March 2023</span>
            </div>
            <div className="header-description">
              <h2 className="mb-5 mt-3 text-4xl font-bold">
                Complete Web Development Bootcamp
              </h2>
              <p className="max-w-[800px]">
                Learn web development from scratch with HTML, CSS, JavaScript,
                React, Node.js and more. This comprehensive course takes you
                from beginner to advanced.
              </p>
            </div>
            <div className="rate-users justify-center flex-col lg:justify-self-start lg:flex-row text-center flex my-7 gap-4">
              <div className="flex gap-2">
                <div className="rating flex ">
                  <Star className="text-orange-200 fill-amber-300" />
                  <Star className="text-orange-200 fill-amber-300" />
                  <Star className="text-orange-200 fill-amber-300" />
                  <Star className="text-orange-200 fill-amber-300" />
                  <Star className="text-orange-200 fill-amber-300" />
                </div>
                <span>4.8</span>
                <span className="text-gray-500">(12,547 ratings)</span>
              </div>
              <div className="flex justify-center gap-3">
                <Users />
                <span className="text-gray-500">54,239 students</span>
              </div>
              <div className="flex justify-center gap-3">
                <User />
                <span className="text-gray-500">Created By : Jane Doe</span>
              </div>
            </div>
            <div className="contentInfo justify-center lg:justify-self-start  flex gap-8">
              <div className="flex gap-2 text-center flex-col lg:flex-row justify-center">
                <Clock className="mx-auto" />
                <span>65 hours</span>
              </div>
              <div className="flex gap-2 text-center flex-col lg:flex-row justify-center">
                <TvMinimalPlay className="mx-auto" />
                <span>412 lessons</span>
              </div>
              <div className="flex gap-2 text-center flex-col lg:flex-row justify-centers">
                <BookOpen className="mx-auto" />
                <span>All Levels</span>
              </div>
            </div>
            {/* end left-content */}
          </div>
          {/* start smallCard */}
          <SmallCardDetails></SmallCardDetails>
          {/* end smallCard */}
        </div>
        {/* end card */}
      </div>
      <TabsInCourseDetails></TabsInCourseDetails>
    </>
  );
}

export default CourseDetails;
