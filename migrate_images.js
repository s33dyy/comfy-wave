const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: { media: true }
  });

  for (const product of products) {
    if (!product.imageUrl && product.media && product.media.length > 0) {
      const primaryMedia = product.media.find(m => m.isPrimary) || product.media[0];
      await prisma.product.update({
        where: { id: product.id },
        data: { imageUrl: primaryMedia.url }
      });
      console.log(`Updated product ${product.id} with image ${primaryMedia.url}`);
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });
