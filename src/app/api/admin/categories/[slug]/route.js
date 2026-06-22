import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  const { slug } = await params;
  const body = await req.json();
  const category = await prisma.category.update({ where: { slug }, data: body });
  return NextResponse.json({ category });
}

export async function DELETE(req, { params }) {
  const { slug } = await params;
  await prisma.category.delete({ where: { slug } });
  return NextResponse.json({ ok: true });
}
