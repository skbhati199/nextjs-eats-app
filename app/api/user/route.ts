import { createUser, deleteUser, getUser, updateUser } from "@/lib/user-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { body } = await req.json();
    const { userId } = body;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const res = await getUser(userId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_GET_USER", {
      status: 503,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { data, type } = await req.json();
    console.log("POST", data);
    if (type === "user.created") {
      const { id, first_name, last_name, email_addresses } = data;
      const name = first_name + " " + last_name;
      const response = await createUser(
        id,
        email_addresses[0].email_address,
        name
      );
      return NextResponse.json(response, { status: 201 });
    } else if (type === "user.created") {
      const { id, first_name, last_name, email_addresses } = data;
      const name = first_name + " " + last_name;
      const response = await updateUser(
        id,
        email_addresses[0].email_address,
        name
      );
      return NextResponse.json(response, { status: 204 });
    } else  if (type === "user.created") {
      const { id } = data;
      const response = await deleteUser(id)
      return NextResponse.json(response, { status: 200 });
    }
    // const { data } = body;
   
    return NextResponse.json(req, { status: 200 });
  } catch (error) {
    return new NextResponse("ERROR_CREATE_USER", {
      status: 503,
    });
  }
}
