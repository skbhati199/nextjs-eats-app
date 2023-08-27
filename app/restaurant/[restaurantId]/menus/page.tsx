import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { MenuColumn } from "./components/columns";
import { MenusClient } from "./components/client";

export default async function MenuPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const { userId, sessionId, getToken } = auth();
  console.log("user id ", userId);

  if (!userId) {
    redirect("/sign-in");
  }

  const menus = await prismadb.menuItem.findMany({
    where: {
      restaurantId: params.restaurantId,
    },
    include: {
      restaurant: true,
    },
  });

  const formattedMenus: MenuColumn[] = menus.map((item) => ({
    id: item.id,
    name: item.name ?? "",
    price: item.price ?? 0,
    restaurant: item.restaurant.name ?? "",
  }));

  console.log(formattedMenus);

  return (
    <div className="flex flex-col md:pt-2">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MenusClient data={formattedMenus} restaurantId={params.restaurantId} />
      </div>
    </div>
  );
}
