import {
  createMenu,
  deleteByIdMenu,
  getAllMenus,
  updateMenu,
} from "@/lib/menu-helpers";
import { createOrder } from "@/lib/order-helpers";
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
    const { userId, restaurantId, menuItemId, price, gst, totalAmount } = body;

    const res = await createOrder(userId, restaurantId, menuItemId, price, gst, totalAmount);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("ERROR_CREATE_Menu", { status: 503 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { body } = await req.json();
    const { id, userId, restaurantId, menuItemId } = body;
    const res = await updateMenu(id, userId, restaurantId, menuItemId);
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
