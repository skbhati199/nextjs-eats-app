import {
  createRestaurant,
  getAllRestaurants,
  updateRestaurant,
} from "@/lib/restaurant-helpers";
import { auth, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await getAllRestaurants();
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_GET_RestaurantS", { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // const { userId } = getAuth(req);

    const { body } = await req.json();
    const { ownerId, name, address, cuisineId } = body;
    if (!ownerId) {
      return new NextResponse("Unauthorization", { status: 401 });
    }
    const res = await createRestaurant(name, address, cuisineId, ownerId);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("ERROR_CREATE_Restaurant", { status: 503 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorization", { status: 401 });
    }
    const { body } = await req.json();
    const { id, name, address, cuisineId } = body;
    const res = await updateRestaurant(id, name, address, cuisineId, userId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_UPDATE_Restaurant", { status: 503 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorization", { status: 401 });
    }
    const { body } = await req.json();
    const { id, name, address, cuisineId } = body;
    const res = await updateRestaurant(id, name, address, cuisineId, userId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_DELETE_Restaurant", { status: 503 });
  }
}
