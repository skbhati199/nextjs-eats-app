import { getRestaurantsByOwnerId } from "@/lib/restaurant-helpers";
import { auth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // const { userId, } = auth();
    // const { userId, } = getAuth(req);
    console.log(params.userId);
    if (!params.userId) {
      return NextResponse.json("Unauthorization", { status: 401 });
    }
    const response = await getRestaurantsByOwnerId(params.userId);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_GET_RestaurantS", { status: 503 });
  }
}
