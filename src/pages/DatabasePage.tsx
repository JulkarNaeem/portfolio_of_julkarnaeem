import React, { useState, useEffect, useRef } from 'react';
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  KeyRound,
  LogOut,
  Globe,
  CheckCircle2,
  AlertTriangle,
  X,
  Lock,
} from 'lucide-react';
import { useProjectDb } from '../context/ProjectDbContext';
import DbLogin from '../components/db/DbLogin';
import DbDashboard from '../components/db/DbDashboard';
import DbProjectForm from '../components/db/DbProjectForm';
import DbProjectDetail from '../components/db/DbProjectDetail';

interface DatabasePageProps {
  onNavigate: (page: string) => void;
}

type DbView = 'list' | 'create' | 'edit' | 'detail';

export default function DatabasePage({ onNavigate }: DatabasePageProps) {
  const {
    exportJson,
    importJson,
    resetToSeed,
    getPasscode,
    setPasscode,
  } = useProjectDb();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('julkarnaeem_db_session') === 'true';
  });

  const [view, setView] = useState<DbView>('list');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Modals
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [passcodeMsg, setPasscodeMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const [showResetModal, setShowResetModal] = useState(false);
  const [importStatusMsg, setImportStatusMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('julkarnaeem_db_session');
    setIsAuthenticated(false);
  };

  // Handle Passcode Change
  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const actualPass = getPasscode();
    if (currentPassInput !== actualPass) {
      setPasscodeMsg({ text: 'Current passcode is incorrect.', error: true });
      return;
    }
    if (newPassInput.trim().length < 4) {
      setPasscodeMsg({ text: 'New passcode must be at least 4 characters long.', error: true });
      return;
    }
    setPasscode(newPassInput.trim());
    setPasscodeMsg({ text: 'Passcode updated successfully!', error: false });
    setTimeout(() => {
      setShowPasscodeModal(false);
      setCurrentPassInput('');
      setNewPassInput('');
      setPasscodeMsg(null);
    }, 1200);
  };

  // Handle Import JSON
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importJson(content);
        if (success) {
          setImportStatusMsg({ text: 'Database imported and restored successfully!', error: false });
          setView('list');
        } else {
          setImportStatusMsg({ text: 'Failed to import JSON. Invalid database schema.', error: true });
        }
        setTimeout(() => setImportStatusMsg(null), 4000);
      }
    };
    reader.readAsText(file);
    // Reset file input value
    e.target.value = '';
  };

  // If not logged in, show Passcode Login Screen
  if (!isAuthenticated) {
    return (
      <DbLogin
        onLogin={() => setIsAuthenticated(true)}
        onBackToSite={() => onNavigate('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-white pt-24 pb-20 cad-grid-dark relative">
      {/* Hidden File Input for Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ══════════════════════════════════════════════════════
            CONTROL CENTER ADMIN HEADER BAR
            ══════════════════════════════════════════════════════ */}
        <div className="bg-[#181E27] border border-white/10 p-5 sm:p-6 mb-8 shadow-2xl relative cad-corner-box">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Title & Badge */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-safety-yellow/10 border border-safety-yellow/30 text-safety-yellow flex items-center justify-center shrink-0">
                <Database size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-safety-yellow font-bold bg-safety-yellow/10 px-2 py-0.5 border border-safety-yellow/20">
                    Internal System
                  </span>
                  <span className="text-xs font-mono text-[#F3F4F6]/50">
                    LOD 400 Repository
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1 font-sans">
                  Project Database &amp; Tracker
                </h1>
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {/* Back to Public Site */}
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-mono uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                title="Return to public portfolio homepage"
              >
                <Globe size={13} className="text-safety-yellow" />
                Site
              </button>

              {/* Change Passcode */}
              <button
                onClick={() => setShowPasscodeModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-mono uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                title="Change admin passcode"
              >
                <KeyRound size={13} className="text-safety-yellow" />
                Passcode
              </button>

              {/* Export JSON */}
              <button
                onClick={exportJson}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-mono uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                title="Download backup JSON copy of database"
              >
                <Download size={13} className="text-emerald-400" />
                Export
              </button>

              {/* Import JSON */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-mono uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                title="Restore database from JSON file"
              >
                <Upload size={13} className="text-sky-400" />
                Import
              </button>

              {/* Reset to Seed */}
              <button
                onClick={() => setShowResetModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-mono uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                title="Restore original 10 project records"
              >
                <RefreshCw size={13} className="text-orange-400" />
                Reset
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-mono uppercase tracking-wider border border-red-500/30 transition-colors cursor-pointer ml-1"
                title="Lock database and logout"
              >
                <LogOut size={13} />
                Logout
              </button>
            </div>
          </div>

          {/* Import / System Alert Feedback */}
          {importStatusMsg && (
            <div
              className={`mt-4 p-3 text-xs font-mono flex items-center justify-between border ${
                importStatusMsg.error
                  ? 'bg-red-500/10 border-red-500/30 text-red-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              } animate-fade-in`}
            >
              <span>{importStatusMsg.text}</span>
              <button
                onClick={() => setImportStatusMsg(null)}
                className="text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════
            MAIN VIEW ROUTER
            ══════════════════════════════════════════════════════ */}
        {view === 'list' && (
          <DbDashboard
            onAddProject={() => {
              setSelectedProjectId(null);
              setView('create');
            }}
            onEditProject={(id) => {
              setSelectedProjectId(id);
              setView('edit');
            }}
            onSelectProject={(id) => {
              setSelectedProjectId(id);
              setView('detail');
            }}
          />
        )}

        {(view === 'create' || view === 'edit') && (
          <DbProjectForm
            projectId={view === 'edit' ? selectedProjectId : null}
            onCancel={() => setView('list')}
            onSaved={(id) => {
              setSelectedProjectId(id);
              setView('detail');
            }}
          />
        )}

        {view === 'detail' && selectedProjectId && (
          <DbProjectDetail
            projectId={selectedProjectId}
            onBack={() => setView('list')}
            onEdit={(id) => {
              setSelectedProjectId(id);
              setView('edit');
            }}
          />
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          CHANGE PASSCODE MODAL
          ══════════════════════════════════════════════════════ */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#181E27] border border-white/15 p-6 sm:p-8 max-w-md w-full shadow-2xl relative cad-corner-box">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-safety-yellow" />
                <h3 className="text-base font-bold text-white font-sans">
                  Change Admin Passcode
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowPasscodeModal(false);
                  setPasscodeMsg(null);
                }}
                className="text-white/50 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {passcodeMsg && (
              <div
                className={`mb-4 p-3 text-xs font-mono border ${
                  passcodeMsg.error
                    ? 'bg-red-500/10 border-red-500/30 text-red-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                }`}
              >
                {passcodeMsg.text}
              </div>
            )}

            <form onSubmit={handleChangePasscode} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[11px] text-[#F3F4F6]/70 uppercase mb-1.5">
                  Current Passcode
                </label>
                <input
                  type="password"
                  value={currentPassInput}
                  onChange={(e) => setCurrentPassInput(e.target.value)}
                  required
                  placeholder="Enter current passcode"
                  className="w-full bg-[#12161D] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-safety-yellow"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#F3F4F6]/70 uppercase mb-1.5">
                  New Passcode
                </label>
                <input
                  type="password"
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  required
                  placeholder="Enter new passcode (min 4 chars)"
                  className="w-full bg-[#12161D] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-safety-yellow"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasscodeModal(false);
                    setPasscodeMsg(null);
                  }}
                  className="px-4 py-2 text-white/60 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-safety-yellow text-charcoal font-bold text-xs uppercase tracking-wider btn-tactile cursor-pointer"
                >
                  Save Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          RESET CONFIRMATION MODAL
          ══════════════════════════════════════════════════════ */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#181E27] border border-red-500/30 p-6 sm:p-8 max-w-md w-full shadow-2xl relative cad-corner-box">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-red-500/10 text-red-400 border border-red-500/30 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-sans">
                  Reset Database to Seed?
                </h3>
                <p className="text-xs text-[#F3F4F6]/70 font-mono mt-1 leading-relaxed">
                  This will erase custom changes in local storage and restore the original 10 project records.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2.5 border-t border-white/10 font-mono text-xs">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-white/60 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToSeed();
                  setShowResetModal(false);
                  setView('list');
                }}
                className="px-5 py-2 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-red-700 cursor-pointer"
              >
                Yes, Restore Seed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
