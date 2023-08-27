import {
  createReview,
  deleteByIdReview,
  getAllReviews,
  updateReview,
} from "@/lib/review-helpers";
import { auth, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await getAllReviews();
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_GET_ReviewS", { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { body } = await req.json();
    const { rating, comment, userId, restaurantId } = body;
    if (!userId) {
      return new NextResponse("Unauthorization", { status: 401 });
    }
    const res = await createReview( parseFloat(rating), comment, userId, restaurantId);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("ERROR_CREATE_Review", { status: 503 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { body } = await req.json();
    const { id, rating, comment, userId, restaurantId } = body;
    if (!userId) {
      return new NextResponse("Unauthorization", { status: 401 });
    }
    const res = await updateReview(id,  parseFloat(rating), comment, userId, restaurantId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_UPDATE_Review", { status: 503 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorization", { status: 401 });
    }
    const { body } = await req.json();
    const { id } = body;
    const res = await deleteByIdReview(id);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_DELETE_Review", { status: 503 });
  }
}
