import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItemProps } from "./restaurant-sidebar";

const SidebarItem = ({ title, subMenu }: SidebarItemProps) => {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col justify-start items-start px-1 py-1">
      <h4 className="text-xs font-semibold dark:text-muted-foreground text-zinc-700">
        {title}
      </h4>
      {subMenu?.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            `text-sm group flex p-2 w-full 
                justify-start font-medium cursor-pointer 
                dark:hover:text-white dark:hover:bg-white/10 
                hover:text-white/10 hover:bg-white 
                rounded-lg transition`,
            pathname === route.href
              ? "dark:text-white text-[111827] bg-white/10"
              : "dark:text-zinc-400 text-[#111827]"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default SidebarItem;
