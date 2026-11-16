import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Mail, MapPin, Globe, CheckCircle2, ChevronDown } from 'lucide-react';
import { contact } from 'virtual:content';

type InquiryType = 'importer' | 'distributor' | 'farmer' | 'investor' | 'other';

const inquiryTypeOptions: { value: InquiryType; label: string }[] = [
  { value: 'importer',    label: 'International Importer' },
  { value: 'distributor', label: 'Distributor / Retailer' },
  { value: 'farmer',      label: 'Farmer Partner' },
  { value: 'investor',    label: 'Investor' },
  { value: 'other',       label: 'Other' },
];

type ProductGroup = { group: string; items: string[] };

const productGroups: ProductGroup[] = [
  {
    group: 'Jaggery Products',
    items: [
      'Organic Jaggery — Block / Slab',
      'Organic Jaggery — Powder',
      'Organic Jaggery — Granules',
      'Organic Jaggery — Liquid / Syrup',
      'Organic Jaggery — Cubes',
      'Organic Coconut Jaggery',
      'Organic Palm Jaggery',
      'Organic Date Palm Jaggery',
    ],
  },
  {
    group: 'Wooden Cold-Pressed Oils',
    items: [
      'Wooden Cold-Pressed Groundnut Oil',
      'Wooden Cold-Pressed Sesame (Til) Oil',
      'Wooden Cold-Pressed Coconut Oil',
      'Wooden Cold-Pressed Mustard Oil',
      'Wooden Cold-Pressed Sunflower Oil',
    ],
  },
  {
    group: 'Cold-Pressed Oils',
    items: [
      'Cold-Pressed Groundnut Oil',
      'Cold-Pressed Sesame Oil',
      'Cold-Pressed Coconut Oil',
      'Cold-Pressed Mustard Oil',
      'Cold-Pressed Flaxseed Oil',
      'Cold-Pressed Sunflower Oil',
      'Cold-Pressed Almond Oil',
      'Cold-Pressed Walnut Oil',
    ],
  },
  {
    group: 'Spices',
    items: [
      'Turmeric (Whole / Powder)',
      'Red Chilli (Whole / Powder)',
      'Coriander (Seeds / Powder)',
      'Cumin (Seeds / Powder)',
      'Black Pepper (Whole / Powder)',
      'Cardamom (Green)',
      'Cardamom (Black)',
      'Cloves',
      'Cinnamon (Sticks / Powder)',
      'Fenugreek (Seeds / Powder)',
      'Mustard Seeds',
      'Fennel Seeds',
      'Ajwain (Carom Seeds)',
      'Asafoetida (Hing)',
      'Star Anise',
      'Bay Leaves',
      'Nutmeg & Mace',
      'Saffron',
      'Ginger (Dry / Powder)',
      'Mixed Spices / Masala Blends',
    ],
  },
  {
    group: 'Fresh Fruits',
    items: [
      'Alphonso Mangoes',
      'Kesar Mangoes',
      'Bananas',
      'Pomegranates',
      'Grapes (Green / Black / Red)',
      'Guava',
      'Papaya',
      'Sapota (Chikoo)',
      'Custard Apple (Sitaphal)',
      'Jackfruit',
      'Pineapple',
      'Watermelon',
      'Muskmelon',
      'Lemon / Lime',
      'Sweet Lime (Mosambi)',
      'Oranges',
      'Coconut (Fresh)',
      'Amla (Indian Gooseberry)',
      'Jamun (Indian Blackberry)',
      'Tamarind',
      'Ber (Indian Jujube)',
    ],
  },
  {
    group: 'Fresh Vegetables',
    items: [
      'Onions',
      'Tomatoes',
      'Potatoes',
      'Garlic',
      'Ginger (Fresh)',
      'Cauliflower',
      'Cabbage',
      'Brinjal (Eggplant)',
      'Okra (Bhindi)',
      'Bitter Gourd (Karela)',
      'Bottle Gourd (Lauki)',
      'Ridge Gourd (Turai)',
      'Snake Gourd',
      'Pumpkin',
      'Drumstick (Moringa Pods)',
      'Spinach',
      'Fenugreek Leaves (Methi)',
      'Coriander Leaves',
      'Curry Leaves',
      'Green Chilli',
      'Capsicum (Bell Pepper)',
      'Cluster Beans (Gavar)',
      'French Beans',
      'Peas (Green)',
      'Corn / Maize',
      'Radish',
      'Beetroot',
      'Carrot',
      'Sweet Potato',
      'Colocasia (Arbi)',
    ],
  },
  {
    group: 'Pulses & Lentils',
    items: [
      'Toor Dal (Pigeon Pea)',
      'Chana Dal (Split Chickpea)',
      'Moong Dal (Green Gram)',
      'Urad Dal (Black Gram)',
      'Masoor Dal (Red Lentil)',
      'Rajma (Kidney Beans)',
      'Kabuli Chana (Chickpeas)',
      'Black Chana (Kala Chana)',
      'Moth Beans (Matki)',
      'Horse Gram (Kulthi)',
      'Lobia (Black-Eyed Peas)',
      'Green Peas (Dried)',
      'Mixed Pulses',
    ],
  },
  {
    group: 'Moringa Products',
    items: [
      'Moringa Leaf Powder',
      'Moringa Seed Powder',
      'Moringa Capsules / Tablets',
      'Moringa Drumstick Pods (Fresh)',
      'Moringa Drumstick Pods (Dried)',
      'Moringa Oil (Cold-Pressed)',
      'Moringa Tea / Herbal Infusion',
      'Moringa Leaf (Dried / Whole)',
      'Moringa Extract',
    ],
  },
  {
    group: 'Dry Fruits & Nuts',
    items: [
      'Cashews (W180 / W210 / W240 / W320)',
      'Almonds',
      'Walnuts',
      'Pistachios',
      'Raisins (Black / Green / Golden)',
      'Dates (Medjool / Deglet / Kimia)',
      'Figs (Anjeer)',
      'Apricots (Dried)',
      'Prunes',
      'Dried Mango Slices',
      'Dried Coconut (Copra)',
      'Peanuts / Groundnuts',
      'Lotus Seeds (Makhana)',
      'Chironji (Charoli)',
      'Mixed Dry Fruits',
    ],
  },
  {
    group: 'Grains & Cereals',
    items: [
      'Organic Rice (Basmati)',
      'Organic Rice (Non-Basmati)',
      'Organic Wheat / Flour (Atta)',
      'Organic Sorghum (Jowar)',
      'Organic Pearl Millet (Bajra)',
      'Organic Finger Millet (Ragi)',
      'Organic Foxtail Millet',
      'Organic Barnyard Millet',
      'Organic Quinoa',
      'Organic Oats',
    ],
  },
];

