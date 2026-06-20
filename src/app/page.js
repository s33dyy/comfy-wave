import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/prisma';

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({ take: 8 });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-ivory">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 z-0"></div>
        <div className="container relative z-10 text-center max-w-4xl px-4">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-maroon font-semibold mb-6 animate-fade-up">
            Welcome to Comfywave
          </p>
          <h1 className="text-5xl md:text-7xl font-display text-foreground mb-6 leading-tight">
            Stunning Collections of <br />
            <span className="italic font-light">Premium Sarees</span>
          </h1>
          <div className="gold-divider my-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our carefully curated collection featuring traditional patterns infused with a touch of modern elegance. Experience the pinnacle of comfort and style.
          </p>
          <Link 
            href="/shop" 
            className="inline-block bg-charcoal hover:bg-maroon text-white px-10 py-4 rounded-none uppercase tracking-widest text-xs font-medium transition-all duration-300 shadow-elegant hover:-translate-y-1"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">Featured Arrivals</h2>
            <div className="gold-divider"></div>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-secondary/50 rounded-lg">
              <p className="text-muted-foreground font-display text-xl">Curating our latest collections...</p>
            </div>
          )}
          
          <div className="mt-16 text-center">
            <Link 
              href="/shop" 
              className="inline-block border border-border hover:border-maroon text-foreground hover:text-maroon px-10 py-4 uppercase tracking-widest text-xs font-medium transition-colors duration-300"
            >
              View All Sarees
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
