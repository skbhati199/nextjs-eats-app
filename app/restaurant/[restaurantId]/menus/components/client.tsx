"use client";

import { Building2, Plus, PlusCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { MenuColumn, columns } from "./columns";
import Heading from "@/components/others/Heading";
import { useMenuModal } from "@/hooks/use-menu-modal";

interface MenusClientProps {
  data: MenuColumn[];
  restaurantId: string;
}

export const MenusClient: React.FC<MenusClientProps> = ({
  data,
  restaurantId,
}) => {
  const params = useParams();
  const router = useRouter();
  const createModal = useMenuModal();

  return (
    <>
      <div className="flex md:flex-row  flex-col items-center justify-between">
        <Heading
          description="List of Menus"
          icon={Building2}
          iconColor="text-red-500 dark:text-red-500"
          bgColor="bg-red-500/10"
          title={`Menus(${data?.length})`}
        />
        <Button
          onClick={() => {
            createModal.setRestaurantId(restaurantId);
            createModal.onOpen();
          }}
          variant="default"
          className="items-center justify-center"
        >
          Create
          <Plus className="ml-2 w-4 h-4" />{" "}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
