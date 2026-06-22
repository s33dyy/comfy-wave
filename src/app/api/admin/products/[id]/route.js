import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const product = await prisma.product.update({ where: { id }, data: { ...body, price: body.price || 0 } });
  return NextResponse.json({ product });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
