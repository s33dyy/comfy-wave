import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const order = await prisma.order.update({ where: { id }, data: body });
  return NextResponse.json({ order });
}
