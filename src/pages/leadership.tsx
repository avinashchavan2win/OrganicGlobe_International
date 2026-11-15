import { leadership } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const site = 'https://organicglobeinternational.com';
const url = `${site}/leadership`;
const title = 'Leadership — Avinash Chavan, Founder & MD | OrganicGlobe International';
const description =
  'Meet Avinash Chavan, Founder & Managing Director of OrganicGlobe International — the vision, values, and personal mission behind a farmer-first organic export company built in Maharashtra, India.';

export default function LeadershipPage() {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content={`${site}/assets/IMG_20220816_103623_610.jpg`} />
        <meta property="profile:first_name" content="Avinash" />
        <meta property="profile:last_name" content="Chavan" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${site}/assets/IMG_20220816_103623_610.jpg`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ProfilePage',
              '@id': `${url}#webpage`,
              name: title,
              description,
              url,
              isPartOf: { '@id': `${site}/#website` },
              about: { '@id': `${url}#founder` },
              datePublished: '2023-01-01',
              dateModified: '2026-09-15'
            },
            {
              '@type': 'Person',
              '@id': `${url}#founder`,
              name: 'Avinash Chavan',
              givenName: 'Avinash',
              familyName: 'Chavan',
              jobTitle: 'Founder & Managing Director',
              description: 'Avinash Chavan is the Founder and Managing Director of OrganicGlobe International, an organic produce export company based in Maharashtra, India. He founded the company in 2023 to bridge the gap between Indian organic farmers and international buyers, eliminating middlemen and ensuring fair pricing for growers.',
              image: `${site}/assets/IMG_20220816_103623_610.jpg`,
              url: `${url}`,
              worksFor: {
                '@type': 'Organization',
                '@id': `${site}/#organization`,
                name: 'OrganicGlobe International',
                url: site
              },
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Maharashtra',
                addressCountry: 'IN'
              },
              nationality: {
                '@type': 'Country',
                name: 'India'
              },
              knowsAbout: [
                'Organic farming',
                'Agricultural export',
                'Supply chain management',
                'Farmer welfare',
                'International trade',
                'Chemical-free produce'
              ]
            }
          ]
        }).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative bg-primary overflow-hidden py-28 md:py-36 px-6">
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none opacity-10">
            <svg viewBox="0 0 600 600" className="w-[500px] h-[500px] -mr-32">
              <circle cx="300" cy="300" r="280" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
              <ellipse cx="300" cy="300" rx="140" ry="280" fill="none" stroke="#C9A84C" strokeWidth="1" />
              <ellipse cx="300" cy="300" rx="280" ry="100" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              <ellipse cx="300" cy="300" rx="280" ry="180" fill="none" stroke="#C9A84C" strokeWidth="0.6" />
            </svg>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-accent" />
                <span className="text-accent text-xs font-semibold uppercase tracking-widest">{leadership.hero.eyebrow}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
                {leadership.hero.headline}
              </h1>
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
                {leadership.hero.subheadline}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Founder Profile ──────────────────────────────────────────────── */}
        <section className="bg-background py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto flex flex-col gap-12">

            {/* Photo + identity card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

              {/* Photo */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-2xl border border-accent/30" />
                  <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-accent/20" />
                  <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden">
                    <img
                      src={leadership.founder.photo}
                      alt={leadership.founder.photoAlt}
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                      fetchPriority="high"
                    />
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-accent font-semibold text-sm tracking-wide">{leadership.founder.name}</p>
                      <p className="text-white/70 text-xs">{leadership.founder.title}</p>
                    </div>
                  </div>
                  <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-accent" />
                  <div className="absolute -bottom-5 -right-5 w-2 h-2 rounded-full bg-accent/60" />
                </div>
              </div>

              {/* Identity */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{leadership.founder.name}</h2>
                  <p className="text-accent font-semibold text-sm uppercase tracking-widest">{leadership.founder.title}</p>
                  <p className="text-muted-foreground text-xs">{leadership.founder.company}</p>
                </div>
                <div className="w-10 h-0.5 bg-accent" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Avinash Chavan founded OrganicGlobe International with a singular mission: to build a supply chain that is as good for the farmer as it is for the international buyer. Based in Maharashtra — the heartland of India's organic produce belt — he brings together technology, direct farmer relationships, and a deep commitment to chemical-free agriculture.
                </p>
              </div>
            </motion.div>

            {/* Founder Letter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="rounded-2xl border border-border bg-card px-8 py-10 md:px-12 md:py-14 flex flex-col gap-7">

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-0.5 bg-accent" />
                  <span className="text-accent text-xs font-semibold uppercase tracking-widest">{leadership.letter.eyebrow}</span>
                </div>
              </div>

              {leadership.letter.paragraphs.map((p) => (
                <p
                  key={p.id}
                  className={p.id === 'p3'
                    ? 'text-foreground font-semibold text-base leading-relaxed'
                    : 'text-muted-foreground text-base leading-relaxed'}>
                  {p.text}
                </p>
              ))}

              {/* Signature */}
              <div className="flex flex-col gap-1 pt-2 border-t border-border mt-2">
                <p className="font-heading text-lg font-bold text-foreground">{leadership.letter.signatureName}</p>
                <p className="text-accent text-sm font-semibold">{leadership.letter.signatureTitle}</p>
                <p className="text-muted-foreground text-xs">{leadership.letter.signatureCompany}</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="bg-primary py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
            <div className="w-8 h-0.5 bg-accent mx-auto" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
              {leadership.cta.headline}
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-xl">
              {leadership.cta.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                to="/contact"
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-primary font-semibold text-sm hover:bg-accent/90 transition-colors">
                <span>{leadership.cta.primaryLabel}</span> <ArrowRight size={14} />
              </Link>
              <Link
                to="/farmer-partnership"
                className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
                <span>{leadership.cta.secondaryLabel}</span>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
