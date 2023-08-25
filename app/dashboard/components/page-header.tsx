"use client";

import Heading from "@/components/others/Heading";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Building2 } from "lucide-react";
import React from "react";

export default function PageHeader({ results }: { results: any }) {
  const model = useModal();
  return (
    <div className="flex flex-row my-2 justify-between items-center max-w-6xl mx-auto">
      <Heading
        description="List of bussiness"
        icon={Building2}
        iconColor="text-red-500 dark:text-red-500"
        bgColor="bg-red-500/10"
        title={
          results?.length
            ? `Resturants (${results?.length})`
            : "Resturants"
        }
      />
      <Button
        onClick={() => {
          model.onOpen();
        }}
      >
        Create Resturant
      </Button>
    </div>
  );
}
