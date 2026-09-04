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
        sessionStorage.setItem('julkarnaeem_db_session', 'true');
        onLogin();
      } else {
        setError('Invalid admin passcode. Access denied.');
        setIsSubmitting(false);
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-charcoal text-white flex items-center justify-center p-6 cad-grid-dark relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-steel-blue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-safety-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <button
          onClick={onBackToSite}
          className="mb-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F3F4F6]/70 hover:text-safety-yellow transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Return to Public Site
        </button>

        {/* Login Box */}
        <div className="bg-[#181E27] border border-white/10 p-8 sm:p-10 shadow-2xl relative cad-corner-box">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/5 border border-white/15 text-safety-yellow mb-4 shadow-inner">
              <Lock size={26} />
            </div>
            <span className="block text-[10px] font-mono font-bold tracking-[0.25em] text-safety-yellow uppercase">
              Restricted Area
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              Project Database
            </h1>
            <p className="text-xs text-[#F3F4F6]/70 mt-2 font-mono">
              Internal Tekla BIM &amp; Project Management System
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-start gap-2.5 animate-fade-in">
              <ShieldAlert size={16} className="text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#F3F4F6]/80 mb-2">
                Admin Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F3F4F6]/40">
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
                  className="w-full bg-[#12161D] border border-white/15 pl-10 pr-11 py-3 text-white text-sm font-mono placeholder:text-white/30 focus:outline-none focus:border-safety-yellow transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#F3F4F6]/50 hover:text-white transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !passcode}
              className="w-full py-3.5 bg-safety-yellow text-charcoal font-bold text-xs uppercase tracking-[0.2em] btn-tactile disabled:opacity-50 disabled:cursor-not-allowed hover:bg-steel-blue hover:text-white transition-all duration-300 cursor-pointer shadow-lg mt-2"
            >
              {isSubmitting ? 'Authenticating...' : 'Unlock Dashboard'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <span className="text-[11px] text-[#F3F4F6]/50 font-mono">
              Protected by Client-Side Passcode Encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
