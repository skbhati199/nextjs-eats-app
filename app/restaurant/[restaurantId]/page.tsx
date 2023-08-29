import CardFeature from "@/components/resturants/CardFeature";
import { BarChart2 } from "@/components/resturants/bar-chart-2";
import {
  getLastSixUsersWithOrders,
  getSalesCount,
} from "@/lib/dashboard-helper";
import { convertIntCurrency } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default async function ResturantPage() {
  const salesCount = await getSalesCount();
  const lastSixUsersWithOrders = await getLastSixUsersWithOrders();
  console.log(lastSixUsersWithOrders);
  return (
    <div className="flex flex-col h-full overflow-hidden sm:flex sm:flex-col">
      <CardFeature className="h-1/4 overflow-y-auto" />
      <div className="flex-1 grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4 overflow-y-auto">
        <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Orders Overview
            </h3>
          </div>
          <div className="p-4 pt-0 pl-2">
            <div className="recharts-responsive-container">
              {/* <BarChart /> */}
              <BarChart2 />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Recent Sales
            </h3>
            <p className="text-sm text-muted-foreground">
              You made {salesCount} sales this month.
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-8">
              {lastSixUsersWithOrders.map((user: any) => (
                <div key={user.id} className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                    <Image
                      width={100}
                      height={100}
                      className="aspect-square h-full w-full"
                      alt="Avatar"
                      src="/placeholder.png"
                    />
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {convertIntCurrency(user.orders[0].totalAmount)}
                  </div>
                </div>
              ))}
              {lastSixUsersWithOrders.length == 0 && (
                <div className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                    <Image
                      width={100}
                      height={100}
                      className="aspect-square h-full w-full"
                      alt="Avatar"
                      src="/placeholder.png"
                    />
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                     User Name
                    </p>
                    <p className="text-sm text-muted-foreground">
                      abc@example.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
