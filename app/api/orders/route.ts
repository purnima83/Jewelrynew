import { getServerSession } from "next-auth/next"; // ✅ Correct
import { authOptions } from "@/lib/auth"; // ✅
import { connectToDatabase } from "@/lib/mongooseConnect"; // ✅
import Order from "@/models/Order"; // ✅
import { NextResponse } from "next/server";
import { Session } from "next-auth"; // ✅ Needed for casting

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { userEmail, items, total, address } = await req.json();

    if (!userEmail || !items || !total || !address) {
      console.error("🚨 Missing fields:", { userEmail, items, total, address });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      console.error("🚨 Invalid items array:", items);
      return NextResponse.json({ error: "Invalid items data" }, { status: 400 });
    }

    const newOrder = new Order({ userEmail, items, total, address });
    await newOrder.save();

    console.log("✅ Order created successfully:", newOrder);

    return NextResponse.json({ message: "Order created successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("🚨 Order API Error:", error);
    return NextResponse.json({ error: "Server error. Check logs for details." }, { status: 500 });
  }
}

export async function GET(_req: Request) {
  try {
    await connectToDatabase();

    const session = (await getServerSession(authOptions)) as Session | null; // ✅ IMPORTANT FIX

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
