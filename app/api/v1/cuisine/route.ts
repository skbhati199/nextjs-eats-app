
import { createCusine, getAllCusines, updateCusine } from "@/lib/cuisine-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await getAllCusines();
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_GET_CuisineS", { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { body } = await req.json();
    const { name } = body;
    const res = await createCusine(name);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return new NextResponse("ERROR_CREATE_Cuisine", { status: 503 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
   
    const { body } = await req.json();
    const { id, name } = body;
    const res = await updateCusine(id, name);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_UPDATE_Cuisine", { status: 503 });
  }
}

export async function DELETE(req: NextRequest) {
    try {
      const { body } = await req.json();
      const { id, name, cuisine } = body;
      const res = await updateCusine(id, name);
      return NextResponse.json(res, { status: 200 });
    } catch (error) {
      return new NextResponse("ERROR_DELETE_Cuisine", { status: 503 });
    }
  }
