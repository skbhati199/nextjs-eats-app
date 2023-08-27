// import { MenuModel } from "@/types/types";
import { create } from "zustand";

interface useMenuModalStore {
  isOpen: boolean;
  restaurantId:string;
  setRestaurantId: (restaurantId:string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useMenuModal = create<useMenuModalStore>((set) => ({
  isOpen: false,
  restaurantId:"",
  setRestaurantId: (restaurantId:string) => set({ restaurantId }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
