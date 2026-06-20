import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h2 className="font-display text-3xl tracking-widest uppercase mb-4 text-white">Comfywave</h2>
            <p className="text-ivory/70 max-w-sm font-light leading-relaxed">
              A house with stunning collections of sarees having traditional patterns with a touch of modern designs.
            </p>
          </div>
          
          <div>
            <h3 className="font-display text-xl uppercase tracking-widest mb-6 text-gold">Shop</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/shop" className="text-ivory/70 hover:text-white transition-colors duration-300">All Sarees</Link>
              <Link href="/shop?category=traditional" className="text-ivory/70 hover:text-white transition-colors duration-300">Traditional</Link>
              <Link href="/shop?category=modern" className="text-ivory/70 hover:text-white transition-colors duration-300">Modern</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-display text-xl uppercase tracking-widest mb-6 text-gold">Visit Us</h3>
            <div className="text-ivory/70 space-y-2 font-light">
              <p>Kolkata, West Bengal</p>
              <p>India</p>
              <div className="mt-6">
                <a 
                  href="https://www.facebook.com/profile.php?id=100066721575529" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-gold transition-colors duration-300 border border-ivory/20 hover:border-gold px-4 py-2 rounded-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  Follow on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-ivory/10 text-center text-ivory/50 text-sm font-light tracking-wide">
          <p>&copy; {new Date().getFullYear()} Comfywave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
