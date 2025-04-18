import { NextResponse } from "next/server";
import { readSavedApplicationToken, getApplicationAccessToken } from "@/utils/ebayAppToken.mjs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "jewelry";
  const limit = searchParams.get("limit") || "20";

  let token = readSavedApplicationToken();

  const fetchEbay = async (accessToken: string) => {
    const res = await fetch(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(q)}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  };

  // ✅ Check if token is missing BEFORE using it
  if (!token) {
    console.warn("⚠️ No token found, fetching new one...");
    token = await getApplicationAccessToken();
  }

  let res = await fetchEbay(token);
  let data = await res.json();

  if (res.status === 401) {
    console.warn("⚠️ Token expired, refreshing...");
    const newToken = await getApplicationAccessToken();
    res = await fetchEbay(newToken);
    data = await res.json();
  }

  if (!res.ok) {
    console.error("❌ eBay API error:", data);
    return NextResponse.json({ error: "eBay API error", details: data }, { status: res.status });
  }

  const items = (data.itemSummaries || []).map((item: any) => ({
    id: item.itemId,
    title: item.title,
    price: item.price?.value || 0,
    image: item.image?.imageUrl || "/fallback-image.jpg",
  }));

  return NextResponse.json(items);
}
