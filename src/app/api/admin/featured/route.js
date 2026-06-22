import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req) {
  const { productIds } = await req.json();
  await prisma.product.updateMany({ data: { featured: false } });
  await prisma.product.updateMany({ where: { id: { in: productIds } }, data: { featured: true } });
  const products = await prisma.product.findMany();
  return NextResponse.json({ products });
}
