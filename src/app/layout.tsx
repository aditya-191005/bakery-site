import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingCart } from "@/components/cart/FloatingCart";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAKA BAKERY | Fresh Cakes & Bakes in Bhiwani",
  description: "Fresh cakes, pastries, and bakery items for every celebration. Order daily fresh cakes at KAKA Bakery, Shop No. 27/8, Near Sabzi Mandi, Bhiwani.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-sans bg-cream text-chocolate relative overflow-x-hidden`}
      >
        <div className="noise-overlay" />
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <FloatingCart />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
