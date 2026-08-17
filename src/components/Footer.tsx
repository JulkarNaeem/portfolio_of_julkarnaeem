import { LinkedInIcon, UpworkIcon, BehanceIcon, PinterestIcon, WhatsAppIcon } from './SocialIcons';
import { useCms } from '../context/CmsContext';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { content } = useCms();

  const socialLinks = [
    { Icon: LinkedInIcon,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/julkarnaeem/' },
    { Icon: UpworkIcon,    label: 'Upwork',    href: 'https://www.upwork.com/freelancers/julkarnaeem' },
    { Icon: BehanceIcon,   label: 'Behance',   href: 'https://www.behance.net/julkarnaeem' },
    { Icon: PinterestIcon, label: 'Pinterest', href: 'https://www.pinterest.com/julkar_naeem' },
    { Icon: WhatsAppIcon,  label: 'WhatsApp',  href: 'https://wa.me/8801739411586' },
  ];

  return (
    <footer className="bg-charcoal text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-accent flex items-center justify-center">
                <span className="text-charcoal font-bold text-sm font-mono">
                  {content.profileName.split(' ').map(n => n[0]).join('') || 'JN'}
                </span>
              </div>
              <span className="font-semibold text-lg tracking-tight">{content.profileName}</span>
            </div>
            <p className="text-steel-light text-sm leading-relaxed max-w-sm">
              {content.profileRole} | Tekla BIM & Fabrication Drawings
            </p>
            <p className="text-steel/60 text-xs mt-1">Dhaka, Bangladesh · Remote worldwide</p>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 border border-steel/30 flex items-center justify-center text-steel-light hover:bg-accent hover:text-charcoal hover:border-accent transition-all duration-200"
                title={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-steel-light text-xs">
            © {new Date().getFullYear()} Julkar Naeem. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a href="mailto:hello@julkarnaeem.com" className="text-steel/50 hover:text-accent transition-colors">
              hello@julkarnaeem.com
            </a>
            <span className="text-steel/30">•</span>
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('admin');
                } else {
                  window.location.hash = '#admin';
                }
              }}
              className="text-steel/50 hover:text-accent flex items-center gap-1 transition-colors text-xs"
              title="Admin Portal Access"
            >
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
