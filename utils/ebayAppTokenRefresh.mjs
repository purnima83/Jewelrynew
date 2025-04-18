// /utils/ebayAppTokenRefresh.mjs

import { getApplicationAccessToken } from "./ebayAppToken.mjs";

export function startEbayAppTokenAutoRefresh() {
  console.log("⏳ Starting eBay App Token Auto-Refresh Service...");

  async function refreshToken() {
    try {
      console.log("🔄 Checking and refreshing eBay token...");
      await getApplicationAccessToken(); // Always refresh
      console.log("✅ Token refreshed successfully");
    } catch (error) {
      console.error("❌ Failed to refresh token:", error.message);
    }
  }

  // Immediately refresh on server start
  refreshToken();

  // Refresh every 90 minutes (5400 seconds = 1.5 hours)
  setInterval(refreshToken, 5400 * 1000);
}
