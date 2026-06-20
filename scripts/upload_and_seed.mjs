import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing products to ensure clean state...");
  await prisma.productMedia.deleteMany({});
  await prisma.product.deleteMany({});

  console.log("Reading backup_products.csv...");
  const csv = fs.readFileSync("prisma/backup_products.csv", "utf-8");
  const lines = csv.split("\n").filter(Boolean);
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // CSV format: id,name,description,price,imageUrl,category,createdAt
    // We'll parse it simply assuming no quotes inside the fields except where standard
    // Since we know the data, we can split by comma. But descriptions have commas!
    // The CSV looks like: uuid,"Name","Description",Price,URL,Category,Timestamp
    // Let's use a regex to parse CSV correctly
    const regex = /(?:^|,)(?:"([^"]*)"|([^,]*))/g;
    let match;
    const parts = [];
    while ((match = regex.exec(line)) !== null) {
      parts.push(match[1] !== undefined ? match[1] : match[2]);
    }
    
    // We expect: id, name, description, price, imageUrl, category, createdAt
    if (parts.length < 6) continue;

    const id = parts[0];
    const name = parts[1];
    const description = parts[2];
    const price = parseFloat(parts[3]);
    const imageUrl = parts[4];
    const category = parts[5];

    console.log(`Processing: ${name}`);

    try {
      // Upload to Cloudinary with enhancement
      const uploadResult = await cloudinary.uploader.upload(imageUrl, {
        folder: 'comfywave/products',
        transformation: [
          { quality: "auto", fetch_format: "auto" },
          { effect: "improve" }, // "enhanced images from cloudinary"
          { effect: "sharpen:100" }
        ]
      });

      console.log(`Uploaded to Cloudinary: ${uploadResult.secure_url}`);

      // Insert to DB
      await prisma.product.create({
        data: {
          id: id || undefined,
          name,
          description,
          price,
          category,
          media: {
            create: {
              url: uploadResult.secure_url,
              type: 'IMAGE',
              isPrimary: true
            }
          }
        }
      });
      console.log(`Inserted to DB: ${name}`);
    } catch (e) {
      console.error(`Failed to process ${name}:`, e.message);
    }
  }

  console.log("All CSV products processed and enhanced.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
