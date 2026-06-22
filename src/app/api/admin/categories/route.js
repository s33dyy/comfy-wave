import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json({ categories });
}

export async function POST(req) {
  const body = await req.json();
  const category = await prisma.category.create({ data: body });
  return NextResponse.json({ category });
}
