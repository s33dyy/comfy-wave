import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryShowcase from "@/components/CategoryShowcase";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import WhyUs from "@/components/WhyUs";
import prisma from "@/lib/prisma";

const quickFilters = [
  { label: "All", href: "/shop" },
  { label: "Sarees", href: "/shop?category=Saree" },
  { label: "Kurtis", href: "/shop?category=Kurti" },
  { label: "Suits", href: "/shop?category=Suit" },
  { label: "Lehengas", href: "/shop?category=Lehenga" },
];

export const metadata = {
  title: "Comfywave | Premium Clothing",
  description: "A Kolkata atelier curating premium clothing.",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { media: { where: { isPrimary: true }, take: 1 } }
  });

  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { price: "desc" },
    include: { media: { where: { isPrimary: true }, take: 1 } }
  });

  return (
    <>
      <HeroCarousel />

      <section className="container py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-maroon mb-2">Curated This Week</p>
          <h2 className="font-display text-4xl md:text-5xl">Featured Clothing</h2>
          <div className="mx-auto w-24 gold-divider mt-4" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <CategoryShowcase />
      <WhyUs />

      <section className="container py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-maroon mb-2">The Atelier</p>
            <h2 className="font-display text-4xl md:text-5xl">Explore Catalog</h2>
          </div>
          <div className="flex gap-2 text-xs uppercase tracking-widest flex-wrap">
            {quickFilters.map((filter, index) => (
              <Link key={filter.label} href={filter.href}
                className={`px-4 py-2 border ${index === 0 ? "border-charcoal bg-charcoal text-primary-foreground" : "border-border hover:border-charcoal"}`}>
                {filter.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="rounded-none border-charcoal text-charcoal hover:bg-charcoal hover:text-primary-foreground px-10 h-12">
            <Link href="/shop">Browse Full Shop</Link>
          </Button>
        </div>
      </section>

      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container text-center max-w-2xl">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3">Atelier Story</p>
          <h2 className="font-display text-4xl md:text-5xl">Every weave is a love letter to India.</h2>
          <p className="mt-5 text-primary-foreground/80">
            Comfywave works alongside handloom clusters across India, bringing you premium clothing that do not just drape, but belong.
          </p>
          <Button asChild className="mt-8 rounded-none bg-gold text-charcoal hover:bg-gold/90 h-12 px-10">
            <Link href="/about">Read Our Story</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
