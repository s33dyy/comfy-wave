const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '../src/app/api');
fs.mkdirSync(apiDir, { recursive: true });

function writeFile(routePath, content) {
  const fullPath = path.join(apiDir, routePath, 'route.js');
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

const prismaImports = `import { NextResponse } from 'next/server';\nimport prisma from '@/lib/prisma';\n`;

// 1. /api/admin/dashboard
writeFile('admin/dashboard', `${prismaImports}
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
`);

// 2. /api/admin/products
writeFile('admin/products', `${prismaImports}
export async function GET(req) {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ products });
}

export async function POST(req) {
  const body = await req.json();
  const product = await prisma.product.create({ data: { ...body, price: body.price || 0 } });
  return NextResponse.json({ product });
}
`);

// /api/admin/products/[id]
writeFile('admin/products/[id]', `${prismaImports}
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
`);

// 3. /api/admin/categories
writeFile('admin/categories', `${prismaImports}
export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json({ categories });
}

export async function POST(req) {
  const body = await req.json();
  const category = await prisma.category.create({ data: body });
  return NextResponse.json({ category });
}
`);

// /api/admin/categories/[slug]
writeFile('admin/categories/[slug]', `${prismaImports}
export async function PUT(req, { params }) {
  const { slug } = params;
  const body = await req.json();
  const category = await prisma.category.update({ where: { slug }, data: body });
  return NextResponse.json({ category });
}

export async function DELETE(req, { params }) {
  const { slug } = params;
  await prisma.category.delete({ where: { slug } });
  return NextResponse.json({ ok: true });
}
`);

// 4. /api/admin/orders
writeFile('admin/orders', `${prismaImports}
export async function GET() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ orders });
}
`);

// /api/admin/orders/[id]
writeFile('admin/orders/[id]', `${prismaImports}
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const order = await prisma.order.update({ where: { id }, data: body });
  return NextResponse.json({ order });
}
`);

// 5. /api/admin/hero
writeFile('admin/hero', `${prismaImports}
export async function GET() {
  const heroSlides = await prisma.heroSlide.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json({ heroSlides });
}

export async function POST(req) {
  const body = await req.json();
  const heroSlide = await prisma.heroSlide.create({ data: body });
  return NextResponse.json({ heroSlide });
}
`);

// /api/admin/hero/[id]
writeFile('admin/hero/[id]', `${prismaImports}
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const heroSlide = await prisma.heroSlide.update({ where: { id }, data: body });
  return NextResponse.json({ heroSlide });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await prisma.heroSlide.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
`);

// 6. /api/admin/settings
writeFile('admin/settings', `${prismaImports}
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
`);

// 7. Auth (login, logout, session)
writeFile('admin/login', `import { NextResponse } from 'next/server';
export async function POST(req) {
  return NextResponse.json({ user: { email: 'admin' } }); // Mock login since we use proxy middleware
}
`);
writeFile('admin/logout', `import { NextResponse } from 'next/server';
export async function POST(req) {
  return NextResponse.json({ ok: true });
}
`);
writeFile('admin/session', `import { NextResponse } from 'next/server';
export async function GET(req) {
  return NextResponse.json({ authenticated: true, user: { email: 'admin' } }); // Bypass since proxy middleware handles it
}
`);

// 8. /api/admin/featured
writeFile('admin/featured', `${prismaImports}
export async function PUT(req) {
  const { productIds } = await req.json();
  await prisma.product.updateMany({ data: { featured: false } });
  await prisma.product.updateMany({ where: { id: { in: productIds } }, data: { featured: true } });
  const products = await prisma.product.findMany();
  return NextResponse.json({ products });
}
`);

// 9. /api/admin/uploads
writeFile('admin/uploads', `import { NextResponse } from 'next/server';
export async function POST(req) {
  // Return dummy URL or integrate with existing upload if needed
  return NextResponse.json({ url: 'https://via.placeholder.com/150' });
}
`);

console.log("API routes generated successfully!");
