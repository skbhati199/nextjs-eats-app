"use client";
import ProjectMobileSidebar from "./restaurant-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ModeToggle } from "@/components/theme/mode-toggle";

const ProjectNavbar = () => {
  const pathName = usePathname();
  const [currentTab, setCurrentTab] = useState("");
  useEffect(() => {
    const segments = pathName.split("/");
    const lastSegment = segments[segments.length - 1];
    setCurrentTab(capitalizeFirstLetter(lastSegment))
  }, [pathName]);
  return (
    <div
      className="flex flex-row  z-50  justify-between 
    items-center py-2 px-2 border-b dark:border-gray-700 border-gray-400
    bg-secondary h-16"
    >
      <div className="flex items-center">
        <ProjectMobileSidebar />
        <div className="hidden lg:flex">
          <h4 className="sm font-semibold pr-2">chargingev.app</h4>
          <div className="text-zinc-700">/</div>
          <div className="pl-2 text-gray-400">{currentTab}</div>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant={"link"} size={"sm"}>
          Help
        </Button>
        <Button variant={"link"} size={"sm"}>
          Feedback
        </Button>
        <Button variant={"secondary"} size={"icon"}>
          <BellIcon size={16} />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default ProjectNavbar;
