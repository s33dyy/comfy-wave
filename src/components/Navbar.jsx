"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-ivory/95 backdrop-blur-md">
      {/* Top Banner (Reference from Adhunik Mahal) */}
      <div className="bg-maroon text-primary-foreground text-xs">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <p className="hidden sm:block tracking-wider uppercase">Free shipping across India</p>
          <p className="sm:hidden text-center w-full">Free India shipping</p>
          <div className="hidden md:flex items-center gap-4 text-[11px]">
            <span className="text-gold">Support: 9830365132</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 -ml-2 text-foreground"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="font-display text-2xl tracking-widest uppercase text-foreground hover:text-maroon transition-colors duration-300">
          Comfywave
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-maroon transition-colors duration-300">
            Home
          </Link>
          <div className="relative group">
            <Link href="/shop" className="text-sm font-medium flex items-center gap-1 uppercase tracking-widest text-muted-foreground hover:text-maroon transition-colors duration-300 py-4">
              Shop <ChevronDown className="h-4 w-4" />
            </Link>
            <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-border shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <Link href="/shop?category=Saree" className="block px-4 py-3 text-sm text-foreground hover:bg-secondary hover:text-maroon">Sarees</Link>
              <Link href="/shop?category=Kurti" className="block px-4 py-3 text-sm text-foreground hover:bg-secondary hover:text-maroon border-t border-border">Kurtis</Link>
              <Link href="/shop?category=Suit" className="block px-4 py-3 text-sm text-foreground hover:bg-secondary hover:text-maroon border-t border-border">Suits</Link>
              <Link href="/shop?category=Lehenga" className="block px-4 py-3 text-sm text-foreground hover:bg-secondary hover:text-maroon border-t border-border">Lehengas</Link>
            </div>
          </div>
        </div>
        
        {/* Placeholder for visual balance on mobile since logo is centered-ish with menu on left */}
        <div className="w-6 md:hidden"></div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="relative w-4/5 max-w-sm bg-background h-full shadow-xl flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-display text-xl tracking-widest uppercase text-maroon">Comfywave</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium uppercase tracking-widest text-foreground py-2 border-b border-border/50">
                Home
              </Link>
              
              <div>
                <button 
                  onClick={() => setMobileShopOpen(!mobileShopOpen)}
                  className="flex items-center justify-between w-full text-lg font-medium uppercase tracking-widest text-foreground py-2 border-b border-border/50"
                >
                  Shop
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileShopOpen && (
                  <div className="flex flex-col pl-4 mt-2 border-l-2 border-maroon/20">
                    <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm text-muted-foreground hover:text-maroon">View All Collections</Link>
                    <Link href="/shop?category=Saree" onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm text-muted-foreground hover:text-maroon">Sarees</Link>
                    <Link href="/shop?category=Kurti" onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm text-muted-foreground hover:text-maroon">Kurtis</Link>
                    <Link href="/shop?category=Suit" onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm text-muted-foreground hover:text-maroon">Suits</Link>
                    <Link href="/shop?category=Lehenga" onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm text-muted-foreground hover:text-maroon">Lehengas</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
