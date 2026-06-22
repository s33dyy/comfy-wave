const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Categories from existing products...");
  
  // Find all unique categories from products
  const products = await prisma.product.findMany({ select: { category: true, imageUrl: true } });
  
  const categoryMap = new Map();
  for (const p of products) {
    if (p.category) {
      if (!categoryMap.has(p.category)) {
        categoryMap.set(p.category, p.imageUrl || "");
      }
    }
  }
  
  for (const [categoryName, imageUrl] of categoryMap.entries()) {
    const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Upsert the category
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name: categoryName,
        slug,
        description: `${categoryName} collection`,
        imageUrl: imageUrl, // Use an image from a product as the category image
        active: true
      }
    });
    console.log(`Synced Category: ${categoryName}`);
    
    // Update products to point to the new categorySlug if it's missing
    await prisma.product.updateMany({
      where: { category: categoryName, categorySlug: null },
      data: { categorySlug: slug }
    });
  }
  
  console.log("Syncing Hero Slides...");
  
  const heroCount = await prisma.heroSlide.count();
  if (heroCount === 0) {
    const slides = [
      {
        eyebrow: "Summer Edit",
        title: "The Art of Loom",
        subtitle: "Handcrafted weaves telling stories of Indian heritage.",
        imageUrl: "/catalog/hero-1.jpg",
        ctaLabel: "Shop Collection",
        ctaHref: "/shop",
        align: "left",
        sortOrder: 1
      },
      {
        eyebrow: "Wedding Season",
        title: "Regal Elegance",
        subtitle: "Drape yourself in authentic Kanjivaram and Banarasi silks.",
        imageUrl: "/catalog/hero-2.jpg",
        ctaLabel: "View Bridal",
        ctaHref: "/shop?category=Lehenga",
        align: "center",
        sortOrder: 2
      },
      {
        eyebrow: "Everyday Grace",
        title: "Breeze in Cotton",
        subtitle: "Lightweight, breathable pure cotton kurtis and suits.",
        imageUrl: "/catalog/hero-3.jpg",
        ctaLabel: "Shop Now",
        ctaHref: "/shop?category=Kurti",
        align: "right",
        sortOrder: 3
      }
    ];
    
    for (const slide of slides) {
      await prisma.heroSlide.create({ data: slide });
    }
    console.log("Seeded default Hero Slides.");
  }
  
  console.log("Done syncing.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });
