import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import React from "react";

export default function Status({ status }: { status: OrderStatus }) {

  

  return (<div className={cn(`text-muted-foreground`, status === OrderStatus.PENDING ? "text-yellow-500 font-semibold" : "")}>{status}</div>);
}
