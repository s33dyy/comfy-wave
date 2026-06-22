import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const heroSlides = await prisma.heroSlide.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json({ heroSlides });
}

export async function POST(req) {
  const body = await req.json();
  const heroSlide = await prisma.heroSlide.create({ data: body });
  return NextResponse.json({ heroSlide });
}