const CUSTOM_ORDER_VALUE = '__custom__';
const OTHER_VALUE        = '__other__';

const volumeOptions = [
  'Less than 1 MT / month',
  '1 – 5 MT / month',
  '5 – 10 MT / month',
  '10 – 25 MT / month',
  '25 – 50 MT / month',
  '50 MT+ / month',
  'One-time / trial order',
  'To be discussed',
];

const messageTopicOptions: Record<InquiryType, string[]> = {
  importer: [
    'Pricing & availability',
    'Certifications & compliance',
    'Minimum order quantities',
    'Shipping & logistics',
    'Sample request',
    'Long-term supply agreement',
    'Other',
  ],
  distributor: [
    'Distribution partnership',
    'Retail listing enquiry',
    'Exclusive territory rights',
    'Product range & packaging',
    'Sample request',
    'Other',
  ],
  farmer: [
    'Joining the farmer network',
    'Organic certification support',
    'Pricing & payment terms',
    'Crop buyback programme',
    'Training & resources',
    'Other',
  ],
  investor: [
    'Business overview & financials',
    'Partnership / joint venture',
    'Export market expansion',
    'Impact investment',
    'Other',
  ],
  other: [
    'General enquiry',
    'Media / press',
    'Collaboration proposal',
    'Feedback',
    'Other',
  ],
};

