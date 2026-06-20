'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addProduct(data) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      imageUrl: data.imageUrl,
    }
  });
  
  revalidatePath('/shop');
  revalidatePath('/');
  return product;
}
