import { Inter, Cormorant_Garamond } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { SettingsProvider } from "@/components/SettingsProvider";
import prisma from "@/lib/prisma";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({ 
  weight: ['400', '600', '700'], 
  subsets: ['latin'], 
  variable: '--font-cormorant' 
});

export const metadata = {
  title: "Comfywave | Premium Clothing",
  description: "A house with stunning collections of clothing having traditional patterns with a touch of modern designs.",
};

export default async function RootLayout({ children }) {
  const settings = await prisma.storeSettings.findFirst() || {};
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <SettingsProvider settings={settings}>
          <Header />
          <main className="min-h-screen">
            <Providers>{children}</Providers>
          </main>
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}
