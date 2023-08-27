import CardEditContainer from '@/components/others/CardEditContainer'
import ResturantForm from '@/components/resturants/resturant-form';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function EditPage({
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
    include: {
      cuisine: true
    }
  });

  console.log(response?.cuisine);

  if (!response) {
    redirect("/dashboard");
  }

  return (
    <CardEditContainer title={`Edit Restaurant: ${response.name}`}>
      <ResturantForm isEdit={true} data={response} />
    </CardEditContainer>
  )
}
