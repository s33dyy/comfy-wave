import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Fixing Kantha Saree Image...");
  const newImageUrl = "https://images.unsplash.com/photo-1610189014605-721200155a69?w=800&auto=format&fit=crop";
  
  // Find products matching Kantha
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: "Kantha"
      }
    }
  });

  for (const product of products) {
    await prisma.product.update({
      where: { id: product.id },
      data: { imageUrl: newImageUrl }
    });
    console.log(`Updated product: ${product.name}`);
  }
  
  console.log("Done.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
