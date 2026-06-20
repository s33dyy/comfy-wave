import Link from "next/link";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product }) {
  // Comfywave products don't have slugs natively yet, using ID for routing if needed
  // But wait, the user wants "contact in whatsapp" like Adhunik Mahal.
  const whatsappUrl = `https://wa.me/9830365132?text=Hi! I am interested in ${encodeURIComponent(product.name)}`;

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Link href={`/product/${product.id}`}>
          <img src={product.imageUrl} alt={product.name} loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </Link>
        {product.category && (
          <span className="absolute top-3 left-3 bg-maroon text-primary-foreground text-[10px] uppercase tracking-widest px-2.5 py-1">
            {product.category}
          </span>
        )}
        <Button size="sm" asChild
          className="absolute bottom-0 left-0 right-0 rounded-none bg-charcoal hover:bg-maroon text-primary-foreground translate-y-full group-hover:translate-y-0 transition-transform h-11">
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp to Book
          </a>
        </Button>
      </div>
      <div className="mt-3 space-y-1 text-center">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-display text-lg leading-tight hover:text-maroon transition">{product.name}</h3>
        </Link>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] bg-secondary animate-pulse" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-1/3 bg-secondary animate-pulse mx-auto" />
        <div className="h-5 w-3/4 bg-secondary animate-pulse mx-auto" />
      </div>
    </div>
  );
}
