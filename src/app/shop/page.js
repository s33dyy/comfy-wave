import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const metadata = {
  title: 'Shop | Comfywave',
  description: 'Browse our collection of stunning clothing.',
};

export default async function ShopPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category;

  const whereClause = currentCategory ? { category: { equals: currentCategory } } : {};
  
  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  // Get unique categories for sidebar
  const allProducts = await prisma.product.findMany({ select: { category: true } });
  const uniqueCategories = [...new Set(allProducts.map(p => p.category).filter(Boolean))].sort();

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            <Link href="/" className="hover:text-maroon transition">Home</Link> / 
            <span className="mx-1 text-foreground">Shop {currentCategory && `/ ${currentCategory}`}</span>
          </p>
          <h1 className="font-display text-4xl md:text-5xl mt-3 text-foreground">
            {currentCategory ? `${currentCategory} Collection` : 'The Full Collection'}
          </h1>
          <p className="text-muted-foreground mt-2 font-light">
            {products.length} pieces · Handpicked from Indian handloom clusters
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 grid lg:grid-cols-[260px_1fr] gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-maroon mb-4 font-semibold">Categories</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link 
                    href="/shop" 
                    className={`transition-colors hover:text-maroon ${!currentCategory ? 'text-maroon font-medium' : 'text-muted-foreground'}`}
                  >
                    All Collections ({allProducts.length})
                  </Link>
                </li>
                {uniqueCategories.map((cat) => (
                  <li key={cat}>
                    <Link 
                      href={`/shop?category=${cat}`} 
                      className={`transition-colors hover:text-maroon ${currentCategory?.toLowerCase() === cat.toLowerCase() ? 'text-maroon font-medium' : 'text-muted-foreground'}`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-border bg-secondary/30">
              <h2 className="font-display text-2xl text-foreground mb-2">No pieces found</h2>
              <p className="text-muted-foreground font-light">Try exploring another category.</p>
              <Link href="/shop" className="inline-block mt-6 border border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8 py-3 text-xs uppercase tracking-widest transition-colors duration-300">
                View All
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
