import { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export default function CookieBanner({ onOpenPrivacy }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('jn_cookie_consent_v1');
    if (!consent) {
      // Delay showing by 1 second for smooth entry
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('jn_cookie_consent_v1', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 bg-[#1A1E24]/95 backdrop-blur-md border-2 border-safety-yellow/40 text-white p-4 sm:p-5 shadow-2xl cad-corner-box animate-fade-in-up"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-safety-yellow/10 rounded-sm text-safety-yellow flex-shrink-0 mt-0.5">
          <Cookie size={20} />
        </div>

        <div className="flex-1 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white font-mono uppercase tracking-wider text-[11px]">
              Privacy &amp; Cookie Notice
            </h3>
            <ShieldCheck size={13} className="text-[#22c55e]" />
          </div>
          
          <p className="text-[#F3F4F6]/80 leading-relaxed mb-3">
            We use essential local storage &amp; cookies to ensure optimal performance, security, and quick navigation. No commercial tracking or data selling.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 bg-safety-yellow text-charcoal font-bold font-mono text-[10px] uppercase tracking-wider hover:bg-steel-blue hover:text-white transition-colors cursor-pointer shadow-sm"
            >
              Accept &amp; Close
            </button>
            <button
              onClick={onOpenPrivacy}
              className="text-[11px] font-mono text-safety-yellow hover:underline cursor-pointer"
            >
              Review Privacy Policy →
            </button>
          </div>
        </div>

        <button
          onClick={handleAccept}
          aria-label="Dismiss cookie notice"
          className="text-[#F3F4F6]/50 hover:text-white p-1 transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
}
