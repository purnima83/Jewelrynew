// getEbayToken.mjs

import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Required setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env.local') });

const getEbayOAuthToken = async () => {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  // 👇 ADD THESE TWO LINES HERE:
  console.log("🔵 CLIENT_ID:", clientId);
  console.log("🟠 CLIENT_SECRET:", clientSecret?.slice(0, 8), "... (truncated)");

  if (!clientId || !clientSecret) {
    console.error("❌ Missing EBAY_CLIENT_ID or EBAY_CLIENT_SECRET in .env.local");
    return;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope",
      }),
    });

    const data = await res.json();

    if (data.access_token) {
      console.log("✅ Access Token received:");
      console.log(data.access_token);
      console.log("⏳ Expires in:", data.expires_in, "seconds");

      const tokenFile = path.join(__dirname, 'ebay-token.txt');
      fs.writeFileSync(tokenFile, data.access_token, 'utf-8');
      console.log("💾 Token saved to ebay-token.txt");
    } else {
      console.error("❌ Token error:", data);
    }
  } catch (err) {
    console.error("🚨 Request failed:", err.message);
  }
};

getEbayOAuthToken();
