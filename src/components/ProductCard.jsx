import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          {product.imageUrl ? (
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-display">
              No Image
            </div>
          )}
        </Link>
        {product.category && (
          <span className="absolute top-3 left-3 bg-maroon text-white text-[10px] uppercase tracking-widest px-2.5 py-1">
            {product.category}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col items-center text-center space-y-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Premium Silk</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-display text-xl leading-tight hover:text-maroon transition duration-300">
            {product.name}
          </h3>
        </Link>
      </div>
    </div>
  );
}
