import { useState } from 'react';
import { LinkedInIcon, UpworkIcon, YouTubeIcon, InstagramIcon, WhatsAppIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import PrivacyModal from './PrivacyModal';
import { ShieldCheck, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const content = portfolioData;
  const [modalTab, setModalTab] = useState<'privacy' | 'terms' | null>(null);

  const socialLinks = [
    { Icon: LinkedInIcon,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/julkarnaeem' },
    { Icon: YouTubeIcon,   label: 'YouTube',   href: 'https://www.youtube.com/@julkarnaeem' },
    { Icon: UpworkIcon,    label: 'Upwork',    href: 'https://www.upwork.com/freelancers/julkarnaeem' },
    { Icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/julkarnaeem.me' },
    { Icon: WhatsAppIcon,  label: 'WhatsApp',  href: 'https://wa.me/8801739411586' },
    { Icon: Globe,         label: 'Website',   href: 'https://julkarnaeem.com' },
  ];

  return (
    <>
      <footer className="bg-charcoal text-white border-t border-white/10 relative overflow-hidden cad-grid-dark">
        {/* Top micro steel blue line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-steel-blue to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-9 h-9 flex items-center justify-center">
                  <img 
                    src="/images/logo.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,196,0,0.3)]" 
                  />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-white">{content.profileName}</span>
              </div>
              <p className="text-[#F3F4F6]/80 text-sm leading-relaxed max-w-sm">
                {content.profileRole} | Tekla BIM & Fabrication Drawings
              </p>
              <p className="text-[#F3F4F6]/60 text-xs mt-1 font-mono">Dhaka, Bangladesh · Remote Worldwide (UTC +6)</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-white/15 bg-white/5 flex items-center justify-center text-[#F3F4F6]/80 hover:bg-safety-yellow hover:text-charcoal hover:border-safety-yellow hover:scale-110 transition-all duration-200 shadow-sm"
                  title={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Bar with Privacy / Terms Links */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#F3F4F6]/80 text-xs font-mono">
              © {new Date().getFullYear()} {content.profileName}. Built for Steel Precision &amp; Quality.
            </p>
            
            <div className="flex items-center gap-5 text-xs font-mono flex-wrap justify-center">
              <button
                onClick={() => setModalTab('privacy')}
                className="text-[#F3F4F6]/70 hover:text-safety-yellow transition-colors underline-offset-4 hover:underline cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck size={13} className="text-safety-yellow" />
                Privacy &amp; Cookie Policy
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => setModalTab('terms')}
                className="text-[#F3F4F6]/70 hover:text-safety-yellow transition-colors underline-offset-4 hover:underline cursor-pointer"
              >
                Terms of Service &amp; Scope
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => onNavigate?.('database')}
                className="text-[#F3F4F6]/70 hover:text-safety-yellow transition-colors underline-offset-4 hover:underline cursor-pointer flex items-center gap-1.5"
                title="Internal Project Database Dashboard (Admin Access Only)"
              >
                <Lock size={12} className="text-safety-yellow/80" />
                Project Dashboard
              </button>
              <span className="text-white/20">|</span>
              <a href="mailto:contact@julkarnaeem.com" className="text-[#F3F4F6]/70 hover:text-safety-yellow transition-colors">
                contact@julkarnaeem.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy & Terms Lightbox Modal */}
      <PrivacyModal
        isOpen={modalTab !== null}
        onClose={() => setModalTab(null)}
        defaultTab={modalTab || 'privacy'}
      />
    </>
  );
}
