"use client";

import { Building2, Plus } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { OrderColumn, columns } from "./columns";
import Heading from "@/components/others/Heading";
import { useOrderModal } from "@/hooks/use-order-modal";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

interface OrdersClientProps {
  data: OrderColumn[];
  restaurantId: string;
}

export const OrdersClient: React.FC<OrdersClientProps> = ({
  data,
  restaurantId,
}) => {
  const params = useParams();
  const router = useRouter();
  const createModal = useOrderModal();

  const { userId } = useAuth();
  if (!userId) {
    redirect("/sign-in");
  }

  const fakeOrderCreate = async () => {
    try {
      console.log("Fake");
      const menuResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/getMenusByRestaurants`,
        {
          body: {
            restaurantId: restaurantId,
          },
        }
      );

      const menuResults = menuResponse.data;

      if (menuResults) {
        for (const menuItem of menuResults) {
          console.log(menuItem);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/orders`,
            {
              body: {
                userId,
                restaurantId,
                menuItemId: menuItem.id,
              },
            }
          );

          const results = await response.data;

          console.log("fake data", results);
        }
      } else {
        console.log("Not Creeated");
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex md:flex-row  flex-col items-center justify-between">
        <Heading
          description="List of Orders"
          icon={Building2}
          iconColor="text-red-500 dark:text-red-500"
          bgColor="bg-red-500/10"
          title={`Orders(${data?.length})`}
        />
        <Button
          onClick={() => fakeOrderCreate()}
          variant="default"
          className="items-center justify-center"
        >
          Create
          <Plus className="ml-2 w-4 h-4" />{" "}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="userName" columns={columns} data={data} />
    </>
  );
};
