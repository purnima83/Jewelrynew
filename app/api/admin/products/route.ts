import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const product = await Product.create(body);
  return NextResponse.json(product);
}

export async function DELETE(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}