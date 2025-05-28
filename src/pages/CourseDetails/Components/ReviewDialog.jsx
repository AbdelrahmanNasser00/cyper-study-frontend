import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function ReviewDialog({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    onSubmit({ rating, comment });
    setIsOpen(false);
    setComment("");
    setRating(5);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-mainColor text-white">Add Review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Your Review</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="rating flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer size-6 ${
                  star <= rating
                    ? "fill-amber-300 text-amber-300"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleSubmit} className="bg-mainColor text-white">
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
