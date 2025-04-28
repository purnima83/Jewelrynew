import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongooseConnect";
import { getOrderModel } from "@/lib/orderModel";
import { getUserModel } from "@/lib/userModel";
import { getProductModel } from "@/lib/productModel";
import { readSavedApplicationToken, getApplicationAccessToken } from "@/utils/ebayAppToken.mjs";

export async function GET() {
  try {
    await connectToDatabase();

    const Order = getOrderModel();
    const User = getUserModel();
    const Product = getProductModel();

    const [orders, users, products] = await Promise.all([
      Order.find({}),
      User.find({}),
      Product.find({}),
    ]);

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
          ebayCount = data.total || 0;
        } else if (res.status === 401) {
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
        console.error("❌ Error fetching eBay products:", error);
      }
    }

    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    return NextResponse.json({
      orders: orders.length,
      revenue: totalRevenue,
      users: users.length,
      products: products.length,
      ebayProducts: ebayCount,
    });
  } catch (error) {
    console.error("❌ Error in stats API:", error);
    return NextResponse.json({ error: "Failed to load admin stats" }, { status: 500 });
  }
}
