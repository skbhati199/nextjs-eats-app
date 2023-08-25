"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { useModal } from "@/hooks/use-modal";
import ResturantForm from "./restaurant-form";



const ResturantModal = () => {
  const modal = useModal();

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Create a Resturant</DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium overflow-y-auto">
              <ResturantForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResturantModal;
