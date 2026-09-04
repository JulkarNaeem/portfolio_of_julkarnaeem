import React, { useState, useRef } from 'react';
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  KeyRound,
  LogOut,
  Globe,
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
    try {
      return sessionStorage.getItem('julkarnaeem_db_session') === 'true';
    } catch {
      return false;
    }
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
    try {
      sessionStorage.removeItem('julkarnaeem_db_session');
    } catch (e) {
      console.error('Session storage logout error:', e);
    }
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
    <div className="min-h-screen bg-[#F8FAFC] text-charcoal pt-8 sm:pt-12 pb-20 cad-grid-light relative">
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
            CONTROL CENTER ADMIN HEADER BAR (LIGHT GRAY THEME)
            ══════════════════════════════════════════════════════ */}
        <div className="bg-white border-2 border-border p-5 sm:p-6 mb-8 shadow-md relative cad-corner-box">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Title & Badge */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-surface border border-border text-steel-blue flex items-center justify-center shrink-0 shadow-sm">
                <Database size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-steel-blue font-bold bg-steel-blue/10 px-2 py-0.5 border border-steel-blue/20">
                    Internal System
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    LOD 400 Tekla Repository
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal tracking-tight mt-1 font-sans">
                  Project Database &amp; Tracker
                </h1>
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {/* Back to Public Site */}
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface hover:bg-steel-blue hover:text-white text-charcoal text-xs font-mono uppercase tracking-wider border border-border transition-all duration-200 cursor-pointer shadow-xs"
                title="Return to public portfolio homepage"
              >
                <Globe size={14} className="text-steel-blue group-hover:text-white" />
                Site
              </button>

              {/* Change Passcode */}
              <button
                onClick={() => setShowPasscodeModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface hover:bg-steel-blue hover:text-white text-charcoal text-xs font-mono uppercase tracking-wider border border-border transition-all duration-200 cursor-pointer shadow-xs"
                title="Change admin passcode"
              >
                <KeyRound size={14} className="text-steel-blue" />
                Passcode
              </button>

              {/* Export JSON */}
              <button
                onClick={exportJson}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface hover:bg-emerald-600 hover:text-white text-charcoal text-xs font-mono uppercase tracking-wider border border-border transition-all duration-200 cursor-pointer shadow-xs"
                title="Download backup JSON copy of database"
              >
                <Download size={14} className="text-emerald-600" />
                Export
              </button>

              {/* Import JSON */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface hover:bg-sky-600 hover:text-white text-charcoal text-xs font-mono uppercase tracking-wider border border-border transition-all duration-200 cursor-pointer shadow-xs"
                title="Restore database from JSON file"
              >
                <Upload size={14} className="text-sky-600" />
                Import
              </button>

              {/* Reset to Seed */}
              <button
                onClick={() => setShowResetModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface hover:bg-orange-600 hover:text-white text-charcoal text-xs font-mono uppercase tracking-wider border border-border transition-all duration-200 cursor-pointer shadow-xs"
                title="Restore original 10 project records"
              >
                <RefreshCw size={14} className="text-orange-600" />
                Reset
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-700 text-xs font-mono uppercase tracking-wider border border-red-200 transition-all duration-200 cursor-pointer ml-1 shadow-xs"
                title="Lock database and logout"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>

          {/* Import / System Alert Feedback */}
          {importStatusMsg && (
            <div
              className={`mt-4 p-3 text-xs font-mono flex items-center justify-between border ${
                importStatusMsg.error
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              } animate-fade-in`}
            >
              <span>{importStatusMsg.text}</span>
              <button
                onClick={() => setImportStatusMsg(null)}
                className="text-slate-500 hover:text-charcoal cursor-pointer"
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
          CHANGE PASSCODE MODAL (LIGHT GRAY THEME)
          ══════════════════════════════════════════════════════ */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-2 border-border p-6 sm:p-8 max-w-md w-full shadow-2xl relative cad-corner-box">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-5">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-steel-blue" />
                <h3 className="text-base font-bold text-charcoal font-sans">
                  Change Admin Passcode
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowPasscodeModal(false);
                  setPasscodeMsg(null);
                }}
                className="text-slate-400 hover:text-charcoal cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {passcodeMsg && (
              <div
                className={`mb-4 p-3 text-xs font-mono border ${
                  passcodeMsg.error
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                {passcodeMsg.text}
              </div>
            )}

            <form onSubmit={handleChangePasscode} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[11px] text-slate-600 uppercase mb-1.5 font-semibold">
                  Current Passcode
                </label>
                <input
                  type="password"
                  value={currentPassInput}
                  onChange={(e) => setCurrentPassInput(e.target.value)}
                  required
                  placeholder="Enter current passcode"
                  className="w-full bg-[#F8FAFC] border border-border px-3 py-2 text-charcoal focus:outline-none focus:border-steel-blue focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 uppercase mb-1.5 font-semibold">
                  New Passcode
                </label>
                <input
                  type="password"
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  required
                  placeholder="Enter new passcode (min 4 chars)"
                  className="w-full bg-[#F8FAFC] border border-border px-3 py-2 text-charcoal focus:outline-none focus:border-steel-blue focus:bg-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasscodeModal(false);
                    setPasscodeMsg(null);
                  }}
                  className="px-4 py-2 text-slate-600 hover:text-charcoal cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-safety-yellow text-charcoal font-bold text-xs uppercase tracking-wider btn-tactile hover:bg-steel-blue hover:text-white cursor-pointer shadow-sm"
                >
                  Save Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          RESET CONFIRMATION MODAL (LIGHT GRAY THEME)
          ══════════════════════════════════════════════════════ */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-2 border-red-200 p-6 sm:p-8 max-w-md w-full shadow-2xl relative cad-corner-box">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-red-50 text-red-600 border border-red-200 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-charcoal font-sans">
                  Reset Database to Seed?
                </h3>
                <p className="text-xs text-slate-600 font-mono mt-1 leading-relaxed">
                  This will erase custom changes in local storage and restore the original 10 project records.
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2.5 border-t border-border font-mono text-xs">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-charcoal cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToSeed();
                  setShowResetModal(false);
                  setView('list');
                }}
                className="px-5 py-2 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-red-700 cursor-pointer shadow-sm"
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
