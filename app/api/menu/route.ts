import {
  createMenu,
  deleteByIdMenu,
  getAllMenus,
  updateMenu,
} from "@/lib/menu-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await getAllMenus();
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_GET_MenuS", { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { body } = await req.json();
    const { name, price, restaurantId } = body;

    const res = await createMenu(name, parseFloat(price), restaurantId);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("ERROR_CREATE_Menu", { status: 503 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { body } = await req.json();
    const { id, name, price, restaurantId } = body;
    const res = await updateMenu(id, name, parseFloat(price), restaurantId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_UPDATE_Menu", { status: 503 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { body } = await req.json();
    const { id } = body;
    const res = await deleteByIdMenu(id);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_DELETE_Menu", { status: 503 });
  }
}
