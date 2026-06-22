import { NextResponse } from 'next/server';
export async function POST(req) {
  // Return dummy URL or integrate with existing upload if needed
  return NextResponse.json({ url: 'https://via.placeholder.com/150' });
}
