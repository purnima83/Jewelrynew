// /utils/ebayAppToken.mjs

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const TOKEN_FILE = path.resolve(process.cwd(), 'ebay-app-token.txt');

export async function getApplicationAccessToken() {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;

  // 🛠 Debugging prints
  console.log("🔵 CLIENT_ID:", clientId);
  console.log("🟠 CLIENT_SECRET (first 10 chars):", clientSecret?.slice(0, 10) + "...");

  if (!clientId || !clientSecret) {
    console.error('❌ Missing eBay client credentials');
    throw new Error('Missing credentials');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const res = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope',  // ✅ Correct scope
      }),
    });

    const data = await res.json();

    if (data.access_token) {
      console.log("✅ New Application Token fetched");
      fs.writeFileSync(TOKEN_FILE, data.access_token);
      console.log("💾 Token saved to ebay-app-token.txt");
      return data.access_token;
    } else {
      console.error("❌ Failed to fetch app token:", data);
      throw new Error('Failed to fetch app token');
    }
  } catch (err) {
    console.error("❌ Error fetching Application Token:", err.message);
    throw err;
  }
}

export function readSavedApplicationToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    const token = fs.readFileSync(TOKEN_FILE, 'utf-8').trim();
    console.log("🔐 Loaded token from file");
    return token;
  } else {
    console.warn("⚠ No saved app token file found.");
    return null;
  }
}
