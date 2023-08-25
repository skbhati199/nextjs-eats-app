import { ResturantModel } from "@/types/types";
import { create } from "zustand";

const intialData: ResturantModel = {
  id: "",
  name: "",
  address: "",
  cuisineId: "",
  ownerId: "",
}

interface useModalStore {
  isOpen: boolean;
  restaurant: ResturantModel;
  setRestaurant: (restaurant: ResturantModel) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useModal = create<useModalStore>((set) => ({
  isOpen: false,
  restaurant: intialData,
  setRestaurant: (restaurant) => set({ restaurant }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
