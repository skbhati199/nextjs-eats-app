import CardFeature from "@/components/resturants/CardFeature";
import { BarChart } from "@/components/resturants/bar-chart";
import Image from "next/image";
import React from "react";

export default function ResturantPage() {
  return (
    <div className="">
      <CardFeature />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Overview
            </h3>
          </div>
          <div className="p-6 pt-0 pl-2">
            <div className="recharts-responsive-container"></div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
            <BarChart />
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Recent Sales
            </h3>
            <p className="text-sm text-muted-foreground">
              You made 265 sales this month.
            </p>
            <div className="p-6 pt-0">
              <div className="space-y-8">
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
                      Olivia Martin
                    </p>
                    <p className="text-sm text-muted-foreground">
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
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
                      Olivia Martin
                    </p>
                    <p className="text-sm text-muted-foreground">
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
