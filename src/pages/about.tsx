import { about } from 'virtual:content';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Leaf, Globe2, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const site = 'https://organicglobeinternational.com';
const url = `${site}/about`;
const title = 'About Us — OrganicGlobe International';
const description =
'The story of OrganicGlobe International — a technology-driven organic supply chain built on environmental stewardship, ethical sourcing, and community empowerment. Founded by Avinash Chavan.';

const pillars = [
{
  icon: <Globe2 size={20} />,
  title: 'Tech-Enabled Global Export',
  body: 'We are building a highly efficient, technology-driven organic supply chain focused on global exports — with full traceability from farm to shelf.'
},
{
  icon: <Leaf size={20} />,
  title: 'Environmental Stewardship',
  body: 'Every product we grow and manufacture is held to a standard that actively restores soil health and protects ecosystems for future generations.'
},
{
  icon: <Award size={20} />,
  title: 'Ethical Sourcing',
  body: 'Direct contracts with certified organic farmers — zero middlemen, fair pay, and complete transparency at every step of the supply chain.'
},
{
  icon: <Users size={20} />,
  title: 'Community Empowerment',
  body: 'By removing exploitative intermediaries, our partner farmers see income increases of 150% or more — proving commerce can uplift communities.'
}];


export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${site}/assets/logo-horizontal.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="OrganicGlobe International — Pure From the Farm. Delivering to the World." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${site}/assets/logo-horizontal.png`} />
        <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            '@id': `${url}#webpage`,
            name: title,
            url,
            isPartOf: { '@id': `${site}/#website` },
            about: { '@id': `${site}/#organization` }
          }).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative bg-primary overflow-hidden py-28 md:py-36 px-6">
          {/* Decorative globe rings */}
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none opacity-10">
            <svg viewBox="0 0 600 600" className="w-[500px] h-[500px] -mr-32">
              <circle cx="300" cy="300" r="280" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
              <ellipse cx="300" cy="300" rx="140" ry="280" fill="none" stroke="#C9A84C" strokeWidth="1" />
              <ellipse cx="300" cy="300" rx="280" ry="100" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
              <ellipse cx="300" cy="300" rx="280" ry="180" fill="none" stroke="#C9A84C" strokeWidth="0.6" />
            </svg>
          </div>

          <div className="relative max-w-4xl mx-auto flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="flex flex-col gap-5">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-accent" />
                <span className="text-accent text-xs font-semibold uppercase tracking-widest">Our Story</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
                Rooted in India.<br />
                <span className="text-accent">Reaching the World.</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
                OrganicGlobe International was founded on a single conviction — that large-scale global commerce can actively support planet health, soil health, and the livelihoods of the farming communities that feed the world. We are building the supply chain to prove it.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Company Story ────────────────────────────────────────────────── */}
        <section className="bg-background py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="flex flex-col gap-6">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-accent" />
                <span className="text-accent text-xs font-semibold uppercase tracking-widest">Who We Are</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                A Technology-Driven Organic Supply Chain
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                OrganicGlobe International is a Maharashtra-based organic food company building a highly efficient, technology-driven supply chain for global export. We source certified organic produce directly from farming communities across India, manufacture preservative-free packaged products, and deliver to buyers in the UAE, Europe, the United States, and beyond.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                Our model is built around three non-negotiables: environmental stewardship that restores rather than depletes, ethical sourcing that pays farmers what they deserve, and community empowerment that proves global commerce can uplift the people who grow our food.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                We are not just an exporter. We are building the infrastructure — the technology, the partnerships, the certifications, and the trust — to make clean, traceable, farmer-first organic food the global standard.
              </p>
            </motion.div>

            {/* Milestone grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' as const }}
              className="grid grid-cols-2 gap-4">
              
              {about.milestones.map((m, i) =>
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const }}
                className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
                
                  <span className="font-heading text-2xl font-bold text-accent">{m.year}</span>
                  <p className="text-foreground font-semibold text-sm">{m.label}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{m.desc}</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Four Pillars ─────────────────────────────────────────────────── */}
        <section className="bg-primary/5 border-y border-border py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              className="flex flex-col gap-4 max-w-2xl">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-accent" />
                <span className="text-accent text-xs font-semibold uppercase tracking-widest">Our Ethos</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                The Four Pillars We Are Built On
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Every decision at OrganicGlobe International is measured against these four commitments — to the planet, to farmers, to buyers, and to the communities we serve.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((p, i) =>
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
                className="bg-background border border-border rounded-xl p-6 flex flex-col gap-4">
                
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {p.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading text-lg font-bold text-foreground">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── Leadership Teaser ────────────────────────────────────────────── */}
        <section className="bg-background py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="rounded-2xl border border-border bg-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-2xl border border-accent/30" />
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden">
                  <img
                    src="/assets/IMG_20220816_103623_610.jpg"
                    alt="Avinash Chavan — Founder & Managing Director"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
              </div>
              <div className="flex flex-col gap-3 flex-1 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-6 h-0.5 bg-accent" />
                  <span className="text-accent text-xs font-semibold uppercase tracking-widest">Leadership</span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  The Founder Behind the Vision
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                  Avinash Chavan founded OrganicGlobe International to close the gap between what Indian farmers produce and what they are paid. Read his story and the letter behind the mission.
                </p>
                <div className="mt-1">
                  <Link
                    to="/leadership"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
                    Meet Avinash <ArrowRight size={14} />
                  </Link>
                </div>
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
              Partner With a Supply Chain Built on Integrity
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-xl">
              Whether you are a global buyer, a farmer looking for a fair partner, or an investor who believes in ethical commerce — we would love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                to="/contact"
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-primary font-semibold text-sm hover:bg-accent/90 transition-colors">
                
                Get in Touch <ArrowRight size={14} />
              </Link>
              <Link
                to="/farmer-partnership"
                className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
                
                Farmer Partnership
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </>);

}