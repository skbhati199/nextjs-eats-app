import { ModalProvider } from "@/components/modals/modal-provider";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
    <ModalProvider />
    {children}
    </div>;
}
