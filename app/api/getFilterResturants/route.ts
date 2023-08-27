import { getAllPublicRestaurants } from "@/lib/restaurant-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await getAllPublicRestaurants();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_GET_RestaurantS", { status: 503 });
  }
}
