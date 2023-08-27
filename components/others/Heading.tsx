import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  title: string;
  description: string;
  icon: any;
  iconColor: string;
  bgColor: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <div className="px-2 lg:px-1 flex items-center gap-x-2 ">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        <Icon className={cn("w-5 h-5", iconColor)} />
      </div>
      <div>
        <h2 className="text-xl text-muted-foreground font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Heading;