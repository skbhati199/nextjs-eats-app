import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ResturantSwitcher from "@/components/resturants/ResturantSwitcher";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import { ModeToggle } from "@/components/theme/mode-toggle";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = async ({ restaurantId }: { restaurantId: string }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const restaurants = await prismadb.restaurant.findMany({
    where: {
      ownerId: userId,
    },
  });
  return (
    <div
      className="flex flex-row  z-50  justify-between 
  items-center py-1 px-2 border-b dark:border-gray-700 border-gray-300
  bg-secondary h-16"
    >
      <div className="flex items-center">
        <MobileSidebar restaurantId={restaurantId} />
        <ResturantSwitcher items={restaurants} />
       
      </div>
      <div className="flex items-center gap-x-4">
        <ModeToggle />
        <UserButton signInUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
