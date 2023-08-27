import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { ReviewColumn } from "./components/columns";
import { ReviewsClient } from "./components/client";

export default async function ReviewPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  const { userId, sessionId, getToken } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const menus = await prismadb.review.findMany({
    where: {
      restaurantId: params.restaurantId,
    },
    include: {
      restaurant: true,
      user: true,
    },
  });

  const formattedReviews: ReviewColumn[] = menus.map((item) => ({
    id: item.id,
    rating: item.rating ?? 0,
    comment: item.comment,
    restaurant: item.restaurant.name ?? "",
    restaurantId: item.restaurant.id ?? "",
    userName: item.user.name ?? "",
  }));

  console.log(formattedReviews);

  return (
    <div className="flex flex-col md:pt-2">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ReviewsClient data={formattedReviews} restaurantId={params.restaurantId} />
      </div>
    </div>
  );
}
