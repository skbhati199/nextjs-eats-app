import Heading from "@/components/others/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Building2 } from "lucide-react";
import React from "react";
import PageHeader from "./components/page-header";
import axios from "axios";
import { auth } from "@clerk/nextjs";

export default async function DashBoardPage() {
  const { userId } = auth();
  console.log(userId);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/getRestaurantsByOwnerId/${userId}`,);

  const results = await response.data;

  console.log(results);

  return (
    <div>
      <PageHeader results={results} />
      <Separator />
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"></div>
    </div>
  );
}
