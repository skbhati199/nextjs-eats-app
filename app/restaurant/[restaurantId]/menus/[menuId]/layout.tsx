import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function MenuLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { restaurantId: string; menuId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const restaurant = await prismadb.restaurant.findUnique({
    where: {
      id: params.restaurantId,
    },
  });

  if (!restaurant) {
    redirect("/dashboard");
  }
  const menuId = await prismadb.menuItem.findUnique({
    where: {
      id: params.menuId,
    },
  });

  if (!menuId) {
    redirect(`/restaurant/${restaurant.id}`);
  }

  return <div> <div>{restaurant.name}</div> <div>{menuId.name}</div> {children}</div>;
}
