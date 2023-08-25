"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import CuisineForm from "./cuisine-form";
import { useCuisineModal } from "@/hooks/use-cuisine-modal";



const CuisineModal = () => {
  const modal = useCuisineModal();

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create a Cuisine</DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium overflow-y-auto">
              <CuisineForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CuisineModal;
