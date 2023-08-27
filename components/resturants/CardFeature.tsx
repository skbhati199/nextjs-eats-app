import React from 'react'
import Card from "@/components/resturants/card";
import { BoxesIcon, DollarSign, GrapeIcon, SubscriptIcon } from "lucide-react";
import { cn, convertIntCurrency } from '@/lib/utils';
import { getActiveNowCount, getSalesCount, getSubscriptionsCount, getTotalRevenue } from '@/lib/dashboard-helper';

export default async function CardFeature({ className }: { className: string }) {
  const totalRevenue = await getTotalRevenue();
  const subscriptionsCount = await getSubscriptionsCount();
  const salesCount = await getSalesCount();
  const activeNowCount = await getActiveNowCount();
  return (
    <div className={cn(`grid gap-4 md:grid-cols-2 lg:grid-cols-4`, className)}>
      <Card
        title="Total Revenue"
        currrentRevenue={convertIntCurrency(totalRevenue)}
        lastRevenue="+20.1$"
        icon={DollarSign}
      />
      <Card
        title="Subscriptions"
        currrentRevenue={`+${subscriptionsCount}`}
        lastRevenue="+180.1%"
        icon={SubscriptIcon}
      />
      <Card
        title="Sales"
        currrentRevenue={`+${salesCount}`}
        lastRevenue="+19.1%"
        icon={BoxesIcon}
      />
      <Card
        title="Active Now"
        currrentRevenue={`+${activeNowCount}`}
        lastRevenue="+201.1"
        icon={GrapeIcon}
      />
    </div>
  )
}
