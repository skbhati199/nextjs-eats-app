import CardContainer from "@/components/others/CardViewContainer";
import prismadb from "@/lib/prismadb";
import { capitalizeFirstLetter } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import React from "react";

export default async function ResturantDetailsPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const response = await prismadb.restaurant.findUnique({
    where: {
      id: params.restaurantId,
    },
  });

  if (!response) {
    redirect("/dashboard");
  }

  return (
    <CardContainer id={params.restaurantId} title="Details Page">
      <div className="flex flex-col text-muted-foreground">
        <h2 className="text-3xl text-muted-foreground font-bold my-2">
          {capitalizeFirstLetter(response.name)}
        </h2>
        <h4 className="text-lg my-2"> {response.address} </h4>
        <p>{format(new Date(response.createAt ?? 0), "dd MMMM, yyyy")}</p>
      </div>
    </CardContainer>
  );
}
