// /utils/ebayToken.mjs
import fetch from 'node-fetch';

let cachedAccessToken = null;
let accessTokenExpiry = null; // timestamp in milliseconds

export async function getAccessToken() {
  const now = Date.now();

  // ✅ If cached token is still valid, use it
  if (cachedAccessToken && accessTokenExpiry && now < accessTokenExpiry - 60000) { 
    // 1 minute buffer
    return cachedAccessToken;
  }

  console.log("🔄 Fetching new eBay Access Token...");

  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;
  const refreshToken = process.env.EBAY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("❌ Missing eBay credentials or refresh token in environment variables");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    scope: 'https://api.ebay.com/oauth/api_scope'
  });

  const res = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`
    },
    body
  });

  const data = await res.json();

  if (!data.access_token) {
    console.error("❌ Failed to get new access token:", data);
    throw new Error('Failed to get new access token');
  }

  cachedAccessToken = data.access_token;
  accessTokenExpiry = now + (data.expires_in * 1000); // expires_in is seconds

  console.log("✅ New Access Token loaded and cached!");

  return cachedAccessToken;
}
