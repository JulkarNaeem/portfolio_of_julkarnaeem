import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { navSettings } = portfolioData;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = navSettings.navLinks.filter((l) => l.visible);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#12161D]/95 backdrop-blur-md shadow-2xl border-b border-white/10'
          : 'bg-[#12161D]/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      {/* Top micro steel blue / safety yellow accent gradient */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F5C400] to-transparent opacity-75" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo & Identity */}
          <button
            onClick={() => handleNav('home')}
            aria-label={`${navSettings.brandName} Home`}
            className="flex items-center gap-3.5 group text-left transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="w-10 h-10 transition-transform group-hover:scale-105 flex items-center justify-center relative">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,196,0,0.3)]" 
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22c55e] border-2 border-charcoal rounded-full animate-pulse" title="Available for projects" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-[16px] leading-tight tracking-tight group-hover:text-safety-yellow transition-colors">
                  {navSettings.brandName}
                </span>
              </div>
              <span className="text-[#F3F4F6]/70 text-[10px] uppercase tracking-[0.22em] leading-tight font-mono font-medium">
                {navSettings.brandRole}
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`text-[12px] uppercase tracking-[0.16em] font-medium transition-all duration-200 relative py-2 cursor-pointer ${
                    isActive
                      ? 'text-safety-yellow font-bold'
                      : 'text-[#F3F4F6]/80 hover:text-white hover:translate-y-[-1px]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-safety-yellow rounded-full shadow-[0_0_8px_rgba(245,196,0,0.6)]" />
                  )}
                </button>
              );
            })}
            
            {/* CTA Button: Primary CTA Safety Yellow -> Hover Steel Blue with White text */}
            <button
              onClick={() => handleNav(navSettings.ctaPage || 'contact')}
              className="ml-3 px-5 py-2.5 bg-safety-yellow text-charcoal text-[11px] uppercase tracking-[0.18em] font-bold btn-tactile btn-shimmer shadow-[0_2px_12px_rgba(245,196,0,0.25)] hover:bg-steel-blue hover:text-white transition-all duration-300 cursor-pointer"
            >
              {navSettings.ctaLabel || 'Inquire Now'}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden text-white hover:text-safety-yellow p-2 transition-colors duration-200"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-charcoal/95 backdrop-blur-xl border-t border-white/10 animate-fade-in-up">
          <div className="px-6 py-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`block w-full text-left px-4 py-3 text-[13px] uppercase tracking-[0.15em] font-medium transition-colors ${
                    isActive
                      ? 'text-safety-yellow bg-white/5 font-semibold border-l-2 border-safety-yellow'
                      : 'text-[#F3F4F6]/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNav(navSettings.ctaPage || 'contact')}
              className="mt-4 w-full px-5 py-3.5 bg-safety-yellow text-charcoal hover:bg-steel-blue hover:text-white text-[12px] uppercase tracking-[0.18em] font-bold btn-tactile shadow-lg text-center cursor-pointer transition-colors"
            >
              {navSettings.ctaLabel || 'Inquire Now'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
