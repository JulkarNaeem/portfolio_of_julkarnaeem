import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Projects', page: 'projects' },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 bg-charcoal flex items-center justify-center">
              <span className="text-white font-bold text-sm font-mono">JN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-charcoal font-semibold text-[15px] leading-tight tracking-tight">
                Julkar Naeem
              </span>
              <span className="text-steel text-[10px] uppercase tracking-[0.2em] leading-tight">
                Steel Detailer
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`text-[13px] uppercase tracking-[0.12em] font-medium transition-colors duration-200 ${
                  currentPage === link.page
                    ? 'text-charcoal'
                    : 'text-steel hover:text-charcoal'
                }`}
              >
                {link.label}
                {currentPage === link.page && (
                  <span className="block w-full h-[2px] bg-accent mt-1" />
                )}
              </button>
            ))}
            <button
              onClick={() => handleNav('projects')}
              className="ml-2 px-5 py-2.5 bg-charcoal text-white text-[12px] uppercase tracking-[0.15em] font-medium hover:bg-accent hover:text-charcoal transition-all duration-200"
            >
              View Projects
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-charcoal p-2"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`block w-full text-left px-4 py-3 text-[13px] uppercase tracking-[0.12em] font-medium transition-colors ${
                  currentPage === link.page
                    ? 'text-charcoal bg-surface'
                    : 'text-steel hover:text-charcoal'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('projects')}
              className="mt-4 w-full px-5 py-3 bg-charcoal text-white text-[12px] uppercase tracking-[0.15em] font-medium hover:bg-accent hover:text-charcoal transition-all"
            >
              View Projects
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
