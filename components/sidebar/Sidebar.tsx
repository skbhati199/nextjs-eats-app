"use client";

import { cn } from "@/lib/utils";
import {
  Boxes,
  Building2,
  Cable,
  FolderOpenDot,
  ImageIcon,
  LayoutDashboard,
  LayoutDashboardIcon,
  LightbulbIcon,
  LocateIcon,
  LucideBluetoothConnected,
  LucidePointer,
  MessageSquare,
  PlugIcon,
  Settings,
  ViewIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import AppLogoText from "../logo/app-logo";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const Sidebar = ({ restaurantId }: { restaurantId: string }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboardIcon,
      href: `/restaurant/${restaurantId}`,
      color: "text-yellow-500",
    },
    {
      label: "Resturant Details",
      icon: ViewIcon,
      href: `/restaurant/${restaurantId}/view`,
      color: "text-pink-500",
    },
    {
      label: "Menus",
      icon: FolderOpenDot,
      href: `/restaurant/${restaurantId}/menus`,
      color: "text-green-500",
    },
    {
      label: "Orders",
      icon: FolderOpenDot,
      href: `/restaurant/${restaurantId}/orders`,
      color: "text-blue-500",
    },
    {
      label: "Order Tracking",
      icon: FolderOpenDot,
      href: `/restaurant/${restaurantId}/tracking`,
      color: "text-red-500",
    },
  ];

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="space-y-4 py-4 flex flex-col h-full 
    dark:bg-[#111827] 
    text-white 
    dark:text-[#111827] 
    bg-white"
    >
      <div className="px-2 py-2 flex-1">
        <Link
          href={`/dashboard/${restaurantId}`}
          className="flex flex-col items-center px-1 mb-8"
        >
          <AppLogoText className={"text-xl"} subClassName="text-2xl" />
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                `text-xs group flex p-2 w-full 
              justify-start font-medium 
              cursor-pointer 
              dark:hover:text-white 
              dark:hover:bg-white/10 
              hover:text-zinc-400
              hover:bg-slate-100
              rounded-lg transition`,
                pathname === route.href
                  ? "dark:text-white text-[#111827] bg-white/10"
                  : "dark:text-zinc-400 text-[#111827]"
              )}
            >
              <route.icon className={cn("h-4 w-4 mr-1", route.color)} />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex">
        <Button className="w-full mx-2" size={"sm"} variant={"secondary"}>
          <SignOutButton />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
