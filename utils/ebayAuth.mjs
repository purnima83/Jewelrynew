// /utils/ebayAuth.mjs
import fetch from 'node-fetch';

/**
 * Generates the eBay Login URL
 */
export function getEbayLoginUrl() {
  const clientId = process.env.EBAY_CLIENT_ID;
  const redirectUri = process.env.EBAY_REDIRECT_URI; // RuName

  // ✅ Only basic scope for now (no buy.browse)
  const scopes = [
    "https://api.ebay.com/oauth/api_scope"
  ].join(' ');

  const url = new URL('https://auth.ebay.com/oauth2/authorize');
  url.searchParams.append('client_id', clientId);
  url.searchParams.append('redirect_uri', redirectUri);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('scope', scopes);

  return url.toString();
}

/**
 * Exchanges Authorization Code for Refresh Token
 */
export async function getRefreshToken(authCode) {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;
  const redirectUri = process.env.EBAY_REDIRECT_URI; // RuName again

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: redirectUri
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

  if (data.refresh_token) {
    console.log("✅ Received Refresh Token:", data.refresh_token.slice(0, 50) + "...");
    return data.refresh_token;
  } else {
    console.error("❌ Failed to get refresh token:", data);
    throw new Error('Failed to get refresh token');
  }
}
