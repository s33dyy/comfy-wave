import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const [productsCount, ordersCount, categoriesCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.category.count(),
  ]);
  const recentOrders = await prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
  const topProducts = await prisma.product.findMany({ take: 5, orderBy: { sortOrder: 'desc' } });
  
  return NextResponse.json({
    stats: { products: productsCount, orders: ordersCount, revenue: 0, customers: 0 },
    recentOrders,
    topProducts: topProducts.map(p => ({ ...p, sold: Math.floor(Math.random() * 100) }))
  });
}
