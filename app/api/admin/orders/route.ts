import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const orders = await Order.find();
  return NextResponse.json(orders);
}

export async function PUT(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await Order.findByIdAndUpdate(id, { status: "completed" });
  return NextResponse.json({ success: true });
}