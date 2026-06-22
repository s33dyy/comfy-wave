import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req) {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ products });
}

export async function POST(req) {
  const body = await req.json();
  const product = await prisma.product.create({ data: { ...body, price: body.price || 0 } });
  return NextResponse.json({ product });
}
