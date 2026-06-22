import { NextResponse } from 'next/server';
export async function GET(req) {
  return NextResponse.json({ authenticated: true, user: { email: 'admin' } }); // Bypass since proxy middleware handles it
}
