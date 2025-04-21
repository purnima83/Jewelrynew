import { connectToDatabase } from "@/lib/mongodb";
import { getOrderModel } from "@/lib/orderModel"; // ✅ use new dynamic model
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const Order = getOrderModel(); // ✅ load model dynamically
    const orders = await Order.find();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const Order = getOrderModel(); // ✅ load model dynamically
    await Order.findByIdAndUpdate(id, { status: "completed" });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
