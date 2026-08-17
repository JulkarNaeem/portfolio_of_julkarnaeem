import { LinkedInIcon, YouTubeIcon, InstagramIcon, FacebookIcon } from './SocialIcons';
import { useCms } from '../context/CmsContext';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { content } = useCms();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/20">
                <span className="text-white font-extrabold text-sm font-mono">
                  {content.profileName.split(' ').map(n => n[0]).join('') || 'JN'}
                </span>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">{content.profileName}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {content.profileRole} | Tekla BIM & Fabrication Drawings
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-3">
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
                className="w-10 h-10 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-medium">
            © 2025 Julkar Naeem. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-slate-500">julkarnaeem.com</span>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('admin');
                } else {
                  window.location.hash = '#admin';
                }
              }}
              className="text-slate-500 hover:text-emerald-400 flex items-center gap-1 transition-colors text-xs font-mono font-bold"
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
