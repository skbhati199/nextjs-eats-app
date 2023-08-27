// import { ReviewModel } from "@/types/types";
import { create } from "zustand";

interface useReviewModalStore {
  isOpen: boolean;
  restaurantId:string;
  setRestaurantId: (restaurantId:string) => void;
  reviewId:string;
  setReview: (reviewId:string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useReviewModal = create<useReviewModalStore>((set) => ({
  isOpen: false,
  restaurantId:"",
  setRestaurantId: (restaurantId:string) => set({ restaurantId }),
  reviewId:"",
  setReview: (reviewId:string) => set({ reviewId }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
