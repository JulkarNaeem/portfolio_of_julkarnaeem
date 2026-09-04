import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle2,
  Circle,
  Plus,
  HelpCircle,
  MessageSquare,
  CheckSquare,
  Weight,
  Layers,
  MapPin,
  Calendar,
  Shield,
  Send,
  Check,
} from 'lucide-react';
import { useProjectDb } from '../../context/ProjectDbContext';
import { RfiStatus, ProjectStatus } from '../../types/db';

interface DbProjectDetailProps {
  projectId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function DbProjectDetail({ projectId, onBack, onEdit }: DbProjectDetailProps) {
  const {
    getProject,
    deleteProject,
    addTask,
    toggleTask,
    deleteTask,
    addRfi,
    updateRfi,
    deleteRfi,
  } = useProjectDb();

  const project = getProject(projectId);

  // Local state for adding tasks & RFIs
  const [newTaskText, setNewTaskText] = useState('');
  const [newRfiQuestion, setNewRfiQuestion] = useState('');
  const [answeringRfiId, setAnsweringRfiId] = useState<string | null>(null);
  const [rfiAnswerText, setRfiAnswerText] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  if (!project) {
    return (
      <div className="text-center py-20 bg-[#181E27] border border-white/10 p-8">
        <h2 className="text-xl font-bold text-white mb-3">Project Record Not Found</h2>
        <p className="text-sm text-[#F3F4F6]/60 mb-6 font-mono">
          The project ID "{projectId}" does not exist in local storage.
        </p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 bg-safety-yellow text-charcoal font-bold text-xs uppercase tracking-wider btn-tactile cursor-pointer"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const tasks = project.tasks || [];
  const rfis = project.rfis || [];
  const completedTasks = tasks.filter((t) => t.done).length;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    addTask(project.id, newTaskText);
    setNewTaskText('');
  };

  const handleAddRfi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRfiQuestion.trim()) return;
    addRfi(project.id, newRfiQuestion);
    setNewRfiQuestion('');
  };

