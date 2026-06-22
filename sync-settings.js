const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.storeSettings.findFirst();
  if (!existing) {
    await prisma.storeSettings.create({
      data: {
        name: "Comfywave",
        tagline: "Premium Clothing",
        whatsapp: "919830365132", // This can be changed in the admin panel
        whatsappDisplay: "+91 98303 65132",
        email: "support@comfywave.com",
        address: "Kolkata, West Bengal, India",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        notice: "Free shipping across India"
      }
    });
    console.log("Seeded default Store Settings");
  } else {
    console.log("Store Settings already exist");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });
