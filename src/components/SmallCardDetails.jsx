import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, FileVideo, Heart, Users } from "lucide-react";
import { useState } from "react";

function SmallCardDetails() {
  const [addWishlist, setAddWishlist] = useState(false);

  function handleWishlist() {
    setAddWishlist((prev) => !prev);
  }

  return (
    <div className="bg-gray-100 rounded-2xl p-5 w-80">
      <div className="progress flex flex-col">
        <h4 className="text-lg">Your progress</h4>
        <Progress value={35} className="w-full my-3" />
        <span className="w-fit self-end">35% complete</span>
      </div>
      <Button className="my-3 w-full  p-6 bg-mainColor hover:border hover:bg-white hover:text-black">
        Continue Learning
      </Button>
      <div
        className="flex gap-2 my-5 justify-center cursor-pointer"
        onClick={handleWishlist}
      >
        <Heart className={addWishlist ? "fill-red-400" : ""}></Heart>
        <span>{addWishlist ? "Remove from Whislist" : "add to Whislist"}</span>
      </div>
      <hr />
      <div className="mt-4">
        <h5 className="font-bold">This course includes:</h5>
        <p>
          <div className="flex mt-3 gap-2 items-center">
            <FileVideo className="text-mainColor" />
            <span>65 hours on-demand video</span>
          </div>
          <div className="flex my-3 gap-2 items-center">
            <BookOpen className="text-mainColor" />
            <span>Comprehensive learning resources</span>
          </div>
          <div className="flex  gap-2 items-center">
            <Users className="text-mainColor" />
            <span>Access to exclusive community</span>
          </div>
          <div className="flex my-3 gap-2 items-center">
            <Clock className="text-mainColor" />
            <span>Full lifetime access</span>
          </div>
        </p>
      </div>
    </div>
  );
}

export default SmallCardDetails;
