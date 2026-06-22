import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const settings = await prisma.storeSettings.findFirst();
  return NextResponse.json({ settings: settings || {} });
}

export async function PUT(req) {
  const body = await req.json();
  let settings = await prisma.storeSettings.findFirst();
  if (settings) {
    settings = await prisma.storeSettings.update({ where: { id: settings.id }, data: body });
  } else {
    settings = await prisma.storeSettings.create({ data: body });
  }
  return NextResponse.json({ settings });
}
