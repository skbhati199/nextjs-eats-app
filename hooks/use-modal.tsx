import { Restaurant } from "@prisma/client";
import { create } from "zustand";

const intialData: Restaurant = {
  id: "",
  name: "",
  cuisine: "",
  ownerId: ""
}

interface useModalStore {
  isOpen: boolean;
  restaurant: Restaurant;
  setRestaurant: (restaurant: Restaurant) => void;
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
