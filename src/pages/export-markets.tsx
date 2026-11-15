import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { home } from 'virtual:content';

function flagEmojiToIso(emoji: string): string | null {
  const codePoints = [...emoji].map((c) => c.codePointAt(0) ?? 0);
  if (codePoints.length === 2 && codePoints[0] >= 0x1f1e6 && codePoints[0] <= 0x1f1ff) {
    return String.fromCharCode(codePoints[0] - 0x1f1e6 + 65, codePoints[1] - 0x1f1e6 + 65).toLowerCase();
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

export default function ExportMarketsPage() {
  const [showAllRegions, setShowAllRegions] = useState(false);

  const moreCount = home.globalReach.regions.length - 11;

  return (
    <>
      <Helmet>
        <title>Export Markets — OrganicGlobe International</title>
        <meta name="description" content="OrganicGlobe International exports organic produce and food products to UAE, Europe, USA, and worldwide markets. Traceable from farm to shelf." />
        <link rel="canonical" href="https://organicglobeinternational.com/export-markets" />
        <meta property="og:title" content="Export Markets — OrganicGlobe International" />
        <meta property="og:description" content="OrganicGlobe International exports organic produce and food products to UAE, Europe, USA, and worldwide markets. Traceable from farm to shelf." />
        <meta property="og:url" content="https://organicglobeinternational.com/export-markets" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://organicglobeinternational.com/airo-assets/images/logo/horizontal" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="OrganicGlobe International — Exporting Organic Produce Worldwide" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Export Markets — OrganicGlobe International" />
        <meta name="twitter:description" content="OrganicGlobe International exports organic produce and food products to UAE, Europe, USA, and worldwide markets." />
        <meta name="twitter:image" content="https://organicglobeinternational.com/airo-assets/images/logo/horizontal" />
      </Helmet>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'hsl(var(--primary))' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, hsl(var(--accent)) 0%, transparent 60%)' }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent text-xs font-semibold uppercase tracking-widest mb-4">
            Export Markets
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            From India to the World
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Every shipment traceable to the farmer who grew it — delivered to trusted partners across {home.globalReach.regions.length - 1} countries worldwide.
          </motion.p>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 md:py-28" style={{ background: 'hsl(var(--primary) / 0.97)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">Our Reach</p>
            

            
            <p className="text-white/60 text-base leading-relaxed max-w-2xl mx-auto">
              {home.globalReach.body}
            </p>
          </motion.div>

          {/* Country Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {home.globalReach.regions.map((region, i) =>
            <motion.div
              key={region.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i, 10) * 0.03 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15${!showAllRegions && i >= 11 ? ' hidden' : ''}`}>
                {flagImg(region.flag, region.label)}
                <div className="text-left">
                  <p className="text-white text-xs font-semibold leading-none">{region.label}</p>
                  {region.sub === 'Origin' &&
                <p className="text-accent text-[9px] font-semibold leading-none mt-0.5 uppercase tracking-wide">Origin</p>
                }
                </div>
              </motion.div>
            )}

            {/* More / Less toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowAllRegions((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/40 hover:bg-accent/30 transition-colors duration-200 cursor-pointer">
              <span className="text-accent text-xs font-semibold leading-none">
                {showAllRegions ? '− Less' : `+ ${moreCount} More`}
              </span>
            </motion.button>
          </div>

          {/* Country count badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10">
            <span className="inline-block px-5 py-2 rounded-full border border-accent/30 text-accent text-sm font-semibold">
              {home.globalReach.regions.length - 1} Countries &amp; Growing
            </span>
          </motion.div>
        </div>
      </section>

      {/* Export Capabilities */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">Why Partner With Us</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Built for Global Trade
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            {
              icon: '🌿',
              title: 'Certified Organic',
              desc: 'All produce is certified chemical-free and traceable from farm to shipment documentation.'
            },
            {
              icon: '📦',
              title: 'Export-Ready Packaging',
              desc: 'Compliant with international food safety and labelling standards for every destination market.'
            },
            {
              icon: '🤝',
              title: 'Direct Sourcing',
              desc: 'No middlemen — we source directly from our farmer network, ensuring quality and fair pricing.'
            }].
            map((item, i) =>
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4 p-7 rounded-2xl border border-border bg-card">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6" style={{ background: 'hsl(var(--primary))' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto flex flex-col items-center gap-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Interested in Importing?
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            Reach out to discuss pricing, certifications, and logistics for your market.
          </p>
          <a href="/contact"
          className="px-8 py-3 rounded-full font-semibold text-sm transition-colors duration-200"
          style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--primary))' }}>
            Get in Touch
          </a>
        </motion.div>
      </section>
    </>);

}