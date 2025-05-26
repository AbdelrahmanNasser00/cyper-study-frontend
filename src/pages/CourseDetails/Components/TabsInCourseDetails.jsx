import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BookOpen, Star, User, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import ContentTab from "./ContentTab";
import DescriptionTab from "./DescriptionTab";
import ReviewTab from "./ReviewTab";
import InstructorTab from "./InstructorTab";

function TabsInCourseDetails({ course, lessons }) {
  // console.log("course:", JSON.stringify(course, null, 2));
  // console.log("lessons:", JSON.stringify(lessons, null, 2));
  return (
    <div className="container mt-10">
      <Tabs defaultValue="content" className=" ">
        <TabsList className="mb-3 grid mx-auto lg:mx-0 grid-cols-1 sm:grid-cols-4">
          <TabsTrigger
            className="text-lg p-2 w-[350px] sm:w-full"
            value="content">
            Course Content
          </TabsTrigger>
          <TabsTrigger
            className="text-lg p-2 w-[350px] sm:w-full"
            value="description">
            Description
          </TabsTrigger>
          <TabsTrigger
            className="text-lg p-2 w-[350px] sm:w-full"
            value="reviews">
            Reviews
          </TabsTrigger>
          <TabsTrigger
            className="text-lg p-2 w-[350px] sm:w-full"
            value="instructor">
            Instructor
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <ContentTab lessons={lessons} />
        </TabsContent>
        <TabsContent value="description">
          <DescriptionTab course={course} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewTab course={course} />
        </TabsContent>
        <TabsContent value="instructor">
          <InstructorTab course={course} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TabsInCourseDetails;
