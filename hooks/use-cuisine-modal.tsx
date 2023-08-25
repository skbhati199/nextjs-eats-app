import { CuisineModel } from "@/types/types";
import { create } from "zustand";

const intialData: CuisineModel = {
  id: "",
  name: "",
}

interface useModalStore {
  isOpen: boolean;
  cuisine: CuisineModel;
  setCuisine: (cuisine: CuisineModel) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useCuisineModal = create<useModalStore>((set) => ({
  isOpen: false,
  cuisine: intialData,
  setCuisine: (cuisine) => set({ cuisine }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
