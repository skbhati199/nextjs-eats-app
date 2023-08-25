import {
  getRestaurantsByOwnerId,
} from "@/lib/restaurant-helpers";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json("Unauthorization", { status: 401 });
    }
    const response = await getRestaurantsByOwnerId(userId);
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse("ERROR_GET_RestaurantS", { status: 503 });
  }
}
