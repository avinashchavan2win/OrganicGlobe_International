import { farmer_partnership } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from "react-router";
import { ArrowLeft } from 'lucide-react';
export default function FarmerPartnershipPage() {
  return <>
      <Helmet>
        <title>Farmer Partnership — OrganicGlobe International</title>
        <meta name="description" content="How OrganicGlobe International partners directly with farmers in Maharashtra, eliminating middlemen and increasing farmer income by 150%+." />
        <link rel="canonical" href="https://organicglobeinternational.com/farmer-partnership" />
        <meta property="og:title" content="Farmer Partnership — OrganicGlobe International" />
        <meta property="og:description" content="How OrganicGlobe International partners directly with farmers in Maharashtra, eliminating middlemen and increasing farmer income by 150%+." />
        <meta property="og:url" content="https://organicglobeinternational.com/farmer-partnership" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://organicglobeinternational.com/airo-assets/images/logo/horizontal" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="OrganicGlobe International — Direct Farmer Partnership Model" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Farmer Partnership — OrganicGlobe International" />
        <meta name="twitter:description" content="How OrganicGlobe International partners directly with farmers in Maharashtra, eliminating middlemen and increasing farmer income by 150%+." />
        <meta name="twitter:image" content="https://organicglobeinternational.com/airo-assets/images/logo/horizontal" />
      </Helmet>
      <section className="min-h-[70vh] bg-background flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="flex flex-col items-center gap-6 max-w-lg">
          <div className="w-12 h-0.5 bg-accent" />
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">{farmer_partnership.placeholder.eyebrow}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {farmer_partnership.placeholder.heading}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            {farmer_partnership.placeholder.body}
          </p>
          <Link to="/" className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-secondary transition-colors mt-2">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </section>
    </>;
}
