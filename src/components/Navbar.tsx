import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { content } = useCms();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navSettings = content.navSettings || {
    brandInitials: content.profileName?.split(' ').map(n => n[0]).join('') || 'JN',
    brandName: content.profileName || 'Julkar Naeem',
    brandRole: content.profileRole || 'Steel Detailer',
    ctaLabel: 'Inquire Now',
    ctaPage: 'contact',
    navLinks: [
      { label: 'Home', page: 'home', visible: true },
      { label: 'Projects', page: 'projects', visible: true },
      { label: 'Services', page: 'services', visible: true },
      { label: 'About', page: 'about', visible: true },
      { label: 'Contact', page: 'contact', visible: true },
    ],
  };

  const navLinks = navSettings.navLinks.filter(l => l.visible);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-charcoal/95 backdrop-blur-md shadow-lg border-b border-white/10'
          : 'bg-charcoal/90 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            aria-label={`${navSettings.brandName} Home`}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-8 h-8 bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-charcoal font-bold text-sm font-mono">
                {navSettings.brandInitials || 'JN'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-[15px] leading-tight tracking-tight group-hover:text-accent transition-colors">
                {navSettings.brandName}
              </span>
              <span className="text-steel-lighter text-[10px] uppercase tracking-[0.2em] leading-tight font-medium">
                {navSettings.brandRole}
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`text-[13px] uppercase tracking-[0.12em] font-medium transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-accent font-semibold'
                      : 'text-steel-lighter hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="block w-full h-[2px] bg-accent mt-1 transition-all duration-200" />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => handleNav(navSettings.ctaPage || 'contact')}
              className="ml-2 px-5 py-2.5 bg-accent text-charcoal text-[12px] uppercase tracking-[0.15em] font-semibold hover:bg-white hover:text-charcoal transition-all duration-200 shadow-sm"
            >
              {navSettings.ctaLabel || 'Inquire Now'}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden text-white hover:text-accent p-2 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-charcoal border-t border-white/10">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`block w-full text-left px-4 py-3 text-[13px] uppercase tracking-[0.12em] font-medium transition-colors ${
                    isActive
                      ? 'text-accent bg-white/5 font-semibold'
                      : 'text-steel-lighter hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNav(navSettings.ctaPage || 'contact')}
              className="mt-4 w-full px-5 py-3 bg-accent text-charcoal text-[12px] uppercase tracking-[0.15em] font-semibold hover:bg-white transition-all"
            >
              {navSettings.ctaLabel || 'Inquire Now'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
