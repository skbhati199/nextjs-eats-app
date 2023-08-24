"use client";

import { cn } from "@/lib/utils";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import SidebarItem from "./restaurant-sidebar-item";
import { Restaurant } from "@prisma/client";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export interface SubMenu {
  label: string;
  href: string;
}

export interface SidebarItemProps {
  title: string;
  subMenu?: SubMenu[];
}

const staticRoutes: SidebarItemProps[] = [
  {
    title: "All Resturant",
    subMenu: [
      {
        label: "All",
        href: "/dashboard/projects",
      },
    ],
  },
  {
    title: "Resturants",
    subMenu: [],
  },
  {
    title: "Account",
    subMenu: [
      {
        label: "Preferences",
        href: "/dashboard/account/me",
      },
      {
        label: "Access Tokens",
        href: "/dashboard/account/tokens",
      },
    ],
  },
  {
    title: "Documentation",
    subMenu: [
      {
        label: "Guides",
        href: "/docs",
      },
      {
        label: "API",
        href: "/docs/guide/api",
      },
    ],
  },
];


export interface ResturantProps {
  data?: Restaurant[];
}

const ResturantSidebar = ({ data }: ResturantProps) => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  const [currentItem, setCurrentItem] = useState("Dashboard");
  const [routes, setRoutes] = useState<SidebarItemProps[]>([]);
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
    const updatedRoutes = staticRoutes.map((route) => {
      if (route.title === "Resturants") {
        return {
          ...route,
          subMenu: [
            ...(route.subMenu || []),
            ...(data?.map((value) => {
              return {
                href: `/dashboard/${value.id}`,
                label: value.name,
              };
            }) || []),
          ],
        };
      }
      return route;
    });
    setRoutes(updatedRoutes);
  }, [data, mounted, setMounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-2 py-2 flex flex-col h-full dark:bg-[#111827] text-white dark:text-[#111827] bg-white">
      <div className="px-2 py-2 flex-1">
        <Link
          href={`/dashboard/safasfaf}`}
          className="flex items-center pl-3 mb-14"
        >
          <h1
            className={cn(
              "text-xl font-bold dark:text-white text-zinc-700",
              montserrat.className
            )}
          >
            {currentItem}
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <SidebarItem
              key={route.title}
              title={route.title}
              subMenu={route.subMenu}
            />
          ))}
        </div>
      </div>
      <div className="flex">
        <Button className="w-full mx-4" variant={"secondary"}>
          <SignOutButton />
        </Button>
      </div>
    </div>
  );
};

export default ResturantSidebar;
