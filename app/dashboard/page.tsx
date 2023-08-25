import Heading from "@/components/others/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Building2 } from "lucide-react";
import React from "react";
import PageHeader from "./components/page-header";

export default async function DashBoardPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/getRestaurantsByOwnerId`,
    {
      next: { revalidate: 0 },
    }
  );

  const results = await response.json();

  console.log(results);

  return (
    <div>
      <PageHeader results={results} />
      <Separator />
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"></div>
    </div>
  );
}
