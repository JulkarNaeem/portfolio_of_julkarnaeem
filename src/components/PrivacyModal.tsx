import { useEffect, useState } from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'privacy' | 'terms';
}

export default function PrivacyModal({ isOpen, onClose, defaultTab = 'privacy' }: PrivacyModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-charcoal border-2 border-white/15 text-white shadow-2xl overflow-hidden cad-corner-box flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1A1E24]">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-safety-yellow" />
            <h2 id="modal-title" className="text-base sm:text-lg font-bold tracking-tight text-white">
              Legal &amp; Compliance Transparency
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-[#F3F4F6]/70 hover:text-safety-yellow p-1 rounded-sm transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#16191E] px-6 pt-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 px-4 text-xs font-mono uppercase tracking-wider font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-safety-yellow text-safety-yellow'
                : 'border-transparent text-[#F3F4F6]/60 hover:text-white'
            }`}
          >
            Privacy Policy &amp; Cookies
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-4 text-xs font-mono uppercase tracking-wider font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'terms'
                ? 'border-safety-yellow text-safety-yellow'
                : 'border-transparent text-[#F3F4F6]/60 hover:text-white'
            }`}
          >
            Terms of Service &amp; Scope
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#F3F4F6]/90 leading-relaxed font-sans">
          {activeTab === 'privacy' ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-safety-yellow mb-2 flex items-center gap-2">
                  <Lock size={15} /> 1. Information Collection &amp; Use
                </h3>
                <p className="text-xs text-[#F3F4F6]/80 leading-relaxed">
                  We respect client confidentiality. When you contact Julkar Naeem via email, WhatsApp, or Upwork, any architectural drawings, CAD files, engineering calculations, and personal contact info provided are strictly used to evaluate and detail your project. Your project data is never sold, shared, or distributed to third parties.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-safety-yellow mb-2 flex items-center gap-2">
                  <FileText size={15} /> 2. Cookies &amp; Analytics
                </h3>
                <p className="text-xs text-[#F3F4F6]/80 leading-relaxed">
                  This website does not store tracking cookies for advertising or commercial surveillance. Essential browser storage (such as local caching) may be used solely to save your local UI preferences or portfolio state.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-safety-yellow mb-2 flex items-center gap-2">
                  <CheckCircle2 size={15} /> 3. Non-Disclosure &amp; Project Privacy (NDA)
                </h3>
                <p className="text-xs text-[#F3F4F6]/80 leading-relaxed">
                  We are happy to sign standard Non-Disclosure Agreements (NDAs) before reviewing proprietary engineering models or commercial project blueprints.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-safety-yellow mb-2">
                  4. Contact for Privacy Inquiries
                </h3>
                <p className="text-xs text-[#F3F4F6]/80 leading-relaxed">
                  For data requests or questions regarding our privacy practices, contact{' '}
                  <a href="mailto:hello@julkarnaeem.com" className="text-safety-yellow underline">
                    hello@julkarnaeem.com
                  </a>.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-safety-yellow mb-2 flex items-center gap-2">
                  <FileText size={15} /> 1. Professional Scope &amp; Deliverables
                </h3>
                <p className="text-xs text-[#F3F4F6]/80 leading-relaxed">
                  Julkar Naeem provides Tekla 3D BIM modeling, steel shop drawings, general arrangement plans, connection detailing, and material schedules according to AISC, BS, or client-specified engineering standards. Deliverables are provided in PDF, DWG, DXF, IFC, and NC/DSTV machine formats.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-safety-yellow mb-2 flex items-center gap-2">
                  <ShieldCheck size={15} /> 2. Engineer of Record (EOR) Approval
                </h3>
                <p className="text-xs text-[#F3F4F6]/80 leading-relaxed">
                  Fabrication drawings and connection designs must be reviewed and approved by the project’s Engineer of Record (EOR) or structural engineer prior to shop cutting and site erection.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-safety-yellow mb-2 flex items-center gap-2">
                  <CheckCircle2 size={15} /> 3. Payment &amp; Escrow Security
                </h3>
                <p className="text-xs text-[#F3F4F6]/80 leading-relaxed">
                  For client security and milestone protection, international contracts can be contracted via Upwork Escrow, wire transfer, or agreed milestone schedules with clear progress sign-offs.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#1A1E24] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#F3F4F6]/60">
            Last Updated: 2026 · Julkar Naeem
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-safety-yellow text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-steel-blue hover:text-white transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
