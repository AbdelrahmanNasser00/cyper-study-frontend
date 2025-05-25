import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import instructorImage from "/instructor-removebg-preview.png";

function ReviewTab() {
  return (
    <>
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
            complex concepts in a way that's easy to understand. I've already
            built my first project after just a few sections.
          </p>
        </div>
        {/* end review comment */}
      </div>
      <hr className="my-5" />
      {/* end reviews */}
    </>
  );
}

export default ReviewTab;
