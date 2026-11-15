import { products } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from "react-router";
import { ArrowLeft } from 'lucide-react';
export default function ProductsPage() {
  return <>
      <Helmet>
        <title>Products — OrganicGlobe International</title>
        <meta name="description" content="Organic fruits, vegetables, and chemical-free manufactured food products from OrganicGlobe International — sourced directly from certified farmers in Maharashtra, India." />
        <link rel="canonical" href="https://organicglobeinternational.com/products" />
        <meta property="og:title" content="Products — OrganicGlobe International" />
        <meta property="og:description" content="Organic fruits, vegetables, and chemical-free manufactured food products from OrganicGlobe International — sourced directly from certified farmers in Maharashtra, India." />
        <meta property="og:url" content="https://organicglobeinternational.com/products" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://organicglobeinternational.com/airo-assets/images/logo/horizontal" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="OrganicGlobe International — Organic Products Catalog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Products — OrganicGlobe International" />
        <meta name="twitter:description" content="Organic fruits, vegetables, and chemical-free manufactured food products from OrganicGlobe International." />
        <meta name="twitter:image" content="https://organicglobeinternational.com/airo-assets/images/logo/horizontal" />
      </Helmet>
      <section className="min-h-[70vh] bg-background flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="flex flex-col items-center gap-6 max-w-lg">
          <div className="w-12 h-0.5 bg-accent" />
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">{products.placeholder.eyebrow}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {products.placeholder.heading}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            {products.placeholder.body}
          </p>
          <Link to="/" className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-secondary transition-colors mt-2">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </section>
    </>;
}
