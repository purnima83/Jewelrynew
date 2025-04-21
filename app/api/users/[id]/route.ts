import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "User deleted" });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const { role } = await req.json();
  await User.findByIdAndUpdate(params.id, { role });
  return NextResponse.json({ message: "User role updated" });
}
