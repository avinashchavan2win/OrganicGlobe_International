import { Helmet } from '@dr.pogodin/react-helmet';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { Leaf, Factory, Globe2, ArrowRight } from 'lucide-react';
import { home } from 'virtual:content';

// ─── Animated Counter ───────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: {target: number;suffix?: string;}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, motionVal, target]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>);

}

// ─── Globe SVG Illustration ──────────────────────────────────────────────────
function GlobeIllustration() {
  return (
    <motion.svg
      viewBox="0 0 400 400"
      className="w-full h-full opacity-20"
      animate={{ rotate: 360 }}
      transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}>
      
      <circle cx="200" cy="200" r="180" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
      <ellipse cx="200" cy="200" rx="90" ry="180" fill="none" stroke="#C9A84C" strokeWidth="1" />
      <ellipse cx="200" cy="200" rx="150" ry="180" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
      <line x1="20" y1="200" x2="380" y2="200" stroke="#C9A84C" strokeWidth="0.8" />
      <line x1="200" y1="20" x2="200" y2="380" stroke="#C9A84C" strokeWidth="0.8" />
      <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#C9A84C" strokeWidth="0.7" />
      <ellipse cx="200" cy="200" rx="180" ry="110" fill="none" stroke="#C9A84C" strokeWidth="0.6" />
      {/* Leaf accent */}
      <path
        d="M200 60 C220 80 240 120 200 140 C160 120 180 80 200 60Z"
        fill="#C9A84C"
        opacity="0.6" />
      
      <path d="M200 60 L200 140" stroke="#1B4332" strokeWidth="1.5" />
    </motion.svg>);

}

// ─── World Map SVG ───────────────────────────────────────────────────────────
function WorldMapSVG() {
  return (
    <svg viewBox="0 0 800 400" className="w-full h-full opacity-15" fill="none">
      {/* Simplified continent outlines */}
      {/* North America */}
      <path d="M80 80 L160 70 L200 100 L220 160 L180 200 L140 220 L100 200 L70 160 Z" stroke="#C9A84C" strokeWidth="1.5" fill="#C9A84C" fillOpacity="0.1" />
      {/* South America */}
      <path d="M160 240 L200 230 L220 280 L210 340 L180 360 L150 340 L140 290 Z" stroke="#C9A84C" strokeWidth="1.5" fill="#C9A84C" fillOpacity="0.1" />
      {/* Europe */}
      <path d="M340 60 L400 55 L420 90 L400 120 L360 130 L330 110 Z" stroke="#C9A84C" strokeWidth="1.5" fill="#C9A84C" fillOpacity="0.1" />
      {/* Africa */}
      <path d="M340 150 L400 140 L430 180 L420 260 L390 300 L350 290 L320 250 L320 190 Z" stroke="#C9A84C" strokeWidth="1.5" fill="#C9A84C" fillOpacity="0.1" />
      {/* Asia / India */}
      <path d="M460 60 L600 50 L660 100 L680 160 L640 200 L580 220 L520 200 L480 160 L440 120 Z" stroke="#C9A84C" strokeWidth="1.5" fill="#C9A84C" fillOpacity="0.1" />
      {/* India highlight */}
      <path d="M540 150 L570 145 L585 175 L570 210 L545 215 L525 190 L525 165 Z" stroke="#C9A84C" strokeWidth="2" fill="#C9A84C" fillOpacity="0.35" />
      {/* Australia */}
      <path d="M600 250 L680 240 L710 280 L700 320 L660 340 L610 320 L590 290 Z" stroke="#C9A84C" strokeWidth="1.5" fill="#C9A84C" fillOpacity="0.1" />
      {/* Glowing dots */}
      {/* India */}
      <circle cx="555" cy="180" r="6" fill="#C9A84C" opacity="0.9" />
      <circle cx="555" cy="180" r="12" fill="#C9A84C" opacity="0.2" />
      {/* UAE */}
      <circle cx="500" cy="170" r="5" fill="#C9A84C" opacity="0.8" />
      <circle cx="500" cy="170" r="10" fill="#C9A84C" opacity="0.15" />
      {/* Europe */}
      <circle cx="375" cy="90" r="5" fill="#C9A84C" opacity="0.8" />
      <circle cx="375" cy="90" r="10" fill="#C9A84C" opacity="0.15" />
      {/* USA */}
      <circle cx="150" cy="140" r="5" fill="#C9A84C" opacity="0.8" />
      <circle cx="150" cy="140" r="10" fill="#C9A84C" opacity="0.15" />
      {/* Connection lines */}
      <line x1="555" y1="180" x2="500" y2="170" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
      <line x1="555" y1="180" x2="375" y2="90" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
      <line x1="555" y1="180" x2="150" y2="140" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
    </svg>);

}

