import { Restaurant } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface RestaurantCardProps {
  data: Restaurant;
}

export default function RestaurantCard({ data }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${data.id}`}>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">{data.name}</h3>
        </div>
        <div className="p-6 pt-0">
          <p className="text-xs text-muted-foreground">{data.address}</p>
        </div>
      </div>
    </Link>
  );
}
