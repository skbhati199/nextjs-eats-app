import { getByIdResturant, getByOwnerIdResturant } from "@/lib/restaurant-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { ownerId: string } }
) {
  try {
    const res = await getByOwnerIdResturant(params.ownerId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_GET_BY_OWNER_ID_RESTURANTS", { status: 503 });
  }
}
