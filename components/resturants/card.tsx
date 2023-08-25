import React from "react";

interface CardProps {
  title: string;
  currrentRevenue: string;
  lastRevenue: string;
  icon: any;
}

export default function Card({
  title,
  currrentRevenue,
  lastRevenue,
  icon: Icon,
}: CardProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
        <Icon className="w-5 h-5" />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{currrentRevenue}</div>
        <p className="text-xs text-muted-foreground">
          {lastRevenue} from last month
        </p>
      </div>
    </div>
  );
}
