import React from 'react'
import Card from "@/components/resturants/card";
import { BoxesIcon, DollarSign, GrapeIcon, SubscriptIcon } from "lucide-react";

export default function CardFeature() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card
        title="Total Revenue"
        currrentRevenue="$45,231.89"
        lastRevenue="+20.1$"
        icon={DollarSign}
      />
      <Card
        title="Subscriptions"
        currrentRevenue="+2350"
        lastRevenue="+180.1%"
        icon={SubscriptIcon}
      />
      <Card
        title="Sales"
        currrentRevenue="+12,234"
        lastRevenue="+19.1%"
        icon={BoxesIcon}
      />
      <Card
        title="Active Now"
        currrentRevenue="+573"
        lastRevenue="+201.1"
        icon={GrapeIcon}
      />
    </div>
  )
}
