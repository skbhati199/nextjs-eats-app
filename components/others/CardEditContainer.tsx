import React from "react";
import { Button } from "../ui/button";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function CardEditContainer({ title, children }: CardProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow max-w-full">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
      </div>
      <div className="p-6 pt-0">{children}</div>
    </div>
  );
}
