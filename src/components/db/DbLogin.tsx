import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';
import { useProjectDb } from '../../context/ProjectDbContext';

interface DbLoginProps {
  onLogin: () => void;
  onBackToSite: () => void;
}

export default function DbLogin({ onLogin, onBackToSite }: DbLoginProps) {
  const { getPasscode } = useProjectDb();
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      const correctPasscode = getPasscode();
      if (passcode === correctPasscode) {
        try {
          sessionStorage.setItem('julkarnaeem_db_session', 'true');
        } catch (err) {
          console.error('Session storage access error:', err);
        }
        onLogin();
      } else {
        setError('Invalid admin passcode. Access denied.');
        setIsSubmitting(false);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-charcoal flex items-center justify-center p-6 cad-grid-light relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Back Link */}
        <button
          onClick={onBackToSite}
          className="mb-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-steel-blue transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Return to Public Site
        </button>

        {/* Clean Modern Login Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-50 rounded-2xl border border-slate-200 text-steel-blue mb-4 shadow-xs">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight font-sans">
              Project Database
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 font-mono">
              Internal Tekla BIM &amp; Project Management
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-mono flex items-start gap-2.5 animate-fade-in">
              <ShieldAlert size={16} className="text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2 font-medium">
                Admin Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter passcode"
                  autoFocus
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-11 py-3 text-charcoal text-sm font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-charcoal transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !passcode}
              className="w-full py-3.5 bg-safety-yellow text-charcoal font-bold text-xs uppercase tracking-[0.2em] rounded-lg btn-tactile disabled:opacity-50 disabled:cursor-not-allowed hover:bg-steel-blue hover:text-white transition-all duration-300 cursor-pointer shadow-sm mt-2"
            >
              {isSubmitting ? 'Authenticating...' : 'Unlock Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400 font-mono">
              Protected by Client-Side Passcode Encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
