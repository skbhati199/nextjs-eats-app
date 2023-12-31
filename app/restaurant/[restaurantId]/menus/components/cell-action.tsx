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

import { MenuColumn } from "./columns";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

interface CellActionProps {
  data: MenuColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname()

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/menu/${data.id}`);
      toast({
        title: "Successfully deleted Menu item",
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

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Menu ID copied to clipboard.",
    });
  }

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
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            asChild
          >
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}${pathName}/${data.id}/view`}><ViewIcon className="mr-2 h-4 w-4" /> View</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.restaurantId}/menu/${data.id}/edit`)}
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