"use client";

import { Building2, Plus, PlusCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { ReviewColumn, columns } from "./columns";
import Heading from "@/components/others/Heading";
import { useReviewModal } from "@/hooks/use-review-modal";

interface ReviewsClientProps {
  data: ReviewColumn[];
  restaurantId: string;
}

export const ReviewsClient: React.FC<ReviewsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex md:flex-row  flex-col items-center justify-between">
        <Heading
          description="List of Reviews"
          icon={Building2}
          iconColor="text-red-500 dark:text-red-500"
          bgColor="bg-red-500/10"
          title={`Reviews(${data?.length})`}
        />
      
      </div>
      <Separator />
      <DataTable searchKey="userName" columns={columns} data={data} />
    </>
  );
};
