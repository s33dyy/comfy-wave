const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  // Kurtis
  { name: "Chikankari Cotton Kurti", description: "Elegant handcrafted Chikankari kurti perfect for summer. Whatsapp 9830365132 to book.", price: 1599.00, category: "Kurti", imageUrl: "https://scontent.fccu27-2.fna.fbcdn.net/v/t51.71878-15/510421194_1037381771910801_6313552506831602302_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=110&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=Pkek8N1cgHEQ7kNvwFe7cZu&_nc_oc=AdrPNJ2P2F9xaprdqfEj64gnT8vj5BtxAe94SiFstLzujZ0WutVgMsYthbJYPvqqT5BHW2aF0JVSsQdsKaUChDSe&_nc_zt=23&_nc_ht=scontent.fccu27-2.fna&_nc_gid=2laKXXVajBZgFlVenLnS7A&_nc_ss=7b2a8&oh=00_Af8zFK-GkDIAjOazTsbXjSZetxTflAmLvcj9UEuGCImJug&oe=6A3C2B7E" },
  { name: "Anarkali Rayon Kurti", description: "Flowy Anarkali kurti with intricate gold foil print. Booking no..9830365132", price: 2100.00, category: "Kurti", imageUrl: "https://scontent.fccu20-1.fna.fbcdn.net/v/t51.71878-15/472371706_921908513346605_896117162213587663_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=108&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=Y90CxV0a43gQ7kNvwHJQ4Cn&_nc_oc=Adrm2Ul4waYFsZnNqnBcJJQTtTh7GgaAx5G9g41EYA2WKjfqUKgQN4jpEh3i6LZZ9ny5OjfyCUYkNI9aGyjMH5Fu&_nc_zt=23&_nc_ht=scontent.fccu20-1.fna&_nc_gid=xbVpQTndGtfnUuF-oQxSyQ&_nc_ss=7b2a8&oh=00_Af_ZmdSLxugKRFP_H17mEUcDImfardSEygo6TmZ7cZachQ&oe=6A3C3999" },
  { name: "Block Print Short Kurti", description: "Traditional Jaipur block print on premium cotton. Call/Whatsapp 9830365132", price: 1299.00, category: "Kurti", imageUrl: "https://scontent.fccu27-3.fna.fbcdn.net/v/t51.71878-15/469829036_1277512879948475_568553256927599420_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=102&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=7RhIg7W8fqYQ7kNvwHNBDY8&_nc_oc=AdoXX4zuhfMqpWnok2QKpezGHwUl1CdzkFykjGSjtMqKW_-lwIkGte7KdCR8SONsly15YWQu3_FR72dW8Wbk-hdX&_nc_zt=23&_nc_ht=scontent.fccu27-3.fna&_nc_gid=yeMxU3kZws9Ekawl3rwbtQ&_nc_ss=7b2a8&oh=00_Af-wxUjbM2E0nzYKolvneToOUbFJS1ZGagYjo6KPQ232Hw&oe=6A3C1981" },
  
  // Suits
  { name: "Banarasi Silk Suit Set", description: "Unstitched Banarasi silk suit with zari dupatta. Booking no 9830365132", price: 4500.00, category: "Suit", imageUrl: "https://scontent.fccu27-2.fna.fbcdn.net/v/t51.71878-15/466414442_550758961154183_523988932608343260_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1134&ctp=s960x960&_nc_cat=110&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=c1ghZE8cP1MQ7kNvwFiD7Ul&_nc_oc=AdrZvv_1DOW7rEWolIibbnk69-HEP_Xcg62NVi1vumwxpYpbGu4O16G0p5E35Qa8xkIREicxoLyeSnD8vUB4y3Qc&_nc_zt=23&_nc_ht=scontent.fccu27-2.fna&_nc_gid=0IkzQd0T7hyvBXf5_fMJpg&_nc_ss=7b2a8&oh=00_Af_3mDlFlaJ33FNZpazJ-DjmMuxDLjZNCmKAV05Ol5yMNA&oe=6A3C37C2" },
  { name: "Georgette Sharara Suit", description: "Party wear Georgette Sharara with heavy embroidery. 9830365132", price: 5500.00, category: "Suit", imageUrl: "https://scontent.fccu27-1.fna.fbcdn.net/v/t51.71878-15/504265774_710306488392499_6293807817942252654_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=103&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=oPN_vuLA1vAQ7kNvwFgjjET&_nc_oc=AdpKM7F1TYqwr9AVeb2DtnqEPMp3-m6FQootUwl4I5q8aInWCrFk4zBvadsN_K2HVpGDR1HQpdQKQ9O4o0wfuTHq&_nc_zt=23&_nc_ht=scontent.fccu27-1.fna&_nc_gid=NG1TyS4k5Pv5tB6StUIUeA&_nc_ss=7b2a8&oh=00_Af-I9Zg-AMjJX5KH0EyZNyx5Xxf8k3mM_GA1777jIgt0zg&oe=6A3C2952" },
  { name: "Cotton Salwar Kameez", description: "Everyday comfort pure cotton Salwar Kameez. 9830365132", price: 1800.00, category: "Suit", imageUrl: "https://scontent.fccu27-3.fna.fbcdn.net/v/t51.71878-15/505442513_717765570627321_7770032844258897940_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=105&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=rU5MBjBD6HMQ7kNvwFwxQTn&_nc_oc=AdpaamAZJXltJN8bT2m6V1B37GC-SrDQCqmx6Z-kKK6OSYFpfuQHyxDxXLKyQNmK1kOeHgBIEE7TzzUGOidE_GPk&_nc_zt=23&_nc_ht=scontent.fccu27-3.fna&_nc_gid=NG1TyS4k5Pv5tB6StUIUeA&_nc_ss=7b2a8&oh=00_Af_Y04EgdazZNjg3VOGZNZHPaO8bG0p5BRlkwikCyEwaJw&oe=6A3C072E" },

  // Lehengas
  { name: "Bridal Velvet Lehenga", description: "Heavy bridal velvet lehenga with zardosi work. Call 9830365132", price: 15500.00, category: "Lehenga", imageUrl: "https://scontent.fccu20-1.fna.fbcdn.net/v/t51.71878-15/504130202_757133549999693_8854744369026114540_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=101&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=F-2W1tgXEcgQ7kNvwHH_Rva&_nc_oc=Adpzt7Z-kqpoQ1s3-tMFprqEv3mqSGFi7rJKF4xFlcCzb6EFWlcVxHLqqyy1ktD0pYAA8n_FKl4Q2v3vTuwRiUBR&_nc_zt=23&_nc_ht=scontent.fccu20-1.fna&_nc_gid=1WmKmVK2WGfu5cMgWnr8WA&_nc_ss=7b2a8&oh=00_Af9Q_KcgIPxNQ6c9xZmCjPckHsyZwMWNqOJYcK39djFI0A&oe=6A3C2B8B" },
  { name: "Floral Organza Lehenga", description: "Lightweight organza lehenga for bridesmaids. Whatsapp 9830365132", price: 8500.00, category: "Lehenga", imageUrl: "https://scontent.fccu27-2.fna.fbcdn.net/v/t51.71878-15/510421194_1037381771910801_6313552506831602302_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=110&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=Pkek8N1cgHEQ7kNvwFe7cZu&_nc_oc=AdrPNJ2P2F9xaprdqfEj64gnT8vj5BtxAe94SiFstLzujZ0WutVgMsYthbJYPvqqT5BHW2aF0JVSsQdsKaUChDSe&_nc_zt=23&_nc_ht=scontent.fccu27-2.fna&_nc_gid=2laKXXVajBZgFlVenLnS7A&_nc_ss=7b2a8&oh=00_Af8zFK-GkDIAjOazTsbXjSZetxTflAmLvcj9UEuGCImJug&oe=6A3C2B7E" },
  
  // Sarees
  { name: "Kanjivaram Bridal Silk", description: "Authentic Kanjivaram silk saree with pure zari. Booking no 9830365132", price: 12500.00, category: "Saree", imageUrl: "https://scontent.fccu27-2.fna.fbcdn.net/v/t51.71878-15/505186798_3057628507734489_4309518793329778869_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=110&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=1hKpFaWIvikQ7kNvwEF0JOm&_nc_oc=Adrdh8RLjCOg9m9W5sZiKuA4H6N9zl8as3RdKcvg62Fejlc1jf0PNGFA1n_j5J11XQu2eTm-z22gyRnPNhJzJiAo&_nc_zt=23&_nc_ht=scontent.fccu27-2.fna&_nc_gid=TDPYU9-k2hNfTY1M-sK6zA&_nc_ss=7b2a8&oh=00_Af_EiHEW-gzWIqgWyhRwu_h_6myNRcv9jawsZQR1Bq0Z3w&oe=6A3C1C07" },
  { name: "Linen Jamdani Saree", description: "Comfortable linen with traditional Jamdani motifs. 9830365132", price: 3500.00, category: "Saree", imageUrl: "https://scontent.fccu20-1.fna.fbcdn.net/v/t51.71878-15/472371706_921908513346605_896117162213587663_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=108&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=Y90CxV0a43gQ7kNvwHJQ4Cn&_nc_oc=Adrm2Ul4waYFsZnNqnBcJJQTtTh7GgaAx5G9g41EYA2WKjfqUKgQN4jpEh3i6LZZ9ny5OjfyCUYkNI9aGyjMH5Fu&_nc_zt=23&_nc_ht=scontent.fccu20-1.fna&_nc_gid=xbVpQTndGtfnUuF-oQxSyQ&_nc_ss=7b2a8&oh=00_Af_ZmdSLxugKRFP_H17mEUcDImfardSEygo6TmZ7cZachQ&oe=6A3C3999" },
  { name: "Chanderi Silk Saree", description: "Translucent Chanderi silk with golden borders. 9830365132", price: 4200.00, category: "Saree", imageUrl: "https://scontent.fccu27-3.fna.fbcdn.net/v/t51.71878-15/469829036_1277512879948475_568553256927599420_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=102&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=7RhIg7W8fqYQ7kNvwHNBDY8&_nc_oc=AdoXX4zuhfMqpWnok2QKpezGHwUl1CdzkFykjGSjtMqKW_-lwIkGte7KdCR8SONsly15YWQu3_FR72dW8Wbk-hdX&_nc_zt=23&_nc_ht=scontent.fccu27-3.fna&_nc_gid=yeMxU3kZws9Ekawl3rwbtQ&_nc_ss=7b2a8&oh=00_Af-wxUjbM2E0nzYKolvneToOUbFJS1ZGagYjo6KPQ232Hw&oe=6A3C1981" },
];

async function main() {
  console.log(`Start seeding categories to PostgreSQL...`);
  
  for (const p of products) {
    const imageUrl = p.imageUrl;
    delete p.imageUrl;
    
    const product = await prisma.product.create({
      data: {
        ...p,
        media: {
          create: {
            url: imageUrl,
            type: 'IMAGE',
            isPrimary: true
          }
        }
      },
    });
    console.log(`Created product with id: ${product.id} and category: ${product.category}`);
  }
  
  console.log(`Seeding finished.`);
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
