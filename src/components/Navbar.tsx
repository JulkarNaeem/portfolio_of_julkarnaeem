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
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80'
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
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-md shadow-emerald-500/20">
              <span className="text-white font-extrabold text-sm font-mono">
                {navSettings.brandInitials || 'JN'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-extrabold text-[15px] leading-tight tracking-tight group-hover:text-emerald-600 transition-colors">
                {navSettings.brandName}
              </span>
              <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] leading-tight font-bold font-mono">
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
                  className={`text-[13px] uppercase tracking-[0.12em] font-bold transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-emerald-600 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="block w-full h-[2.5px] bg-emerald-500 mt-1 rounded-full transition-all duration-200" />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => handleNav(navSettings.ctaPage || 'contact')}
              className="btn-clicky ml-2 px-6 py-2.5 bg-emerald-500 text-white text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-emerald-600 transition-all duration-200 rounded-xl shadow-md shadow-emerald-500/20"
            >
              {navSettings.ctaLabel || 'Inquire Now'}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden text-slate-800 hover:text-emerald-600 p-2 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`block w-full text-left px-4 py-3 text-[13px] uppercase tracking-[0.12em] font-bold transition-colors rounded-lg ${
                    isActive
                      ? 'text-emerald-600 bg-emerald-50 font-extrabold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNav(navSettings.ctaPage || 'contact')}
              className="btn-clicky mt-4 w-full px-5 py-3 bg-emerald-500 text-white text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-emerald-600 transition-all rounded-xl shadow-md"
            >
              {navSettings.ctaLabel || 'Inquire Now'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
