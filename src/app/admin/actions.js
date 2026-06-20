'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData) {
  const name = formData.get('name');
  const description = formData.get('description');
  const price = parseFloat(formData.get('price'));
  const category = formData.get('category');
  const imageUrl = formData.get('imageUrl');

  await prisma.product.create({
    data: { name, description, price, category, imageUrl }
  });

  revalidatePath('/admin/products');
  revalidatePath('/shop');
  revalidatePath('/');
  redirect('/admin/products');
}

export async function updateProduct(id, formData) {
  const name = formData.get('name');
  const description = formData.get('description');
  const price = parseFloat(formData.get('price'));
  const category = formData.get('category');
  const imageUrl = formData.get('imageUrl');

  await prisma.product.update({
    where: { id },
    data: { name, description, price, category, imageUrl }
  });

  revalidatePath('/admin/products');
  revalidatePath('/shop');
  revalidatePath(`/product/${id}`);
  redirect('/admin/products');
}

export async function deleteProduct(id) {
  await prisma.product.delete({
    where: { id }
  });

  revalidatePath('/admin/products');
  revalidatePath('/shop');
  revalidatePath('/');
}

export async function updateOrderStatus(id, status) {
  await prisma.order.update({
    where: { id },
    data: { status }
  });

  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${id}`);
}
