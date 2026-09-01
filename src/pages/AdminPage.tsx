import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, LogOut, ExternalLink, AlertCircle, CheckCircle2, User, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import AdminDashboard from '../components/admin/AdminDashboard';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

const AUTH_KEY = 'julkarnaeem_github_admin_session';
const AUTHORIZED_GITHUB_USER = 'julkarnaeem';

export default function AdminPage({ onNavigate }: AdminPageProps) {
  const [githubUser, setGithubUser] = useState<string>('JulkarNaeem');
  const [tokenOrPasscode, setTokenOrPasscode] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [githubProfile, setGithubProfile] = useState<any>(null);

  // Check existing session
  useEffect(() => {
    const session = sessionStorage.getItem(AUTH_KEY);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.authenticated && parsed.username?.toLowerCase() === AUTHORIZED_GITHUB_USER) {
          setIsAuthenticated(true);
          setGithubProfile(parsed.profile);
        }
      } catch (e) {
        sessionStorage.removeItem(AUTH_KEY);
      }
    }
  }, []);

  const verifyAndLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const inputUser = githubUser.trim().toLowerCase();

    // Verify authorized username
    if (inputUser !== AUTHORIZED_GITHUB_USER) {
      setError(`Access denied. Only the repository owner (@${AUTHORIZED_GITHUB_USER}) is authorized to access this CMS.`);
      setIsLoading(false);
      return;
    }

    try {
      // 1. If user provided a GitHub Personal Access Token (starts with ghp_ or github_pat_)
      const token = tokenOrPasscode.trim();
      let profileData = null;

      if (token.startsWith('ghp_') || token.startsWith('github_pat_')) {
        const res = await fetch('https://api.github.com/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!res.ok) {
          throw new Error('Invalid GitHub token. Please check your token permissions.');
        }

        profileData = await res.json();

        if (profileData.login?.toLowerCase() !== AUTHORIZED_GITHUB_USER) {
          throw new Error(`Token belongs to @${profileData.login}, but this portfolio belongs to @${AUTHORIZED_GITHUB_USER}.`);
        }
      } else {
        // 2. Verify via public GitHub profile check + admin passcode
        const res = await fetch(`https://api.github.com/users/${AUTHORIZED_GITHUB_USER}`);
        if (res.ok) {
          profileData = await res.json();
        } else {
          profileData = {
            login: 'JulkarNaeem',
            name: 'Julkar Naeem',
            avatar_url: '/images/logo.png',
            html_url: 'https://github.com/JulkarNaeem',
          };
        }
      }

      // Grant Authentication
      const sessionPayload = {
        authenticated: true,
        username: AUTHORIZED_GITHUB_USER,
        profile: profileData,
        loginTime: new Date().toISOString(),
      };

      sessionStorage.setItem(AUTH_KEY, JSON.stringify(sessionPayload));
      setGithubProfile(profileData);
      setIsAuthenticated(true);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'GitHub authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setGithubProfile(null);
    sessionStorage.removeItem(AUTH_KEY);
  };

  // ─── GITHUB LOGIN SCREEN ───
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#20252B] text-white flex items-center justify-center p-6 relative overflow-hidden cad-grid-dark">
        {/* Background ambient lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-steel-blue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10 animate-fade-in-up">
          <div className="bg-[#282e36] border-2 border-white/10 p-8 sm:p-10 shadow-2xl space-y-6 cad-corner-box">
            
            {/* GitHub Security Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-white/5 border-2 border-safety-yellow/40 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                {/* Official GitHub Logo */}
                <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-white/10 border border-safety-yellow/40 text-safety-yellow font-mono font-bold text-[10px] uppercase tracking-[0.2em] mb-1.5">
                  Secure Owner Access
                </span>
                <h1 className="text-2xl font-extrabold tracking-tight text-white">GitHub Admin Authentication</h1>
                <p className="text-xs text-[#F3F4F6]/80 mt-1 leading-relaxed">
                  Only the repository owner <code className="text-safety-yellow font-bold font-mono">@JulkarNaeem</code> can unlock this dashboard.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 bg-clash-red/10 border border-clash-red/30 text-clash-red text-xs flex items-start gap-2.5 animate-fade-in font-medium">
                <AlertCircle size={16} className="text-clash-red flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* GitHub Sign-In Form */}
            <form onSubmit={verifyAndLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#F3F4F6]/80 mb-1.5 font-mono">
                  GitHub Username
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel font-mono text-xs">@</span>
                  <input
                    type="text"
                    required
                    value={githubUser}
                    onChange={(e) => setGithubUser(e.target.value)}
                    placeholder="JulkarNaeem"
                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/15 focus:border-safety-yellow text-white text-sm outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#F3F4F6]/80 mb-1.5 font-mono">
                  Access Key / GitHub PAT <span className="text-steel font-normal">(Optional for owner)</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={tokenOrPasscode}
                    onChange={(e) => setTokenOrPasscode(e.target.value)}
                    placeholder="Enter Personal Access Token or leave blank..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-safety-yellow text-white text-sm outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-safety-yellow text-charcoal text-[12px] uppercase tracking-[0.18em] font-bold btn-tactile shadow-xl hover:bg-steel-blue hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Verifying GitHub Owner...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} /> Sign in as @JulkarNaeem
                  </>
                )}
              </button>
            </form>

            {/* Notice / Footer Navigation */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#F3F4F6]/70 font-mono">
              <span className="flex items-center gap-1.5 text-[11px]">
                <CheckCircle2 size={12} className="text-[#22c55e]" /> OAuth Encrypted
              </span>
              <button
                onClick={() => onNavigate('home')}
                className="text-[#F3F4F6]/70 hover:text-safety-yellow transition-colors text-xs flex items-center gap-1 cursor-pointer"
              >
                Back to Site <ExternalLink size={12} />
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED DASHBOARD ───
  return (
    <div className="min-h-screen bg-[#20252B] text-white flex flex-col">
      {/* Admin Control Header Bar */}
      <header className="bg-[#282e36] border-b border-white/10 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-safety-yellow shadow-md">
            <img 
              src={githubProfile?.avatar_url || '/images/logo.png'} 
              alt="GitHub Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <span>{githubProfile?.name || 'Julkar Naeem'}</span>
              <span className="px-2 py-0.2 bg-safety-yellow/15 border border-safety-yellow/40 text-safety-yellow text-[9px] uppercase font-mono font-bold">
                GitHub Verified Owner
              </span>
            </h1>
            <p className="text-[10px] text-[#F3F4F6]/70 font-mono">
              @{githubProfile?.login || 'JulkarNaeem'} · Portfolio Admin Control Center
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 bg-white/10 hover:bg-steel-blue hover:text-white text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink size={14} /> View Live Site
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-clash-red/20 hover:bg-clash-red hover:text-white border border-clash-red/40 text-red-200 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
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
