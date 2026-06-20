import Link from "next/link";

const categories = [
  { name: "Saree", slug: "Saree", imageUrl: "https://scontent.fccu27-2.fna.fbcdn.net/v/t51.71878-15/505186798_3057628507734489_4309518793329778869_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=110&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=1hKpFaWIvikQ7kNvwEF0JOm&_nc_oc=Adrdh8RLjCOg9m9W5sZiKuA4H6N9zl8as3RdKcvg62Fejlc1jf0PNGFA1n_j5J11XQu2eTm-z22gyRnPNhJzJiAo&_nc_zt=23&_nc_ht=scontent.fccu27-2.fna&_nc_gid=TDPYU9-k2hNfTY1M-sK6zA&_nc_ss=7b2a8&oh=00_Af_EiHEW-gzWIqgWyhRwu_h_6myNRcv9jawsZQR1Bq0Z3w&oe=6A3C1C07", count: 8 },
  { name: "Kurti", slug: "Kurti", imageUrl: "https://scontent.fccu27-2.fna.fbcdn.net/v/t51.71878-15/510421194_1037381771910801_6313552506831602302_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=110&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=Pkek8N1cgHEQ7kNvwFe7cZu&_nc_oc=AdrPNJ2P2F9xaprdqfEj64gnT8vj5BtxAe94SiFstLzujZ0WutVgMsYthbJYPvqqT5BHW2aF0JVSsQdsKaUChDSe&_nc_zt=23&_nc_ht=scontent.fccu27-2.fna&_nc_gid=2laKXXVajBZgFlVenLnS7A&_nc_ss=7b2a8&oh=00_Af8zFK-GkDIAjOazTsbXjSZetxTflAmLvcj9UEuGCImJug&oe=6A3C2B7E", count: 5 },
  { name: "Suit", slug: "Suit", imageUrl: "https://scontent.fccu27-2.fna.fbcdn.net/v/t51.71878-15/466414442_550758961154183_523988932608343260_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1134&ctp=s960x960&_nc_cat=110&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=c1ghZE8cP1MQ7kNvwFiD7Ul&_nc_oc=AdrZvv_1DOW7rEWolIibbnk69-HEP_Xcg62NVi1vumwxpYpbGu4O16G0p5E35Qa8xkIREicxoLyeSnD8vUB4y3Qc&_nc_zt=23&_nc_ht=scontent.fccu27-2.fna&_nc_gid=0IkzQd0T7hyvBXf5_fMJpg&_nc_ss=7b2a8&oh=00_Af_3mDlFlaJ33FNZpazJ-DjmMuxDLjZNCmKAV05Ol5yMNA&oe=6A3C37C2", count: 5 },
  { name: "Lehenga", slug: "Lehenga", imageUrl: "https://scontent.fccu20-1.fna.fbcdn.net/v/t51.71878-15/504130202_757133549999693_8854744369026114540_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=101&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=F-2W1tgXEcgQ7kNvwHH_Rva&_nc_oc=Adpzt7Z-kqpoQ1s3-tMFprqEv3mqSGFi7rJKF4xFlcCzb6EFWlcVxHLqqyy1ktD0pYAA8n_FKl4Q2v3vTuwRiUBR&_nc_zt=23&_nc_ht=scontent.fccu20-1.fna&_nc_gid=1WmKmVK2WGfu5cMgWnr8WA&_nc_ss=7b2a8&oh=00_Af9Q_KcgIPxNQ6c9xZmCjPckHsyZwMWNqOJYcK39djFI0A&oe=6A3C2B8B", count: 5 },
];

export default function CategoryShowcase() {
  return (
    <section className="container py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-maroon mb-2">Browse by Weave</p>
          <h2 className="font-display text-4xl md:text-5xl">Shop by Category</h2>
        </div>
        <Link href="/shop" className="text-sm uppercase tracking-widest text-charcoal hover:text-maroon hidden md:inline-block">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Link key={category.slug} href={`/shop?category=${category.slug}`}
            className={`group relative aspect-[3/4] overflow-hidden bg-secondary ${index === 0 ? "md:row-span-2 md:col-span-2 md:aspect-auto" : ""}`}>
            <img src={category.imageUrl} alt={category.name} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">{category.count} pieces</p>
              <h3 className="font-display text-xl md:text-2xl text-primary-foreground leading-tight">{category.name}</h3>
              <span className="inline-block mt-2 text-xs text-primary-foreground/80 border-b border-gold/60 pb-0.5">Explore</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
