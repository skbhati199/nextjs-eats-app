
import { deleteByIdReview, getByIdReview } from "@/lib/review-helpers";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await getByIdReview(params.id);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_GET_BY_ID_REVIEW", { status: 503 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorization", { status: 401 });
    }
    const res = await deleteByIdReview(params.id);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_DELETE_REVIEW", { status: 503 });
  }
}
