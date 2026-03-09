import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atomy.com'),
  title: {
    default: "Atomy | Tu Camino hacia el Bienestar y Éxito Financiero",
    template: "%s | Atomy Latinoamérica"
  },
  description: "Atomy - Líder global en productos de bienestar con tecnología coreana. Únete a nuestra comunidad de más de 16 millones de personas en + 52 Países. Productos Orgánicos de uso diario con tecnología Coreana a precios accesibles e Ingresos Residuales.",
  keywords: [
    "Atomy",
    "productos orgánicos Atomy",
    "bienestar",
    "salud",
    "cuidado de la piel",
    "suplementos",
    "ingreso residual",
    "network marketing",
    "MLM",
    "oportunidad de negocio",
    "productos coreanos",
    "biotecnología",
    "higiene personal",
    "cosméticos",
    "Atomy Latinoamérica",
    "membresía Atomy"
  ],
  authors: [{ name: "Atomy Latinoamérica", url: "https://atomy.com" }],
  creator: "Atomy",
  publisher: "Atomy Latinoamérica",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: "https://atomy.com",
    siteName: "Atomy Latinoamérica",
    title: "Atomy | Tu Camino hacia el Bienestar y Éxito Financiero",
    description: "Únete a más de 16 millones de personas en + 52 Países. Productos Orgánicos de uso diario con tecnología Coreana a precios accesibles e Ingresos Residuales.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Atomy - Bienestar y Éxito Financiero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atomy | Bienestar y Oportunidad de Negocio",
    description: "Únete a más de 16 millones de personas en + 52 Países. Productos Orgánicos de uso diario con tecnología Coreana a precios accesibles e Ingresos Residuales.",
    images: ["/og-image.jpg"],
    creator: "@atomy",
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://atomy.com",
    languages: {
      "es-LA": "https://atomy.com",
      "en-US": "https://atomy.com/us",
      "pt-BR": "https://atomy.com/br",
    },
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0891b2" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Atomy" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Atomy",
              "url": "https://atomy.com",
              "logo": "https://atomy.com/logo.png",
              "description": "Empresa global de bienestar con productos de tecnología coreana",
              "foundingDate": "2009",
              "founder": {
                "@type": "Person",
                "name": "Han-Gill Park"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KR",
                "addressLocality": "Seúl"
              },
              "sameAs": [
                "https://www.facebook.com/atomyglobal",
                "https://www.instagram.com/atomyglobal",
                "https://www.youtube.com/atomyglobal"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["Spanish", "English", "Portuguese"]
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
