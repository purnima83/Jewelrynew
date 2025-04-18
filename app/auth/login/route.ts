import { NextResponse } from 'next/server';
import { getEbayLoginUrl } from '@/utils/ebayAuth.mjs';

export async function GET() {
  const loginUrl = getEbayLoginUrl();
  return NextResponse.redirect(loginUrl);
}
