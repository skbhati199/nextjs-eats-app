"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import ReviewForm from "./review-form";
import { useReviewModal } from "@/hooks/use-review-modal";


const ReviewModal = () => {
  const modal = useReviewModal();

  const onOpenChange = (b:Boolean) => {
    modal.setRestaurantId("")
    modal.onClose()
  }
  return (
    <Dialog open={modal.isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create a Review</DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium overflow-y-auto">
              <ReviewForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
