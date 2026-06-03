import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NUV Aromas | Velas Aromáticas e Óleos Essenciais Premium",
  description: "Descubra as velas aromáticas e óleos essenciais da NUV Aromas. Produtos criados artesanalmente com cera vegetal pura e aromas que abraçam a sua rotina.",
  icons: {
    icon: "/logo_nuv.png",
    shortcut: "/logo_nuv.png",
    apple: "/logo_nuv.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "NUV Aromas",
                "image": "https://nuvaromas.site/logo_nuv.png",
                "@id": "https://nuvaromas.site/#localbusiness",
                "url": "https://nuvaromas.site",
                "telephone": "+5531999384130",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Savassi",
                  "addressLocality": "Belo Horizonte",
                  "addressRegion": "MG",
                  "postalCode": "30110-000",
                  "addressCountry": "BR"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": -19.9388,
                  "longitude": -43.9338
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                "sameAs": [
                  "https://www.instagram.com/nuv.essenciais"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "NUV Aromas",
                "url": "https://nuvaromas.site",
                "logo": "https://nuvaromas.site/logo_nuv.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+55-31-99938-4130",
                  "contactType": "customer support",
                  "email": "contato@nuvaromas.site",
                  "availableLanguage": "Portuguese"
                },
                "sameAs": [
                  "https://www.instagram.com/nuv.essenciais"
                ],
                "areaServed": "Belo Horizonte e Região Metropolitana"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "NUV Aromas",
                "url": "https://nuvaromas.site"
              }
            ])
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-inter bg-[#FAF8F6] text-[#252525] selection:bg-[#B89AF7] selection:text-white">
        <CartProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
