import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MessageCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { title: 'Product Not Found' };
  return { title: `${product.name} | Comfywave`, description: product.description };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) return notFound();

  const settings = await prisma.storeSettings.findFirst() || {};
  const rawNumber = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : "9830365132";
  const whatsappUrl = `https://wa.me/${rawNumber}?text=Hi! I am interested in ${encodeURIComponent(product.name)} (ID: ${product.id})`;
  const images = [];
  if (product.imageUrl) images.push({ id: 'main', url: product.imageUrl });
  if (product.gallery) {
    product.gallery.forEach((url, i) => images.push({ id: `gal-${i}`, url }));
  }
  const videos = [];

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-maroon transition-colors mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Shop
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Media Gallery */}
          <div className="space-y-4">
            {videos.length > 0 && (
              <div className="aspect-[4/5] md:aspect-square bg-secondary overflow-hidden mb-4 relative group">
                 <video 
                   src={videos[0].url} 
                   controls 
                   autoPlay 
                   muted 
                   loop
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute top-4 left-4 bg-black/60 text-white text-[10px] uppercase tracking-widest px-2 py-1 backdrop-blur-sm">
                   Featured Video
                 </div>
              </div>
            )}
            
            {images.length > 0 ? (
              <div className={`grid gap-4 ${videos.length > 0 ? 'grid-cols-2' : ''}`}>
                {images.map((image, idx) => (
                  <div key={image.id} className={`bg-secondary overflow-hidden ${videos.length === 0 && idx === 0 ? 'aspect-[4/5] mb-4' : 'aspect-square'}`}>
                    <img 
                      src={image.url} 
                      alt={`${product.name} - view ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              !videos.length && (
                <div className="aspect-[4/5] bg-secondary flex items-center justify-center">
                  <p className="text-muted-foreground uppercase tracking-widest text-xs">No media available</p>
                </div>
              )
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.3em] uppercase text-maroon mb-3">{product.category}</p>
              <h1 className="font-display text-4xl md:text-5xl text-charcoal leading-tight mb-4">{product.name}</h1>
              <p className="text-2xl text-foreground/90 font-light">₹{product.price.toLocaleString('en-IN')}</p>
            </div>

            <div className="prose prose-sm md:prose-base prose-neutral text-muted-foreground font-light whitespace-pre-wrap mb-10">
              {product.description}
            </div>

            <div className="mt-auto pt-8 border-t border-border">
              <Button size="lg" asChild className="w-full sm:w-auto bg-charcoal hover:bg-maroon text-white rounded-none px-10 h-14 text-sm tracking-widest uppercase transition-colors">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Book via WhatsApp
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-4 font-light">
                Secure your piece directly with our team. We'll assist you with measurements, shipping details, and secure payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