  const handleSaveAnswer = (rfiId: string) => {
    updateRfi(project.id, rfiId, {
      answer: rfiAnswerText.trim(),
      status: rfiAnswerText.trim() ? 'Answered' : 'Open',
    });
    setAnsweringRfiId(null);
    setRfiAnswerText('');
  };

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Completed
          </span>
        );
      case 'In progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            In Progress
          </span>
        );
      case 'On hold':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            On Hold
          </span>
        );
      case 'Quotation':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            Quotation
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-red-500/15 text-red-400 border border-red-500/30">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            Cancelled
          </span>
        );
    }
  };

  const getRfiStatusBadge = (status: RfiStatus) => {
    switch (status) {
      case 'Open':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            OPEN
          </span>
        );
      case 'Answered':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            ANSWERED
          </span>
        );
      case 'Closed':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            CLOSED
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* ══════════════════════════════════════════════════════
          TOP NAVIGATION & ACTIONS
          ══════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F3F4F6]/70 hover:text-safety-yellow transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Database
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(project.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider border border-white/15 transition-all cursor-pointer"
          >
            <Edit size={14} />
            Edit Project
          </button>

          {deleteConfirm ? (
            <div className="flex items-center gap-1.5 bg-red-500/15 p-1 border border-red-500/30">
              <span className="text-[11px] font-mono text-red-300 px-2">Confirm delete?</span>
              <button
                onClick={() => {
                  deleteProject(project.id);
                  onBack();
                }}
                className="px-2.5 py-1 bg-red-600 text-white text-xs font-mono font-bold hover:bg-red-700 cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="px-2 py-1 text-white/60 hover:text-white text-xs font-mono cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs font-mono uppercase tracking-wider border border-red-500/20 transition-all cursor-pointer"
            >
              <Trash2 size={14} />
              Delete
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PROJECT HERO / COVER BANNER
          ══════════════════════════════════════════════════════ */}
      <div className="bg-[#181E27] border border-white/10 shadow-2xl relative overflow-hidden cad-corner-box">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Image preview */}
          <div className="lg:col-span-5 bg-black/40 relative min-h-[260px] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 p-4">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="max-h-[280px] w-full object-contain"
              />
            ) : (
              <div className="text-center text-white/40 font-mono text-xs">
                No Preview Image
              </div>
            )}
            <div className="absolute top-3 left-3 bg-charcoal/90 text-safety-yellow font-mono text-xs font-bold px-2.5 py-1 border border-safety-yellow/30 shadow">
              {project.id}
            </div>
          </div>

          {/* Details header */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-steel-light">
                  {project.type}
                </span>
                {getStatusBadge(project.status)}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                {project.title}
              </h1>

              {project.projectNumber && (
                <span className="inline-block text-xs font-mono text-[#F3F4F6]/50 mt-1">
                  Project No: {project.projectNumber}
                </span>
              )}

              <p className="text-xs sm:text-sm text-[#F3F4F6]/80 mt-4 leading-relaxed font-sans">
                {project.description || 'No detailed scope description provided.'}
              </p>
            </div>

            {/* Quick stats ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-[10px] font-mono text-[#F3F4F6]/50 uppercase block">Weight</span>
                <span className="text-base font-bold text-white font-mono">
                  {project.weight_tons > 0 ? `${project.weight_tons} t` : '—'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#F3F4F6]/50 uppercase block">Area</span>
                <span className="text-base font-bold text-white font-mono">
                  {project.area_sqm > 0 ? `${project.area_sqm} m²` : '—'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#F3F4F6]/50 uppercase block">Standard</span>
                <span className="text-base font-bold text-safety-yellow font-mono">
                  {project.designStandard}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#F3F4F6]/50 uppercase block">Location</span>
                <span className="text-xs font-bold text-white font-mono truncate block" title={project.location}>
                  {project.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          2-COLUMN WORKFLOW: TASKS & RFIs
          ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ──────────────────────────────────────────────────────
            COLUMN A: TASKS CHECKLIST
            ────────────────────────────────────────────────────── */}
        <div className="bg-[#181E27] border border-white/10 p-6 shadow-xl relative cad-corner-box">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <CheckSquare size={18} className="text-safety-yellow" />
              <h2 className="text-base font-bold text-white tracking-tight font-sans">
                Project Deliverable Tasks
              </h2>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 bg-white/5 border border-white/10 text-white/80">
              {completedTasks}/{tasks.length} Done
            </span>
          </div>

          {/* Add task form */}
          <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Add detailing milestone or drawing task..."
              className="flex-1 bg-[#12161D] border border-white/15 px-3.5 py-2 text-white text-xs font-mono placeholder:text-white/30 focus:outline-none focus:border-safety-yellow transition-colors"
            />
            <button
              type="submit"
              disabled={!newTaskText.trim()}
              className="px-4 py-2 bg-safety-yellow text-charcoal font-bold text-xs uppercase tracking-wider btn-tactile disabled:opacity-40 disabled:cursor-not-allowed hover:bg-steel-blue hover:text-white transition-all cursor-pointer shrink-0"
            >
              <Plus size={15} />
            </button>
          </form>

          {/* Tasks list */}
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {tasks.length === 0 ? (
              <p className="text-xs font-mono text-[#F3F4F6]/40 text-center py-8">
                No tasks logged yet. Add tasks above to track Tekla detailing deliverables.
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start justify-between gap-3 p-3 border transition-all ${
                    task.done
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-[#F3F4F6]/50'
                      : 'bg-[#12161D] border-white/10 text-white hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleTask(project.id, task.id)}
                    className="flex items-start gap-3 text-left flex-1 cursor-pointer group"
                  >
                    <span className="shrink-0 mt-0.5 text-safety-yellow group-hover:scale-110 transition-transform">
                      {task.done ? (
                        <CheckCircle2 size={16} className="text-emerald-400" />
                      ) : (
                        <Circle size={16} className="text-[#F3F4F6]/40 group-hover:text-safety-yellow" />
                      )}
                    </span>
                    <span
                      className={`text-xs font-mono leading-relaxed ${
                        task.done ? 'line-through text-[#F3F4F6]/40' : 'text-white'
                      }`}
                    >
                      {task.text}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTask(project.id, task.id)}
                    className="text-[#F3F4F6]/30 hover:text-red-400 p-1 transition-colors cursor-pointer shrink-0"
                    title="Delete Task"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────
            COLUMN B: RFI (REQUEST FOR INFORMATION) TRACKER
            ────────────────────────────────────────────────────── */}
        <div className="bg-[#181E27] border border-white/10 p-6 shadow-xl relative cad-corner-box">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <HelpCircle size={18} className="text-sky-400" />
              <h2 className="text-base font-bold text-white tracking-tight font-sans">
                RFIs &amp; Engineering Clarifications
              </h2>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 bg-white/5 border border-white/10 text-white/80">
              {rfis.length} Total ({rfis.filter((r) => r.status === 'Open').length} Open)
            </span>
          </div>

          {/* Add RFI form */}
          <form onSubmit={handleAddRfi} className="space-y-2 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newRfiQuestion}
                onChange={(e) => setNewRfiQuestion(e.target.value)}
                placeholder="Log engineering query / connection question..."
                className="flex-1 bg-[#12161D] border border-white/15 px-3.5 py-2 text-white text-xs font-mono placeholder:text-white/30 focus:outline-none focus:border-safety-yellow transition-colors"
              />
              <button
                type="submit"
                disabled={!newRfiQuestion.trim()}
                className="px-4 py-2 bg-sky-500 text-charcoal font-bold text-xs uppercase tracking-wider btn-tactile disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sky-400 hover:text-charcoal transition-all cursor-pointer shrink-0"
              >
                Log RFI
              </button>
            </div>
          </form>

          {/* RFI list */}
          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
            {rfis.length === 0 ? (
              <p className="text-xs font-mono text-[#F3F4F6]/40 text-center py-8">
                No RFIs logged for this project. Use this panel to track structural queries &amp; fabricator approvals.
              </p>
            ) : (
              rfis.map((rfi) => (
                <div
                  key={rfi.id}
                  className="bg-[#12161D] border border-white/10 p-3.5 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        {getRfiStatusBadge(rfi.status)}
                        <span className="text-[10px] font-mono text-[#F3F4F6]/40">
                          {new Date(rfi.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-white font-medium">
                        Q: {rfi.question}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Status selector */}
                      <select
                        value={rfi.status}
                        onChange={(e) =>
                          updateRfi(project.id, rfi.id, {
                            status: e.target.value as RfiStatus,
                          })
                        }
                        className="bg-[#181E27] border border-white/15 px-2 py-1 text-[10px] font-mono text-white focus:outline-none focus:border-safety-yellow cursor-pointer"
                      >
                        <option value="Open">Open</option>
                        <option value="Answered">Answered</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => deleteRfi(project.id, rfi.id)}
                        className="text-[#F3F4F6]/30 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Delete RFI"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Answer section */}
                  {answeringRfiId === rfi.id ? (
                    <div className="pt-2 border-t border-white/10 space-y-2 animate-fade-in">
                      <textarea
                        rows={2}
                        value={rfiAnswerText}
                        onChange={(e) => setRfiAnswerText(e.target.value)}
                        placeholder="Type response / engineering approval..."
                        className="w-full bg-[#181E27] border border-white/15 p-2 text-white text-xs font-mono placeholder:text-white/30 focus:outline-none focus:border-safety-yellow"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setAnsweringRfiId(null)}
                          className="px-2.5 py-1 text-[10px] font-mono text-[#F3F4F6]/60 hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveAnswer(rfi.id)}
                          className="px-3 py-1 bg-sky-500 text-charcoal font-bold text-[10px] font-mono uppercase tracking-wider cursor-pointer"
                        >
                          Save Answer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-white/5 flex items-start justify-between gap-2">
                      <div className="text-xs font-mono text-[#F3F4F6]/70 flex-1">
                        {rfi.answer ? (
                          <span className="text-emerald-300">
                            <strong className="text-white/90">A:</strong> {rfi.answer}
                          </span>
                        ) : (
                          <span className="italic text-[#F3F4F6]/40">No response provided yet.</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAnsweringRfiId(rfi.id);
                          setRfiAnswerText(rfi.answer || '');
                        }}
                        className="text-[10px] font-mono text-safety-yellow hover:underline cursor-pointer shrink-0"
                      >
                        {rfi.answer ? 'Edit Answer' : '+ Provide Answer'}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
