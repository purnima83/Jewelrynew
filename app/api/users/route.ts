import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const users = await User.find({}, "email role createdAt"); // ✅ Important: select fields
  return NextResponse.json(users);
}
