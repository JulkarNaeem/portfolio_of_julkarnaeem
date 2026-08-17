import { LinkedInIcon, YouTubeIcon, InstagramIcon, FacebookIcon } from './SocialIcons';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-accent flex items-center justify-center">
                <span className="text-charcoal font-bold text-sm font-mono">JN</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">Julkar Naeem</span>
            </div>
            <p className="text-steel-light text-sm leading-relaxed max-w-sm">
              Steel Structure Detailer | Tekla BIM & Fabrication Drawings
            </p>
            <p className="text-steel-light text-sm mt-2">
              Fabrication-ready models and shop drawings for structural steel projects worldwide.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              {[
                { Icon: LinkedInIcon, label: 'LinkedIn' },
                { Icon: YouTubeIcon, label: 'YouTube' },
                { Icon: InstagramIcon, label: 'Instagram' },
                { Icon: FacebookIcon, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 border border-steel/30 flex items-center justify-center text-steel-light hover:bg-accent hover:text-charcoal hover:border-accent transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-steel-light font-medium mb-5">
              Navigation
            </h4>
            <div className="space-y-3">
              {['Projects', 'Services', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNav(item.toLowerCase())}
                  className="block text-sm text-steel-light hover:text-accent transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-steel-light font-medium mb-5">
              Services
            </h4>
            <div className="space-y-3 text-sm text-steel-light">
              <p>Steel Detailing</p>
              <p>Tekla BIM Modeling</p>
              <p>Shop Drawings</p>
              <p>Connection Details</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-steel-light text-xs">
            © 2025 Julkar Naeem. All rights reserved.
          </p>
          <p className="text-steel/50 text-xs">
            julkarnaeem.com
          </p>
        </div>
      </div>
    </footer>
  );
}
