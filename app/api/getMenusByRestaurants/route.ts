import { getByRestaurantMenu } from "@/lib/menu-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const { body } = await req.json();
      const {  restaurantId } = body;
  
      const res = await getByRestaurantMenu(restaurantId);
      return NextResponse.json(res, { status: 201 });
    } catch (error) {
      console.error(error);
      return new NextResponse("ERROR_CREATE_Menu", { status: 503 });
    }
  }