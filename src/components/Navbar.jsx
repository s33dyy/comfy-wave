import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-ivory/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-widest uppercase text-foreground hover:text-maroon transition-colors duration-300">
          Comfywave
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-maroon transition-colors duration-300">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-maroon transition-colors duration-300">
            Shop
          </Link>
        </div>
      </div>
    </nav>
  );
}
