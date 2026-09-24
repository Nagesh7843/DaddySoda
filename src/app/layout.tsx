import type { Metadata } from 'next';
import { Bebas_Neue, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import MobileNav from '@/components/layout/MobileNav';
import CartDrawer from '@/components/layout/CartDrawer';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { RewardsProvider } from '@/context/RewardsContext';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Daddy Soda | Sip Loud. Live Louder. Rebellious Craft Fountain Drinks',
  description:
    'Daddy Soda is the premier craft dirty soda bar. Mix craft colas, fresh purees, velvety cold foams, and popping boba. Your Soda. Your Rules.',
  keywords: ['dirty soda', 'craft soda', 'daddy soda', 'boba drink', 'fountain drinks', 'cold foam'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FFF8ED] text-[#171717] antialiased">
        <RewardsProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileNav />
          </CartProvider>
        </RewardsProvider>
      </body>
    </html>
  );
}