// ─── What We Do Card ─────────────────────────────────────────────────────────
interface WhatWeDoCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: number;
}

function WhatWeDoCard({ icon, title, body, delay }: WhatWeDoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' as const }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(27,67,50,0.12)' }}
      className="bg-card rounded-2xl p-8 border-t-2 border-accent flex flex-col gap-4 cursor-default transition-shadow duration-300">
      
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="font-heading text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
    </motion.div>);

}

// ─── Flag helpers ────────────────────────────────────────────────────────────
function flagEmojiToIso(emoji: string): string | null {
  const pts = [...emoji].map((c) => c.codePointAt(0) ?? 0);
  if (pts.length === 2 && pts[0] >= 0x1f1e6 && pts[0] <= 0x1f1ff) {
    return String.fromCharCode(pts[0] - 0x1f1e6 + 65, pts[1] - 0x1f1e6 + 65).toLowerCase();
  }
  return null;
}

function flagImg(emoji: string, label: string) {
  const iso = flagEmojiToIso(emoji);
  if (!iso) return <span className="text-lg leading-none">{emoji}</span>;
  return (
    <img
      src={`https://flagcdn.com/20x15/${iso}.png`}
      srcSet={`https://flagcdn.com/40x30/${iso}.png 2x`}
      width={20}
      height={15}
      alt={label}
      loading="lazy"
      className="rounded-sm object-cover flex-shrink-0"
    />
  );
}

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [notifyError, setNotifyError] = useState('');
  const [showAllRegions, setShowAllRegions] = useState(false);

  const headline = 'Pure From the Farm. Delivering to the World.';
  const words = headline.split(' ');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotifyLoading(true);
    setNotifyError('');
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: notifyEmail })
      });
      if (!res.ok) throw new Error('Failed');
      setNotifySubmitted(true);
    } catch {
      setNotifyError('Something went wrong. Please try again.');
    } finally {
      setNotifyLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>OrganicGlobe International — Pure From the Farm. Delivering to the World.</title>
        <meta name="description" content="OrganicGlobe International exports certified organic produce and chemical-free food products worldwide, sourced directly from trusted farmers in Maharashtra, India. No middlemen. No chemicals. No compromise." />
        <link rel="canonical" href="https://organicglobeinternational.com/" />
        <meta property="og:title" content="OrganicGlobe International — Pure From the Farm. Delivering to the World." />
        <meta property="og:description" content="OrganicGlobe International exports certified organic produce and chemical-free food products worldwide, sourced directly from trusted farmers in Maharashtra, India." />
        <meta property="og:url" content="https://organicglobeinternational.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://organicglobeinternational.com/airo-assets/images/pages/home/vision-produce" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="OrganicGlobe International — Pure From the Farm. Delivering to the World." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OrganicGlobe International — Pure From the Farm. Delivering to the World." />
        <meta name="twitter:description" content="OrganicGlobe International exports certified organic produce and chemical-free food products worldwide, sourced directly from trusted farmers in Maharashtra, India." />
        <meta name="twitter:image" content="https://organicglobeinternational.com/airo-assets/images/pages/home/vision-produce" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="google-extended" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': 'https://organicglobeinternational.com/#organization',
              name: 'OrganicGlobe International',
              url: 'https://organicglobeinternational.com',
              logo: 'https://organicglobeinternational.com/airo-assets/images/logo/horizontal',
              description: 'OrganicGlobe International is a Maharashtra, India-based organic produce export company that supplies certified chemical-free fruits, vegetables, jaggery, and cold-pressed oils directly from Indian farmers to international buyers worldwide.',
              foundingDate: '2023',
              founder: {
                '@type': 'Person',
                '@id': 'https://organicglobeinternational.com/leadership#founder',
                name: 'Avinash Chavan',
                jobTitle: 'Founder & Managing Director',
                description: 'Avinash Chavan is the Founder and Managing Director of OrganicGlobe International, an organic produce export company based in Maharashtra, India. He founded the company in 2023 to bridge the gap between Indian organic farmers and international buyers, eliminating middlemen and ensuring fair pricing for growers.',
                worksFor: { '@id': 'https://organicglobeinternational.com/#organization' },
                address: {
                  '@type': 'PostalAddress',
                  addressRegion: 'Maharashtra',
                  addressCountry: 'IN'
                },
                url: 'https://organicglobeinternational.com/leadership',
                image: 'https://organicglobeinternational.com/assets/IMG_20220816_103623_610.jpg'
              },
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Maharashtra',
                addressCountry: 'IN'
              },
              areaServed: 'Worldwide',
              knowsAbout: ['Organic produce export', 'Chemical-free farming', 'Agricultural supply chain', 'Farmer partnerships', 'International trade']
            },
            {
              '@type': 'WebSite',
              '@id': 'https://organicglobeinternational.com/#website',
              url: 'https://organicglobeinternational.com',
              name: 'OrganicGlobe International',
              publisher: { '@id': 'https://organicglobeinternational.com/#organization' }
            },
            {
              '@type': 'WebPage',
              '@id': 'https://organicglobeinternational.com/#webpage',
              url: 'https://organicglobeinternational.com',
              name: 'OrganicGlobe International — Pure From the Farm. Delivering to the World.',
              isPartOf: { '@id': 'https://organicglobeinternational.com/#website' },
              about: { '@id': 'https://organicglobeinternational.com/#organization' }
            }
          ]
        }).replace(/</g, '\\u003c')}</script>
      </Helmet>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-primary flex flex-col items-center justify-center overflow-hidden px-4 py-24">
        {/* Background globe */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] max-w-full">
            <GlobeIllustration />
          </div>
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #1B4332 75%)' }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-8">
          {/* Coming Back Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-6xl flex items-center gap-2 px-5 py-2 rounded-full border border-accent/60 bg-accent/10 font-bold"><span className="w-2 h-2 rounded-full bg-accent inline-block" /><span className="text-accent text-sm font-semibold tracking-wide uppercase">We're Coming Back Soon</span><span className="w-2 h-2 rounded-full bg-accent inline-block" />









          </motion.div>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
            className="w-24 h-px bg-accent origin-left" />
          

          {/* Headline — word by word */}
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {words.map((word, i) =>
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: 'easeOut' as const }}
              className="inline-block mr-3">
              
                {word === 'Farm.' || word === 'World.' ?
              <span className="text-accent">{word}</span> :

              word
              }
              </motion.span>
            )}
          </h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' as const }}
            className="w-24 h-px bg-accent origin-right" />
          

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: 'easeOut' as const }}
            className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            
            OrganicGlobe International is building a technology-driven organic supply chain rooted in environmental stewardship, ethical sourcing, and community empowerment. We source directly from trusted farmers across Maharashtra and India — no middlemen, no chemicals, no compromise — and export certified organic produce and preservative-free products to markets worldwide.
          </motion.p>

          {/* Email capture */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6, ease: 'easeOut' as const }}
            onSubmit={handleHeroSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            
            {submitted ?
            <div className="flex-1 text-center py-3 text-accent font-semibold">
                Thank you! We'll notify you when we launch.
              </div> :

            <>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-accent transition-colors" />
              
                <button
                type="submit"
                className="px-6 py-3 rounded-full bg-accent text-primary font-semibold text-sm hover:bg-accent/90 transition-colors whitespace-nowrap">
                
                  Notify Me
                </button>
              </>
            }
          </motion.form>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-white/30 text-xs">Be the first to know when we launch


          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            
            <div className="w-1 h-2 rounded-full bg-accent/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. VISION & MISSION ─────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Stat */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="flex flex-col gap-6">
              
              {/* Produce image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-2">
                <img
                  src="/airo-assets/images/pages/home/vision-produce"
                  alt="Fresh organic produce sourced from Maharashtra farms"
                  className="w-full h-full object-cover" />
                
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-heading text-8xl md:text-9xl font-bold text-accent leading-none">
                  <AnimatedCounter target={150} suffix="%" />
                </div>
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
                  Average income increase for our partner farmers
                </p>
                <div className="w-12 h-0.5 bg-accent mt-2" />
                <p className="text-foreground/70 text-sm leading-relaxed max-w-sm">
                  By eliminating middlemen entirely, we ensure every rupee from the global market reaches the farmer who grew it — proving that ethical commerce and profitability are not opposites.
                </p>
              </div>
            </motion.div>

            {/* Right — Mission */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' as const }}
              className="flex flex-col gap-8">
              
              <div className="flex flex-col gap-3">
                <span className="text-accent text-xs font-semibold uppercase tracking-widest">Our Vision</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Technology-Driven. Ethically Sourced. Globally Delivered.
                </h2>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed">
                Our primary vision is to build and scale a highly efficient, technology-driven organic supply chain focused on global exports. We are positioned around the pillars of environmental stewardship, ethical sourcing, and community empowerment — proving that large-scale global commerce can actively support planet health, soil health, and the livelihoods of the farming communities that feed the world.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                { label: 'Tech-Enabled Supply Chain', desc: 'End-to-end traceability from farm to global shelf' },
                { label: 'Environmental Stewardship', desc: 'Practices that restore soil and protect ecosystems' },
                { label: 'Ethical Sourcing', desc: 'Fair pay, direct contracts, zero exploitation' },
                { label: 'Community Empowerment', desc: 'Farmer income up 150%+ by removing middlemen' }].
                map((item) =>
                <div key={item.label} className="flex flex-col gap-1">
                    <div className="w-6 h-0.5 bg-accent mb-1" />
                    <p className="text-foreground font-semibold text-sm">{item.label}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT WE DO ───────────────────────────────────────────────── */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="text-center mb-14 flex flex-col items-center gap-3">
            
            <span className="text-accent text-xs font-semibold uppercase tracking-widest">What We Do</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Commerce That Supports Planet, Soil & People
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
              Three pillars that define every product we grow, make, and ship — proving that large-scale global trade can actively restore rather than deplete.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <WhatWeDoCard
              icon={<Leaf size={22} />}
              title="Ethical Direct Sourcing"
              body="We partner with certified organic farmers in Maharashtra and across India, using technology to create fully traceable supply chains — cutting every middleman so farmers earn more and buyers get verified, fresher produce."
              delay={0} />
            
            <WhatWeDoCard
              icon={<Factory size={22} />}
              title="Clean Manufacturing"
              body="Our facility in Maharashtra produces packaged organic food products with zero artificial preservatives and zero synthetic chemicals. Every batch is made with environmental stewardship as a non-negotiable standard."
              delay={0.12} />
            
            <WhatWeDoCard
              icon={<Globe2 size={22} />}
              title="Tech-Enabled Global Export"
              body="From India's farms to doorsteps in the UAE, Europe, the USA, and beyond — our technology-driven logistics platform handles end-to-end export with full traceability, compliance, and efficiency at scale."
              delay={0.24} />
            
          </div>
        </div>
      </section>

      {/* ── 4. FOUNDER ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Founder photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' as const }}
              className="flex justify-center">
              
              <div className="relative">
                {/* Gold decorative frame offset */}
                <div className="absolute -inset-3 rounded-2xl border border-accent/30" />
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-accent/20" />
                {/* Photo */}
                <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden">
                  <img
                    src="/assets/IMG_20220816_103623_610.jpg"
                    alt="Avinash Chavan — Founder, OrganicGlobe International"
                    className="w-full h-full object-cover object-top" />
                  
                  {/* Subtle gold gradient at bottom */}
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-primary/80 to-transparent" />
                  {/* Name badge overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-accent font-semibold text-sm tracking-wide">Avinash Chavan</p>
                    <p className="text-white/70 text-xs">Founder & Managing Director</p>
                  </div>
                </div>
                {/* Gold accent dots */}
                <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-accent" />
                <div className="absolute -bottom-5 -right-5 w-2 h-2 rounded-full bg-accent/60" />
              </div>
            </motion.div>

            {/* Right — Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
              className="flex flex-col gap-6">
              
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">Founder's Vision</span>
              <div className="relative">
                <span className="font-heading text-7xl text-accent/30 leading-none absolute -top-4 -left-2 select-none">"</span>
                <blockquote className="font-heading text-2xl md:text-3xl italic text-white leading-relaxed pl-6">
                  I started OrganicGlobe International because I saw farmers working harder than anyone and earning the least. That ends here.
                </blockquote>
                <span className="font-heading text-7xl text-accent/30 leading-none absolute -bottom-8 right-0 select-none">"</span>
              </div>
              <div className="flex flex-col gap-1 pl-6 mt-4">
                <p className="text-accent font-semibold text-sm tracking-wide uppercase">Avinash Chavan</p>
                <p className="text-white/50 text-xs tracking-wide">Founder & Managing Director</p>
                <p className="text-white/40 text-xs">OrganicGlobe International · Maharashtra, India</p>
              </div>
              <div className="w-12 h-0.5 bg-accent/40 ml-6" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. COMING BACK SOON ─────────────────────────────────────────── */}
      <section id="notify" className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
            className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
            
            {/* Pulsing badge */}
            <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-accent/40 bg-accent/5">
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-accent inline-block" />
              
              <span className="text-accent text-xs font-semibold uppercase tracking-widest">Coming Back Soon</span>
            </div>

            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight">
              We're Taking a Short Pause.
            </h2>

            <div className="w-16 h-0.5 bg-accent" />

            <p className="text-muted-foreground text-base leading-relaxed">
              Big things are being built behind the scenes. OrganicGlobe International will be back soon — with a technology-driven supply chain, stronger farmer partnerships, and a cleaner product line ready to serve the world.
            </p>

            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2">
              {notifySubmitted ?
              <div className="flex-1 text-center py-3 text-accent font-semibold">
                  You're on the list! We'll be in touch.
                </div> :
              <>
                  <input
                  type="email"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="Stay in the loop — enter your email"
                  required
                  disabled={notifyLoading}
                  className="flex-1 px-4 py-3 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-60" />
                  <button
                  type="submit"
                  disabled={notifyLoading}
                  className="px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-secondary transition-colors whitespace-nowrap flex items-center gap-2 disabled:opacity-60">
                    {notifyLoading ?
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg> :

                  <>Notify Me <ArrowRight size={14} /></>
                  }
                  </button>
                </>
              }
            </form>
            {notifyError && <p className="text-red-500 text-xs mt-1">{notifyError}</p>}
            <p className="text-muted-foreground text-xs">We'll reach out the moment we're live. No spam.</p>
          </motion.div>
        </div>
      </section>

      {/* ── 6. GLOBAL REACH ─────────────────────────────────────────────── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* World map background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-4xl px-8">
            <WorldMapSVG />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' as const }}
            className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
            
            <span className="text-accent text-xs font-semibold uppercase tracking-widest">Global Reach</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
              From Maharashtra to the World.
            </h2>
            <div className="w-16 h-0.5 bg-accent" />
            <p className="text-white/60 text-base leading-relaxed">
              Exporting organic produce and chemical-free food products to UAE, Europe, USA, and worldwide markets — with every shipment traceable to the farmer who grew it.
            </p>

            {/* Region pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {(showAllRegions ? home.globalReach.regions : home.globalReach.regions.slice(0, 11)).map((region) =>
              <motion.div
                key={region.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut' as const }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15">
                
                  {flagImg(region.flag, region.label)}
                  <div className="text-left">
                    <p className="text-white text-xs font-semibold leading-none">{region.label}</p>
                    {region.sub === 'Origin' &&
                  <p className="text-accent text-[9px] font-semibold leading-none mt-0.5 uppercase tracking-wide">Origin</p>
                  }
                  </div>
                </motion.div>
              )}
              {/* More / Less toggle pill */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut' as const }}
                onClick={() => setShowAllRegions((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/40 hover:bg-accent/30 transition-colors duration-200 cursor-pointer">
                <span className="text-accent text-xs font-semibold leading-none">
                  {showAllRegions ? '− Less' : `+ ${home.globalReach.regions.length - 11} More`}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>);

}