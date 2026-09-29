import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileEmergencyBar from '@/components/layout/MobileEmergencyBar';
import GlobalAIWidgets from '@/components/ai/GlobalAIWidgets';
import { SITE_CONFIG } from '@/constants/data';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Storm Damage & Emergency Roofing`,
  description: `${SITE_CONFIG.name} provides 24/7 emergency roof repairs, rapid tarping, 4K drone forensic inspections, and insurance claims navigation across Central Texas.`,
  openGraph: {
    title: `${SITE_CONFIG.name} | Storm Damage & Emergency Roofing`,
    description: `${SITE_CONFIG.name} provides 24/7 emergency roof repairs, rapid tarping, 4K drone forensic inspections, and insurance claims navigation across Central Texas.`,
    type: 'website',
    locale: 'en_US',
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.heroImage,
        width: 1200,
        height: 630,
        alt: 'StormGuard Roofing Tactical Deployment Units',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | Storm Damage & Emergency Roofing`,
    description: `${SITE_CONFIG.name} provides 24/7 emergency roof repairs, rapid tarping, 4K drone forensic inspections, and insurance claims navigation across Central Texas.`,
    images: [SITE_CONFIG.heroImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className="bg-[#111418] text-[#e1e2e8] min-h-screen flex flex-col font-body-md antialiased selection:bg-[#fbbf24] selection:text-[#6c4f00]">
        <Header />
        <main className="flex-1 w-full pt-20 bg-[#111418]">
          {children}
        </main>
        <GlobalAIWidgets />
        <MobileEmergencyBar />
        <Footer />
      </body>
    </html>
  );
}
