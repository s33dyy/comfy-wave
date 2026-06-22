import prisma from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  const settings = await prisma.storeSettings.findFirst() || {};
  const rawNumber = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : "919830365132";
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(`Hi ${settings.name || 'Comfywave'}! I'm interested in the ${product.name}. Could you share more details?`)}`;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          <Link href="/" className="hover:text-maroon transition">Home</Link> / 
          <Link href="/shop" className="hover:text-maroon transition mx-1">Shop</Link> / 
          <span className="mx-1 text-foreground">{product.name}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 pb-16">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] bg-secondary overflow-hidden shadow-card">
            {product.imageUrl ? (
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-display text-muted-foreground">
                No Image Available
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-maroon font-semibold">
            {product.category || 'Premium Collection'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl mt-3 text-foreground leading-tight">
            {product.name}
          </h1>
          
          <div className="gold-divider my-8 ml-0"></div>
          
          <div className="text-foreground/80 leading-relaxed space-y-4">
            <p>{product.description || "Discover the elegance of this exquisite piece from Comfywave. Handcrafted to perfection, offering a blend of traditional motifs and modern comfort."}</p>
          </div>

          <div className="mt-8 space-y-4 text-sm">
            <div className="flex justify-between border-b border-border pb-3">
              <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Fabric</span>
              <span className="font-medium text-foreground">Premium Silk Blend</span>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Care</span>
              <span className="font-medium text-foreground">Dry Clean Only</span>
            </div>
          </div>

          <div className="mt-12">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-none uppercase tracking-widest text-xs font-semibold transition-all duration-300 shadow-elegant hover:-translate-y-1"
            >
              Inquire on WhatsApp
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>
          
          <div className="mt-10 grid grid-cols-3 gap-4 text-center text-xs uppercase tracking-widest text-muted-foreground">
            <div><span className="block text-maroon mb-2 text-xl">✨</span> Premium Quality</div>
            <div><span className="block text-maroon mb-2 text-xl">🧵</span> Authentic Fabric</div>
            <div><span className="block text-maroon mb-2 text-xl">🤝</span> Trusted Service</div>
          </div>
        </div>
      </div>
    </div>
  );
}