const contactDetails = [
  { icon: Mail,   label: 'Email',          value: 'info@organicglobeinternational.com', href: 'mailto:info@organicglobeinternational.com' },
  { icon: MapPin, label: 'Origin',         value: 'Maharashtra, India',                href: null },
  { icon: Globe,  label: 'Export Markets', value: 'UAE · Europe · USA · Asia Pacific', href: '/export-markets' },
];

const selectClass =
  'w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer';

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('importer');
  const [submitted,   setSubmitted]   = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [form, setForm] = useState({
    name:          '',
    company:       '',
    email:         '',
    phone:         '',
    country:       '',
    product:       '',
    productOther:  '',
    productCustom: '',
    volume:        '',
    messageTopic:  '',
    message:       '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleInquiryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setInquiryType(e.target.value as InquiryType);
    setForm((prev) => ({ ...prev, messageTopic: '' }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const productFinal =
        form.product === CUSTOM_ORDER_VALUE ? `Custom Order: ${form.productCustom}` :
        form.product === OTHER_VALUE        ? `Other: ${form.productOther}` :
        form.product;

      const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;
      if (!formId) {
        throw new Error('The contact form is not configured yet. Please email info@organicglobeinternational.com.');
      }

      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          country: form.country,
          product: productFinal,
          volume: form.volume,
          messageTopic: form.messageTopic,
          message: form.message,
          inquiryType,
          subject: `[${inquiryType}] Website enquiry from ${form.name}`,
          _gotcha: '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = Array.isArray(data.errors)
          ? data.errors.map((item: { message?: string }) => item.message).filter(Boolean).join(' ')
          : '';
        throw new Error(detail || data.error || 'Failed to send message. Please try again.');
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const topicOptions  = messageTopicOptions[inquiryType];

  const showProductVolume = inquiryType === 'importer' || inquiryType === 'distributor';

  return (
    <>
      <Helmet>
        <title>Contact — OrganicGlobe International</title>
        <meta name="description" content="Get in touch with OrganicGlobe International — for importers, distributors, farmer partners, and investors seeking clean, traceable organic produce from India." />
        <link rel="canonical" href="https://organicglobeinternational.com/contact" />
        <meta property="og:title" content="Contact — OrganicGlobe International" />
        <meta property="og:description" content="Get in touch with OrganicGlobe International — for importers, distributors, farmer partners, and investors seeking clean, traceable organic produce from India." />
        <meta property="og:url" content="https://organicglobeinternational.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://organicglobeinternational.com/assets/logo-horizontal.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="OrganicGlobe International — Pure From the Farm. Delivering to the World." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact — OrganicGlobe International" />
        <meta name="twitter:description" content="Get in touch with OrganicGlobe International — for importers, distributors, farmer partners, and investors seeking clean, traceable organic produce from India." />
        <meta name="twitter:image" content="https://organicglobeinternational.com/assets/logo-horizontal.png" />
      </Helmet>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'hsl(var(--primary))' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, hsl(var(--accent)) 0%, transparent 55%)' }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent text-xs font-semibold uppercase tracking-widest mb-4">
            {contact.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            {contact.hero.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            {contact.hero.body}
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 md:py-28 bg-background px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* Left — contact info */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-10">

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-0.5 bg-accent" />
                <span className="text-accent text-xs font-semibold uppercase tracking-widest">{contact.sidebar.eyebrow}</span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {contact.sidebar.heading}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {contact.sidebar.body}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'hsl(var(--accent) / 0.12)' }}>
                    <Icon size={16} style={{ color: 'hsl(var(--accent))' }} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</span>
                    {href ? (
                      <a href={href} className="text-sm text-foreground font-medium hover:text-accent transition-colors">{value}</a>
                    ) : (
                      <span className="text-sm text-foreground font-medium">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2">

            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-6 py-20 text-center rounded-2xl border border-border bg-card px-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'hsl(var(--accent) / 0.15)' }}>
                  <CheckCircle2 size={32} style={{ color: 'hsl(var(--accent))' }} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-2xl font-bold text-foreground">{contact.success.heading}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                    {contact.success.body}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', company: '', email: '', phone: '', country: '', product: '', productOther: '', productCustom: '', volume: '', messageTopic: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors">
                  {contact.success.resetLabel}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 rounded-2xl border border-border bg-card p-8 md:p-10">

                {/* Inquiry type dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="inquiryType" className="text-foreground text-sm font-semibold">
                    I am reaching out as a… <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={inquiryType}
                      onChange={handleInquiryChange}
                      className={selectClass}>
                      <option value="" disabled>Select one…</option>
                      {inquiryTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="w-full h-px bg-border" />

                {/* Core fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-foreground text-sm font-semibold">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
                  </div>

                  {/* Company / Farm */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-foreground text-sm font-semibold">
                      {inquiryType === 'farmer' ? 'Farm / Village Name' : 'Company / Organisation'}
                    </label>
                    <input
                      id="company" name="company" type="text"
                      value={form.company} onChange={handleChange}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-foreground text-sm font-semibold">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-foreground text-sm font-semibold">Phone / WhatsApp</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
                  </div>

                  {/* Country / Region */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="country" className="text-foreground text-sm font-semibold">
                      {inquiryType === 'farmer' ? 'District / State' : 'Country / Region'} <span className="text-accent">*</span>
                    </label>
                    <input
                      id="country" name="country" type="text" required
                      value={form.country} onChange={handleChange}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors" />
                  </div>

                  {/* Products of Interest — importer / distributor only */}
                  {showProductVolume && (
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label htmlFor="product" className="text-foreground text-sm font-semibold">
                        Products of Interest <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="product" name="product" required
                          value={form.product} onChange={handleChange}
                          className={selectClass}>
                          <option value="" disabled>Select a product or category…</option>
                          {productGroups.map((g) => (
                            <optgroup key={g.group} label={`── ${g.group}`}>
                              {g.items.map((item) => (
                                <option key={item} value={item}>{item}</option>
                              ))}
                            </optgroup>
                          ))}
                          <optgroup label="── Other">
                            <option value={CUSTOM_ORDER_VALUE}>Custom Order — I'll describe what I need</option>
                            <option value={OTHER_VALUE}>Other — not listed above</option>
                          </optgroup>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>

                      {/* Custom order description */}
                      {form.product === CUSTOM_ORDER_VALUE && (
                        <textarea
                          name="productCustom"
                          rows={3}
                          required
                          value={form.productCustom}
                          onChange={handleChange}
                          placeholder="Describe your custom order — product type, specifications, packaging, quantity, etc."
                          className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none mt-1" />
                      )}

                      {/* Other — free text */}
                      {form.product === OTHER_VALUE && (
                        <input
                          type="text"
                          name="productOther"
                          required
                          value={form.productOther}
                          onChange={handleChange}
                          placeholder="Please specify the product you are looking for…"
                          className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors mt-1" />
                      )}
                    </div>
                  )}

                  {/* Volume Required — importer / distributor only */}
                  {showProductVolume && (
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="volume" className="text-foreground text-sm font-semibold">
                        Volume Required <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="volume" name="volume" required
                          value={form.volume} onChange={handleChange}
                          className={selectClass}>
                          <option value="" disabled>Select a volume…</option>
                          {volumeOptions.map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  )}

                  {/* Message topic dropdown */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="messageTopic" className="text-foreground text-sm font-semibold">
                      What is this about? <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="messageTopic" name="messageTopic" required
                        value={form.messageTopic} onChange={handleChange}
                        className={selectClass}>
                        <option value="" disabled>Select a topic…</option>
                        {topicOptions.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="message" className="text-foreground text-sm font-semibold">
                      Your Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none" />
                  </div>
                </div>

                {error && (
                  <p className="text-sm font-medium px-4 py-3 rounded-xl border"
                    style={{ color: 'hsl(var(--error))', background: 'hsl(var(--error) / 0.08)', borderColor: 'hsl(var(--error) / 0.25)' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="self-start flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 disabled:opacity-60"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
