import { connectToDatabase } from "@/lib/mongooseConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const users = await User.find({}, { password: 0 }); // don't expose password
  return NextResponse.json(users);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  }

  await connectToDatabase();
  await User.findByIdAndDelete(id);

  return NextResponse.json({ message: "User deleted" });
}