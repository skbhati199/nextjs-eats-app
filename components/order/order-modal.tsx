"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import MenuForm from "./order-form";
import { useMenuModal } from "@/hooks/use-menu-modal";


const MenuModal = () => {
  const modal = useMenuModal();

  const onOpenChange = (b:Boolean) => {
    modal.setRestaurantId("")
    modal.onClose()
  }
  return (
    <Dialog open={modal.isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create a Menu</DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium overflow-y-auto">
              <MenuForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MenuModal;
