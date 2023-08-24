import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@prisma/client";
import { ArrowRightIcon, ChevronRightCircle, ChevronRightIcon, MoveLeftIcon, Verified, VerifiedIcon } from "lucide-react";
import Link from "next/link";

interface ResturantItemProps {
  data: Restaurant
}

const ResturantItemCard = ({
  data
}: ResturantItemProps) => {
  return (
    <Link href={`/dashboard/${data.id}`}>
    <Card>
      <CardHeader>
        <CardTitle><div className="flex flex-row justify-between gap-x-2">
        <span className="flex flex-row gap-1 justify-start items-center">{data.name} {data.isActive ? (
              <>
                <VerifiedIcon className="text-primary" size={18} />{" "}
              </>
            ) : (
              <>
                <Verified className="text-yellow-600" size={18} />{" "}
              </>
            )}</span>
            <ChevronRightIcon className="text-gray-500" size={18} />
            </div></CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div> Devi Mandir  {data.address}</div>
          
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default ResturantItemCard;
