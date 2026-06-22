"use client";

import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useStoreSettings } from "@/components/SettingsProvider";

const Facebook = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Instagram = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const settings = useStoreSettings();
  const categories = [
    { slug: "Saree", name: "Sarees" },
    { slug: "Kurti", name: "Kurtis" },
    { slug: "Suit", name: "Suits" },
    { slug: "Lehenga", name: "Lehengas" },
  ];

  return (
    <footer className="bg-charcoal text-primary-foreground mt-24">
      <div className="container py-16 grid md:grid-cols-4 gap-10">
        <div>
          <span className="font-brand text-lg text-gold">{settings.name?.toUpperCase() || "COMFYWAVE"}</span>
          <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
            {settings.tagline || "A Kolkata atelier curating premium clothing from Bengal, South India and beyond. Every drape tells a story."}
          </p>
          <div className="flex gap-3 mt-5">
            {settings.instagram && <a href={settings.instagram} className="h-9 w-9 grid place-items-center border border-primary-foreground/20 hover:border-gold hover:text-gold transition" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>}
            {settings.facebook && <a href={settings.facebook} className="h-9 w-9 grid place-items-center border border-primary-foreground/20 hover:border-gold hover:text-gold transition" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>}
            {settings.whatsapp && <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} className="h-9 w-9 grid place-items-center border border-primary-foreground/20 hover:border-gold hover:text-gold transition" aria-label="WhatsApp"><MessageCircle className="h-4 w-4" /></a>}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Shop</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {categories.map((category) => (
              <li key={category.slug}><Link href={`/shop?category=${category.slug}`} className="hover:text-gold">{category.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Policies</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link href="#" className="hover:text-gold">Shipping & Delivery</Link></li>
            <li><Link href="#" className="hover:text-gold">Fabric Care Guide</Link></li>
            <li><Link href="#" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-gold">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Visit Us</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            {settings.address && <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" /> {settings.address}</li>}
            {settings.whatsappDisplay && <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-gold shrink-0" /> {settings.whatsappDisplay}</li>}
            {settings.email && <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" /> {settings.email}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} {settings.name || "Comfywave"} · Crafted in Kolkata</p>
          <p>All India Shipping · WhatsApp Booking</p>
        </div>
      </div>
    </footer>
  );
}
