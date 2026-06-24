import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/tailwind.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Mueblerias Ahorramas - Modern Furniture Store',
    template: 'Mueblerias Ahorramas - Modern Furniture Store | %s',
  },
  description: 'Discover premium furniture for every room in your home at Mueblerias Ahorramas. Shop living rooms, bedrooms, dining rooms, and TV furniture with exclusive discounts up to 40% off. Free shipping on select items and factory-direct pricing with quality guarantee.',
  keywords: 'furniture store, modern furniture, living room furniture, bedroom furniture, dining room furniture, salas, recámaras, comedores, home decor, furniture sale, discount furniture, quality furniture',
  
  openGraph: {
    type: 'website',
    title: {
      default: 'Mueblerias Ahorramas - Modern Furniture Store',
      template: 'Mueblerias Ahorramas - Modern Furniture Store | %s',
    },
    description: 'Shop premium furniture with up to 40% off store-wide! Quality living room, bedroom, and dining furniture with factory-direct pricing, free shipping, and satisfaction guarantee. Transform your home today!',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
