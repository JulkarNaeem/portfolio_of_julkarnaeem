import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, Eye, EyeOff, LogOut, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import AdminDashboard from '../components/admin/AdminDashboard';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

const AUTH_KEY = 'julkarnaeem_admin_session_v1';

export default function AdminPage({ onNavigate }: AdminPageProps) {
  const { content } = useCms();
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if session is already authenticated
    const session = sessionStorage.getItem(AUTH_KEY);
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPasscode = content.adminPasscode || 'admin123';

    if (passcode.trim() === correctPasscode.trim()) {
      setIsAuthenticated(true);
      setError(false);
      sessionStorage.setItem(AUTH_KEY, 'true');
    } else {
      setError(true);
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  // ─── LOGIN SCREEN ───
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#e8b100_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="bg-charcoal border border-white/10 p-8 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mx-auto mb-4">
                <Lock size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Admin Control Center</h1>
              <p className="text-xs text-steel-lighter">
                Restricted area. Enter passcode to access website management dashboard.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-steel-lighter">
                  Admin Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setError(false);
                    }}
                    placeholder="Enter passcode..."
                    className={`w-full px-4 py-3 bg-white/5 border text-white text-sm focus:outline-none transition-colors ${
                      error ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-accent'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-lighter hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>Invalid Passcode. Please try again.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-accent text-charcoal font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg"
              >
                <KeyRound size={16} /> Unlock Admin Portal
              </button>
            </form>

            {/* Notice / Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-steel-lighter">
              <span className="text-[10px]">Default Passcode: <code className="text-accent font-mono">admin123</code></span>
              <button
                onClick={() => onNavigate('home')}
                className="text-steel-lighter hover:text-accent underline text-xs flex items-center gap-1"
              >
                Back to Website <ExternalLink size={12} />
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED DASHBOARD ───
  return (
    <div className="min-h-screen bg-charcoal text-white flex flex-col">
      {/* Admin Control Bar */}
      <header className="bg-charcoal border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent flex items-center justify-center">
            <span className="text-charcoal font-bold text-sm font-mono">JN</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              Julkar Naeem Portfolio CMS <ShieldCheck size={14} className="text-accent" />
            </h1>
            <span className="text-[10px] uppercase tracking-wider text-steel-lighter">Authorized Admin Session</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink size={14} /> View Website
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500 hover:text-white border border-red-500/40 text-red-300 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Embedded Admin Dashboard */}
      <main className="flex-1">
        <AdminDashboard embedded />
      </main>
    </div>
  );
}
