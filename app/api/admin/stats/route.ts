import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/order";
import User from "@/models/user";
import Product from "@/models/product";
import { readSavedApplicationToken, getApplicationAccessToken } from "@/utils/ebayAppToken.mjs";

export async function GET() {
  await connectToDatabase();

  const orders = await Order.find({});
  const users = await User.find({});
  const products = await Product.find({});

  // Get eBay token
  let token = readSavedApplicationToken();
  if (!token) {
    token = await getApplicationAccessToken();
  }

  let ebayCount = 0;

  if (token) {
    try {
      const res = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=jewelry&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        ebayCount = data.total || 0; // ✅ SAFELY read
      } else if (res.status === 401) {
        // Token expired — retry
        token = await getApplicationAccessToken();
        const retryRes = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=jewelry&limit=5`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const retryData = await retryRes.json();
        ebayCount = retryData.total || 0;
      }
    } catch (error) {
      console.error("❌ Error fetching eBay count:", error);
    }
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return NextResponse.json({
    orders: orders.length,
    revenue: totalRevenue,
    users: users.length,
    products: products.length,
    ebayProducts: ebayCount,
  });
}
