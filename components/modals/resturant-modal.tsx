"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { useModal } from "@/hooks/use-modal";



const ResturantModal = () => {
  const modal = useModal();

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium overflow-y-auto">
              
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResturantModal;
