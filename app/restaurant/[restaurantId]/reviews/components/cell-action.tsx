"use client";

import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash, ViewIcon } from "lucide-react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { ReviewColumn } from "./columns";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useReviewModal } from "@/hooks/use-review-modal";

interface CellActionProps {
  data: ReviewColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  
  const updateReviewModel = useReviewModal();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname()

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/review/${data.id}`);
      toast({
        title: "Successfully deleted Review item",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open review</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              console.log(data.id)
              updateReviewModel.setReview(data.id);
              updateReviewModel.setRestaurantId(data.restaurantId);
              updateReviewModel.onOpen();
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};