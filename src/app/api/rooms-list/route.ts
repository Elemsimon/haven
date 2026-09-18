import { NextResponse } from "next/server";
import { getRooms } from "@/src/libs/apis";

export async function GET() {
  try {
    const rooms = await getRooms();
    return NextResponse.json(rooms, { status: 200 });
  } catch {
    return new NextResponse("Unable to fetch rooms", { status: 400 });
  }
}
