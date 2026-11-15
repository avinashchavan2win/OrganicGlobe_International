import { Link } from "react-router";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/farmer-partnership', label: 'Farmer Partnership' },
  { href: '/export-markets', label: 'Export Markets' },
  { href: '/contact', label: 'Contact' }];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <img
                src="/assets/logo-horizontal.png"
                alt="OrganicGlobe International"
                className="h-12 w-auto object-contain self-start shrink-0" />
              <span className="text-white/35 text-[10px] tracking-widest uppercase pl-0.5">Est. 2023</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Sourcing directly from trusted farmers in Maharashtra, India. Delivering clean, chemical-free organic food to the world.
            </p>
            <p className="text-accent text-sm font-medium italic">
              "Clean Food. Fair Farms. Global Reach."
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) =>
              <Link key={link.href} to={link.href} className="text-sm text-white/70 hover:text-accent transition-colors">
                  {link.label}
                </Link>
              )}
            </nav>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Company
            </h3>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <p>Founded by <span className="text-white font-medium">Avinash Chavan</span></p>
              <p>Started since <span className="text-accent font-semibold">2023</span></p>
              <p>Maharashtra, India</p>
              <p>Exporting Worldwide</p>
            </div>
            {/* Social links */}
            <div className="flex flex-wrap gap-2.5 mt-5">
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-white/60">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-white/60">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-white/60">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-white/60">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon fill="#1B4332" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a href="#" aria-label="X (Twitter)" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-white/60">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Threads */}
              <a href="#" aria-label="Threads" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors text-white/60">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.474 12.01v-.017c.03-3.579.882-6.43 2.525-8.482C5.856 1.205 8.61.024 12.19 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 9.258c.335-.49.77-.924 1.303-1.287 1.01-.688 2.283-1.053 3.68-1.053h.055c3.558.028 5.554 2.019 5.7 5.616.031.077.06.154.088.233.54 1.507.47 4.074-1.617 6.105-1.537 1.503-3.579 2.274-6.757 2.128zm.182-8.662c-.088 0-.176.002-.265.006-1.17.067-2.026.43-2.418.823-.27.267-.39.573-.366.934.047.856.886 1.398 2.187 1.325 1.147-.063 1.989-.537 2.504-1.408.323-.546.518-1.25.58-2.092a11.187 11.187 0 0 0-2.222-.588z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">
            © {currentYear} OrganicGlobe International. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Est. 2023 · Maharashtra, India · Organic Export Company
          </p>
        </div>
      </div>
    </footer>);

}