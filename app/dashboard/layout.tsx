import { ModalProvider } from "@/components/modals/modal-provider";
import React from "react";
import ResturantSidebar from "@/app/dashboard/components/restaurant-sidebar";
import ResturantNavbar from "@/app/dashboard/components/restaurant-navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const resturants = await prismadb.restaurant.findMany({
    where: {
      ownerId: userId,
    }
  });
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-44 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <ResturantSidebar data={resturants || []} />
      </div>

      <main className="md:pl-44 pb-4">
        <ModalProvider />

        <ResturantNavbar />
        {children}
      </main>
    </div>
  );
}
