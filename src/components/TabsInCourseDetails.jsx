import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import instructorImage from "../../public/instructor-removebg-preview.png";

import {
  BookOpen,
  Dot,
  Play,
  SquarePlay,
  Star,
  User,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Progress } from "./ui/progress";

function TabsInCourseDetails() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState([]);

  function handleExpandAll() {
    if (isExpanded) {
      setExpandedSections([]);
    } else {
      setExpandedSections(["section-1", "section-2"]);
    }

    setIsExpanded((prev) => !prev);
  }

  return (
    <div className="container mt-10">
      <Tabs defaultValue="content" className=" ">
        <TabsList className="mb-3 grid mx-auto lg:mx-0 grid-cols-1 sm:grid-cols-4">
          <TabsTrigger
            className="text-lg p-2 w-[350px] sm:w-full"
            value="content"
          >
            Course Content
          </TabsTrigger>
          <TabsTrigger
            className="text-lg p-2 w-[350px] sm:w-full"
            value="description"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            className="text-lg p-2 w-[350px] sm:w-full"
            value="reviews"
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            className="text-lg p-2 w-[350px] sm:w-full"
            value="instructor"
          >
            Instructor
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <div className="bg-gray-100 p-5 rounded-2xl">
            {/* start header */}
            <h3 className="text-2xl font-bold">Course Content</h3>
            <div className="flex gap-3 items-center justify-between">
              <div className="flex">
                <span>412 lessons</span>
                <span className="flex gap-1">
                  {" "}
                  <Dot></Dot>65 hours
                </span>
              </div>
              <Button
                onClick={handleExpandAll}
                className="bg-mainColor hover:bg-white hover:text-black hover:border-gray-100 hover:border"
              >
                {isExpanded ? "Collapse All" : "Expand All"}
              </Button>
            </div>
            <hr className="my-5" />
            {/* end header */}
            {/* start content */}
            <Accordion
              type="multiple"
              value={expandedSections}
              onValueChange={setExpandedSections}
            >
              <AccordionItem
                data-state={isExpanded ? "open" : "closed"}
                value="section-1"
              >
                <AccordionTrigger className="text-lg">
                  Section 1: Getting Started
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {/* lesson */}
                    <li className="flex gap-2 items-center justify-between mb-4">
                      <div className="flex gap-2 items-center">
                        <SquarePlay className="text-mainColor" />
                        <span>introduction to the course</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span>5:35</span>
                        <Play className="size-4" />
                      </div>
                    </li>
                    {/* lesson */}
                    {/* lesson */}
                    <li className="flex gap-2 items-center justify-between mb-4">
                      <div className="flex gap-2 items-center">
                        <SquarePlay className="text-mainColor" />
                        <span>introduction to the course</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span>5:35</span>
                        <Play className="size-4" />
                      </div>
                    </li>
                    {/* lesson */}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="section-2"
                data-state={isExpanded ? "open" : "closed"}
              >
                <AccordionTrigger className="text-lg">
                  Section 1: Getting Started
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {/* lesson */}
                    <li className="flex gap-2 items-center justify-between mb-4">
                      <div className="flex gap-2 items-center">
                        <SquarePlay className="text-mainColor" />
                        <span>introduction to the course</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span>5:35</span>
                        <Play className="size-4" />
                      </div>
                    </li>
                    {/* lesson */}
                    {/* lesson */}
                    <li className="flex gap-2 items-center justify-between mb-4">
                      <div className="flex gap-2 items-center">
                        <SquarePlay className="text-mainColor" />
                        <span>introduction to the course</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span>5:35</span>
                        <Play className="size-4" />
                      </div>
                    </li>
                    {/* lesson */}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* end content */}
          </div>
        </TabsContent>
        <TabsContent value="description">
          <div>
            <h4 className="text-2xl font-bold my-6">About This Course</h4>
            <p>
              This comprehensive course is designed to take you from beginner to
              professional web developer. You'll learn all the tools and
              technologies needed to build full-stack web applications.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-bold my-6">What you'll learn</h4>
            <ul className="list-disc ml-10">
              <li>
                Build responsive, accessible, and beautiful web applications
              </li>
              <li>Master modern JavaScript frameworks like React</li>
              <li>Create backend APIs with Node.js and Express</li>
              <li>Implement authentication and authorization</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-bold my-6">Requirements</h4>
            <ul className="list-disc ml-10">
              <li>A computer (Windows, Mac, or Linux)</li>
              <li>No programming experience needed - beginner friendly!</li>
              <li>All tools and software used in this course are free</li>
              <li>A stable internet connection for video streaming</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <h3 className="font-bold text-2xl  my-5">Student Reviews</h3>
          <div className="flex gap-15 flex-wrap items-center mb-5">
            {/* start first part */}
            <div className="text-center mx-auto md:mx-0">
              <span className="text-mainColor font-bold text-5xl">4.8</span>
              <div className="rating flex mt-5">
                <Star className="text-orange-200 fill-amber-300" />
                <Star className="text-orange-200 fill-amber-300" />
                <Star className="text-orange-200 fill-amber-300" />
                <Star className="text-orange-200 fill-amber-300" />
                <Star className="text-orange-200 fill-amber-300" />
              </div>
              <span className="text-gray-500 ">12,547 ratings</span>
            </div>
            {/* end first part */}
            {/* start details rating */}
            <div className="mx-auto md:mx-0">
              {/*  rateing line */}
              <div className="flex gap-3 items-center ">
                <div className="flex gap-1">
                  <span>5</span>
                  <Star className="fill-amber-300 text-orange-200"></Star>
                </div>
                <Progress value={35} className="w-50 my-3" />
                <span>78%</span>
              </div>
              {/*  rateing line */}
              {/*  rateing line */}
              <div className="flex gap-3 items-center ">
                <div className="flex gap-1">
                  <span>5</span>
                  <Star className="fill-amber-300 text-orange-200"></Star>
                </div>
                <Progress value={35} className="w-50 my-3" />
                <span>78%</span>
              </div>
              {/*  rateing line */}
              {/*  rateing line */}
              <div className="flex gap-3 items-center ">
                <div className="flex gap-1">
                  <span>5</span>
                  <Star className="fill-amber-300 text-orange-200"></Star>
                </div>
                <Progress value={35} className="w-50 my-3" />
                <span>78%</span>
              </div>
              {/*  rateing line */}
              {/*  rateing line */}
              <div className="flex gap-3 items-center ">
                <div className="flex gap-1">
                  <span>5</span>
                  <Star className="fill-amber-300 text-orange-200"></Star>
                </div>
                <Progress value={35} className="w-50 my-3" />
                <span>78%</span>
              </div>
              {/*  rateing line */}
              {/*  rateing line */}
              <div className="flex gap-3 items-center ">
                <div className="flex gap-1">
                  <span>5</span>
                  <Star className="fill-amber-300 text-orange-200"></Star>
                </div>
                <Progress value={35} className="w-50 my-3" />
                <span>78%</span>
              </div>
              {/*  rateing line */}
            </div>
            {/* end details rating */}
          </div>
          {/* start reviews */}
          <div className="flex gap-5">
            <img src={instructorImage} alt="user photo" className="size-12" />
            {/* start review comment */}
            <div>
              <h5>John Doe</h5>
              <div className="flex gap-2 items-center">
                <div className="rating flex">
                  <Star className="text-orange-200 size-4 fill-amber-300" />
                  <Star className="text-orange-200 size-4 fill-amber-300" />
                  <Star className="text-orange-200 size-4 fill-amber-300" />
                  <Star className="text-orange-200 size-4 fill-amber-300" />
                  <Star className="text-orange-200 size-4 fill-amber-300" />
                </div>
                <span className="text-[12px]">2 weeks ago</span>
              </div>
              <p className="text-lg mt-3 ">
                This course exceeded my expectations! The instructor explains
                complex concepts in a way that's easy to understand. I've
                already built my first project after just a few sections.
              </p>
            </div>
            {/* end review comment */}
          </div>
          <hr className="my-5" />
          {/* end reviews */}
        </TabsContent>
        <TabsContent value="instructor">
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
              <h3 className="text-2xl font-bold mx-auto lg:mx-0 w-fit">
                Jane Doe
              </h3>
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
                Teaching web development for over 10 years with experience at
                top tech companies.
              </p>
              <Button className="mt-5 block mx-auto lg:mx-0 bg-mainColor hover:bg-white hover:text-black hover:border-1">
                View Full Profile
              </Button>
            </div>
            {/* start info */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TabsInCourseDetails;
