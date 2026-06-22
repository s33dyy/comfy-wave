import { NextResponse } from 'next/server';
export async function POST(req) {
  return NextResponse.json({ user: { email: 'admin' } }); // Mock login since we use proxy middleware
}
