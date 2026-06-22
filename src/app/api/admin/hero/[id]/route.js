import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const heroSlide = await prisma.heroSlide.update({ where: { id }, data: body });
  return NextResponse.json({ heroSlide });
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  await prisma.heroSlide.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
