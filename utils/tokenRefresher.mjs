// /utils/tokenRefresher.mjs
import { getApplicationAccessToken } from "./ebayAppToken.mjs";

let refreshing = false;

export async function backgroundRefreshToken() {
  if (refreshing) return;
  refreshing = true;
  console.log("🔄 Starting background token refresh...");

  try {
    await getApplicationAccessToken();
    console.log("✅ Token refreshed in background.");
  } catch (error) {
    console.error("❌ Token background refresh failed:", error.message);
  } finally {
    refreshing = false;
  }
}
