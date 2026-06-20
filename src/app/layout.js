import { Inter, Cormorant_Garamond } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({ 
  weight: ['400', '600', '700'], 
  subsets: ['latin'], 
  variable: '--font-cormorant' 
});

export const metadata = {
  title: "Comfywave | Premium Sarees",
  description: "A house with stunning collections of sarees having traditional patterns with a touch of modern designs. Shop and feel the comfort...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
