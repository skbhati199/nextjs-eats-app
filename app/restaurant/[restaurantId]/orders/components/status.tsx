import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import React from "react";

export default function Status({ status }: { status: OrderStatus }) {
  return (
    <div
      className={cn(
        "text-muted-foreground text-sm p-1 rounded-lg flex justify-center",
        {
          "text-yellow-500 font-semibold  bg-yellow-500/10 ":
            status === OrderStatus.PENDING,
          "text-blue-500 font-semibold bg-blue-500/10":
            status === OrderStatus.PREPRING,
          "text-green-500 font-semibold bg-green-500/10":
            status === OrderStatus.DELIVERY,
          "text-green-900 font-semibold bg-green-500/10":
            status === OrderStatus.COMPLETED,
          "text-red-500 font-semibold bg-red-500/10":
            status === OrderStatus.REJECTED,
        }
      )}
    >
      <p >{status}</p>
    </div>
  );
}
