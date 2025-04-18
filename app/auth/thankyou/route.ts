// /app/auth/thankyou/route.ts
console.log("🟡 /auth/thankyou/route.ts HIT");
import { NextRequest, NextResponse } from "next/server";
import { getRefreshToken } from "@/utils/ebayAuth.mjs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Authorization code missing" }, { status: 400 });
  }

  try {
    console.log("🔵 Authorization Code received:", code);

    const refreshToken = await getRefreshToken(code);

    console.log("✅ REFRESH TOKEN:");
    console.log(refreshToken);

    return new Response(`
      <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1>✅ Login Successful!</h1>
          <p>Refresh Token has been generated. Check your server console!</p>
          <p>You can close this window.</p>
        </body>
      </html>
    `, {
      headers: { "Content-Type": "text/html" }
    });
  } catch (error: any) {
    console.error("❌ Error exchanging code for refresh token:", error.message);
    return NextResponse.json({ error: "Failed to generate refresh token" }, { status: 500 });
  }
}
