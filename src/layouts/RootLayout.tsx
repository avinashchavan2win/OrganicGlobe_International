import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement } from 'react';
import { ScrollRestoration } from "react-router";
import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import Website from '@/layouts/Website';

/**
 * Root layout component that wraps all pages with consistent header and footer.
 *
 * To customize the header or footer, directly edit the Header.tsx and Footer.tsx
 * files in the layouts/parts directory.
 *
 * Site-wide <title> and <meta> live in the <Helmet> below. Individual pages can
 * override them by rendering their own <Helmet> — last-mounted wins.
 */
interface RootLayoutProps {
  children: ReactElement;
}
export default function RootLayout({
  children
}: RootLayoutProps) {
  return <Website>
      <Helmet>
        <title>OrganicGlobe International — Clean Food. Fair Farms. Global Reach.</title>
        <meta name="description" content="OrganicGlobe International exports certified organic produce and chemical-free food products worldwide, sourced directly from trusted farmers in Maharashtra, India." />
        {/* Explicitly allow all crawlers including Google AI, Gemini, Bing AI */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="google-extended" content="index, follow" />
        <meta name="CCBot" content="index, follow" />
        <meta name="PerplexityBot" content="index, follow" />
        <meta name="anthropic-ai" content="index, follow" />

      </Helmet>
      <ScrollRestoration />
      <Header />
      {children}
      <Footer />
    </Website>;
}
