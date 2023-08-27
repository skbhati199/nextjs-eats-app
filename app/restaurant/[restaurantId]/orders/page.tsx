import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import { OrdersClient } from "./components/client";

export default async function OrderPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const { userId, sessionId, getToken } = auth();
  console.log("user id ", userId);

  if (!userId) {
    redirect("/sign-in");
  }

  const menus = await prismadb.order.findMany({
    where: {
      restaurantId: params.restaurantId,
    },
    include: {
      restaurant: true,
      menuItem: true,
      Transaction: true,
      user: true,
    },
  });

  const formattedMenus: OrderColumn[] = menus.map((item) => ({
    id: item.id,
    paymentId: item.transactionId ?? "",
    menu: item?.menuItem?.name ?? "",
    status: item.orderStatus,
    userName: item.user.name,
    price: `$${item.menuItem?.price ?? 0}`,
    restaurantId: item.restaurant?.id ?? "",
    restaurant: item.restaurant?.name ?? "",
    createAt: format(item?.createAt ?? 0, "MMMM dd, yyyy"),
    updateAt: format(item?.updateAt ?? 0, "MMMM dd, yyyy"),
  }));

  console.log(formattedMenus);

  return (
    <div className="flex flex-col md:pt-2">
       <OrdersClient
          data={formattedMenus}
          restaurantId={params.restaurantId}
        />
    </div>
  );
}
