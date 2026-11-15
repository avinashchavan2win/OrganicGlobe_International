import { Link, useLocation } from "react-router";
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [{
    href: '/',
    label: 'Home'
  }, {
    href: '/about',
    label: 'About'
  }, {
    href: '/products',
    label: 'Products'
  }, {
    href: '/farmer-partnership',
    label: 'Farmer Partnership'
  }, {
    href: '/export-markets',
    label: 'Export Markets'
  }, {
    href: '/leadership',
    label: 'Leadership'
  }, {
    href: '/contact',
    label: 'Contact'
  }];
  return <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start shrink-0 gap-0.5">
            <img src="/airo-assets/images/logo/horizontal" alt="OrganicGlobe International" className="h-10 md:h-12 w-auto object-contain shrink-0" />
            <span className="text-white/40 text-[10px] tracking-widest uppercase pl-0.5">EST. 2023</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => <Link key={item.href} to={item.href} className={`text-sm font-medium transition-colors ${location.pathname === item.href ? 'text-accent' : 'text-white/80 hover:text-white'}`}>
                {item.label}
              </Link>)}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link to="/#notify" className="px-5 py-2.5 rounded-full text-sm font-semibold border border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-200">
              Get Notified
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-white hover:text-accent transition-colors" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="lg:hidden border-t border-white/10 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => <Link key={item.href} to={item.href} className={`text-sm font-medium py-2.5 px-2 rounded transition-colors ${location.pathname === item.href ? 'text-accent' : 'text-white/80 hover:text-white'}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link>)}
              <Link to="/#notify" className="mt-3 px-5 py-2.5 rounded-full text-sm font-semibold border border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-200 text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Get Notified
              </Link>
            </nav>
          </div>}
      </div>
    </header>;
}