import { ModalProvider } from "@/components/modals/modal-provider";
import Navbar from "@/components/nav/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

export default function ResturantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { restaurantId: string };
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-44 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar restaurantId={params.restaurantId} />
      </div>

      <main className="md:pl-44 pb-10">
        <Navbar restaurantId={params.restaurantId} />

        <main className="mt-8 mx-4">
          <ModalProvider />
          {children}
        </main>
      </main>
    </div>
  );
}
