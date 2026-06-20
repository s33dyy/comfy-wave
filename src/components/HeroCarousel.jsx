"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: "h1",
    eyebrow: "New Arrival",
    title: "The Bengal\nWeave",
    subtitle: "Explore our latest collection of handwoven Jamdani and Kantha stitch sarees, crafted with love.",
    imageUrl: "https://scontent.fccu27-2.fna.fbcdn.net/v/t51.71878-15/505186798_3057628507734489_4309518793329778869_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=110&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=1hKpFaWIvikQ7kNvwEF0JOm&_nc_oc=Adrdh8RLjCOg9m9W5sZiKuA4H6N9zl8as3RdKcvg62Fejlc1jf0PNGFA1n_j5J11XQu2eTm-z22gyRnPNhJzJiAo&_nc_zt=23&_nc_ht=scontent.fccu27-2.fna&_nc_gid=TDPYU9-k2hNfTY1M-sK6zA&_nc_ss=7b2a8&oh=00_Af_EiHEW-gzWIqgWyhRwu_h_6myNRcv9jawsZQR1Bq0Z3w&oe=6A3C1C07",
    ctaLabel: "Shop Sarees",
    ctaHref: "/shop?category=Saree",
    align: "left",
  },
  {
    id: "h2",
    eyebrow: "Wedding Edit",
    title: "Bridal\nHeirlooms",
    subtitle: "Stunning lehengas and suits curated for your special day.",
    imageUrl: "https://scontent.fccu20-1.fna.fbcdn.net/v/t51.71878-15/504130202_757133549999693_8854744369026114540_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1136&ctp=s960x960&_nc_cat=101&ccb=1-7&_nc_sid=b5ba86&_nc_ohc=F-2W1tgXEcgQ7kNvwHH_Rva&_nc_oc=Adpzt7Z-kqpoQ1s3-tMFprqEv3mqSGFi7rJKF4xFlcCzb6EFWlcVxHLqqyy1ktD0pYAA8n_FKl4Q2v3vTuwRiUBR&_nc_zt=23&_nc_ht=scontent.fccu20-1.fna&_nc_gid=1WmKmVK2WGfu5cMgWnr8WA&_nc_ss=7b2a8&oh=00_Af9Q_KcgIPxNQ6c9xZmCjPckHsyZwMWNqOJYcK39djFI0A&oe=6A3C2B8B",
    ctaLabel: "Explore Bridal",
    ctaHref: "/shop?category=Lehenga",
    align: "right",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-secondary">
      <div className="relative h-[78vh] min-h-[520px] max-h-[760px]">
        {slides.map((slide, slideIndex) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === slideIndex ? "opacity-100" : "opacity-0"}`}>
            <img src={slide.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/30 to-transparent" style={{ direction: slide.align === "right" ? "rtl" : "ltr" }} />
            <div className="container relative h-full flex items-center">
              <div className={`max-w-xl ${slide.align === "right" ? "ml-auto text-right" : ""}`}>
                <p className="text-[11px] tracking-[0.3em] uppercase text-maroon mb-4 animate-fade-up">{slide.eyebrow}</p>
                <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-charcoal whitespace-pre-line animate-fade-up">{slide.title}</h1>
                <p className="mt-5 text-base text-muted-foreground max-w-md animate-fade-up">{slide.subtitle}</p>
                <div className={`mt-7 flex gap-3 ${slide.align === "right" ? "justify-end" : ""} animate-fade-up`}>
                  <Button asChild size="lg" className="bg-maroon hover:bg-maroon-deep text-primary-foreground rounded-none px-8 h-12">
                    <Link href={slide.ctaHref}>{slide.ctaLabel}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-primary-foreground rounded-none px-8 h-12">
                    <Link href="/shop">Shop All</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((slide, slideIndex) => (
            <button key={slide.id} onClick={() => setIndex(slideIndex)} aria-label={`slide ${slideIndex + 1}`}
              className={`h-1 transition-all ${index === slideIndex ? "w-10 bg-maroon" : "w-6 bg-charcoal/30"}`} />
          ))}
        </div>
      </div>
      <div className="bg-charcoal text-primary-foreground overflow-hidden">
        <div className="flex gap-12 py-3 animate-marquee whitespace-nowrap text-xs uppercase tracking-[0.25em]">
          {Array(2).fill(0).map((_, loop) => (
            <div key={loop} className="flex gap-12 shrink-0">
              <span className="text-gold">Handloom Certified</span>
              <span>Free Shipping All India</span>
              <span className="text-gold">Free Shipping</span>
              <span>WhatsApp to Order</span>
              <span className="text-gold">Curated in Kolkata</span>
              <span>7-day Exchange</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
