import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/mongooseConnect";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword });

  return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
}
