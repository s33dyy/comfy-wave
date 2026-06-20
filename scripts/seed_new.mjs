import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

const fbData = {
  "description": "WONDERFUL HAND EMBROIDERED WITH LAMBANI\nDESIGNS CAN BE CUSTOMISED\n\nPerfect for special occasions and daily wear.",
  "media": [
    {
      "type": "IMAGE",
      "url": "https://scontent.fccu27-2.fna.fbcdn.net/v/t39.30808-6/518823611_1054801390087237_2481053427196846300_n.jpg?stp=dst-jpg_fb50_s320x320_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=G7X8ZMPS3dQQ7kNvwF4RELF&_nc_oc=AdqcOVz_q4sxW31xB_fvSQUZNpUWPXcUPslyJYOIRSi5svielcgVrHs19VNJW6qnOIgkmCUOZsFRrPn0CmfB7j-q&_nc_zt=23&_nc_ht=scontent.fccu27-2.fna&_nc_gid=bKxpOMA87ntzLb7YX8CXIQ&_nc_ss=7b289&oh=00_Af_p0p0T2tL0P-N5MF67hEVJxTE62vJsx5zfHuJPcwUDYQ&oe=6A3C31F2"
    },
    {
      "type": "IMAGE",
      "url": "https://scontent.fccu20-1.fna.fbcdn.net/v/t51.82787-15/725474712_18113096317903811_616090609458755744_n.webp?stp=dst-jpg_tt6&cstp=mx1440x1440&ctp=s1080x2048&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=q79bma4XWKcQ7kNvwGrqidO&_nc_oc=AdqP8fdL4If1t62eUIx78QebiLQjyjs-u_dpfvFmV1hhYKLflyU15BTHD8T-QIVc5YQo-UskUVdIfOXEkX0PkUCl&_nc_zt=23&_nc_ht=scontent.fccu20-1.fna&_nc_gid=LlZPO1sSmyenaWrSjX9tEQ&_nc_ss=7b289&oh=00_Af90HTF9CZN9Kqyv9GyM6L3L4f2KHcoZECGlZk6ihfTeag&oe=6A3C4CF3"
    },
    {
      "type": "VIDEO",
      "url": "https://res.cloudinary.com/demo/video/upload/v1355938803/dog.mp4" // Dummy video as FB blob extraction failed
    }
  ]
};

async function main() {
  console.log("Seeding Lambani Saree...");
  
  // Create product
  const product = await prisma.product.create({
    data: {
      name: "Lambani Hand Embroidered Saree",
      description: fbData.description,
      price: 8500.0,
      category: "Saree",
    }
  });

  // Upload to Cloudinary and create media entries
  let isFirst = true;
  for (const item of fbData.media) {
    console.log(`Processing ${item.type}: ${item.url.substring(0, 50)}...`);
    let finalUrl = item.url;
    
    // Only upload images to Cloudinary (skip dummy video)
    if (item.type === "IMAGE") {
        try {
          const result = await cloudinary.uploader.upload(item.url, {
            folder: "comfywave/products"
          });
          finalUrl = result.secure_url;
        } catch (e) {
          console.error("Cloudinary upload failed, using original URL:", e.message);
        }
    }

    await prisma.productMedia.create({
      data: {
        productId: product.id,
        url: finalUrl,
        type: item.type,
        isPrimary: isFirst
      }
    });
    isFirst = false;
  }
  
  console.log(`Successfully added product: ${product.name}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
