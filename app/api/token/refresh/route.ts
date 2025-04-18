// /app/api/token/refresh/route.ts

import { NextResponse } from "next/server";
import { getApplicationAccessToken } from "@/utils/ebayAppToken.mjs";

export async function GET() {
  try {
    const newToken = await getApplicationAccessToken();
    console.log("✅ Manual refresh: New eBay token fetched.");

    return NextResponse.json({
      message: "Token refreshed successfully!",
      newTokenPreview: newToken.slice(0, 30) + "...", // Only preview for safety
    });
  } catch (error: any) {
    console.error("❌ Manual refresh error:", error.message);
    return NextResponse.json({ error: "Failed to refresh token." }, { status: 500 });
  }
}
