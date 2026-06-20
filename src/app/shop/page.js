import prisma from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Shop | Comfywave',
  description: 'Browse our collection of stunning sarees.',
};

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display text-foreground mb-4">All Collections</h1>
        <div className="gold-divider"></div>
        <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
          Explore our complete catalog of premium silk and traditional sarees.
        </p>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-secondary/50 rounded-lg">
          <p className="text-muted-foreground font-display text-xl">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
}
