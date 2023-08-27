// import { OrderModel } from "@/types/types";
import { create } from "zustand";

interface useOrderModalStore {
  isOpen: boolean;
  restaurantId:string;
  setRestaurantId: (restaurantId:string) => void;
  orderId:string;
  setOrderId: (orderId:string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useOrderModal = create<useOrderModalStore>((set) => ({
  isOpen: false,
  restaurantId:"",
  setRestaurantId: (restaurantId:string) => set({ restaurantId }),
  orderId:"",
  setOrderId: (orderId:string) => set({ orderId }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
