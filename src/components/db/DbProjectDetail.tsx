import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle2,
  Circle,
  Plus,
  HelpCircle,
  CheckSquare,
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
      <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8 text-charcoal">
        <h2 className="text-xl font-bold text-charcoal mb-3">Project Record Not Found</h2>
        <p className="text-sm text-slate-500 mb-6 font-mono">
          The project ID "{projectId}" does not exist in local storage.
        </p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 bg-safety-yellow text-charcoal font-bold text-xs uppercase tracking-wider rounded-lg btn-tactile cursor-pointer shadow-xs"
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

  const getStatusIndicator = (status: ProjectStatus) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Completed
          </span>
        );
      case 'In progress':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            In Progress
          </span>
        );
      case 'On hold':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-orange-700">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            On Hold
          </span>
        );
      case 'Quotation':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-sky-700">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            Quotation
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Cancelled
          </span>
        );
    }
  };

  const getRfiStatusIndicator = (status: RfiStatus) => {
    switch (status) {
      case 'Open':
        return (
          <span className="text-[11px] font-mono font-semibold text-amber-600">
            ● Open
          </span>
        );
      case 'Answered':
        return (
          <span className="text-[11px] font-mono font-semibold text-sky-600">
            ● Answered
          </span>
        );
      case 'Closed':
        return (
          <span className="text-[11px] font-mono font-semibold text-emerald-600">
            ● Closed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto text-charcoal">
      {/* ══════════════════════════════════════════════════════
          TOP NAVIGATION & ACTIONS
          ══════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-steel-blue transition-colors cursor-pointer font-medium"
        >
          <ArrowLeft size={14} />
          Back to Database
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onEdit(project.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono uppercase tracking-wider border border-slate-200 rounded-lg transition-all cursor-pointer shadow-xs font-medium"
          >
            <Edit size={14} />
            Edit Project
          </button>

          {deleteConfirm ? (
            <div className="flex items-center gap-1.5 bg-red-50 p-1 rounded-lg border border-red-200">
              <span className="text-[11px] font-mono text-red-700 px-2 font-medium">Confirm delete?</span>
              <button
                onClick={() => {
                  deleteProject(project.id);
                  onBack();
                }}
                className="px-2.5 py-1 bg-red-600 text-white text-xs font-mono font-bold rounded hover:bg-red-700 cursor-pointer shadow-xs"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="px-2 py-1 text-slate-500 hover:text-charcoal text-xs font-mono cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-red-600 hover:bg-red-50 text-xs font-mono uppercase tracking-wider border border-red-200 rounded-lg transition-all cursor-pointer shadow-xs font-medium"
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
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Image preview */}
          <div className="lg:col-span-5 bg-slate-50 relative min-h-[260px] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100 p-4">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="max-h-[280px] w-full object-contain rounded-xl"
              />
            ) : (
              <div className="text-center text-slate-400 font-mono text-xs">
                No Preview Image
              </div>
            )}
            <div className="absolute top-3 left-3 bg-charcoal text-safety-yellow font-mono text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
              {project.id}
            </div>
          </div>

          {/* Details header */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-medium">
                  {project.type}
                </span>
                {getStatusIndicator(project.status)}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight font-sans">
                {project.title}
              </h1>

              {project.projectNumber && (
                <span className="inline-block text-xs font-mono text-slate-400 mt-1">
                  Project No: {project.projectNumber}
                </span>
              )}

              <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed font-sans">
                {project.description || 'No detailed scope description provided.'}
              </p>
            </div>

            {/* Quick stats ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-medium">Weight</span>
                <span className="text-base font-bold text-charcoal font-mono">
                  {project.weight_tons > 0 ? `${project.weight_tons} t` : '—'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-medium">Area</span>
                <span className="text-base font-bold text-charcoal font-mono">
                  {project.area_sqm > 0 ? `${project.area_sqm} m²` : '—'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-medium">Standard</span>
                <span className="text-base font-bold text-steel-blue font-mono">
                  {project.designStandard}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-medium">Location</span>
                <span className="text-xs font-bold text-charcoal font-mono truncate block" title={project.location}>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ──────────────────────────────────────────────────────
            COLUMN A: TASKS CHECKLIST
            ────────────────────────────────────────────────────── */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <CheckSquare size={18} className="text-steel-blue" />
              <h2 className="text-base font-bold text-charcoal tracking-tight font-sans">
                Project Deliverable Tasks
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 font-medium">
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
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-charcoal text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!newTaskText.trim()}
              className="px-4 py-2 bg-safety-yellow text-charcoal font-bold text-xs uppercase tracking-wider rounded-lg btn-tactile disabled:opacity-40 disabled:cursor-not-allowed hover:bg-steel-blue hover:text-white transition-all cursor-pointer shrink-0 shadow-xs"
            >
              <Plus size={15} />
            </button>
          </form>

          {/* Tasks list */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {tasks.length === 0 ? (
              <p className="text-xs font-mono text-slate-400 text-center py-8">
                No tasks logged yet. Add tasks above to track Tekla detailing deliverables.
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start justify-between gap-3 p-3 rounded-xl border transition-all ${
                    task.done
                      ? 'bg-slate-50/70 border-slate-100 text-slate-400'
                      : 'bg-white border-slate-200 text-charcoal hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleTask(project.id, task.id)}
                    className="flex items-start gap-3 text-left flex-1 cursor-pointer group"
                  >
                    <span className="shrink-0 mt-0.5 text-steel-blue group-hover:scale-110 transition-transform">
                      {task.done ? (
                        <CheckCircle2 size={16} className="text-emerald-600" />
                      ) : (
                        <Circle size={16} className="text-slate-300 group-hover:text-steel-blue" />
                      )}
                    </span>
                    <span
                      className={`text-xs font-mono leading-relaxed ${
                        task.done ? 'line-through text-slate-400' : 'text-charcoal font-medium'
                      }`}
                    >
                      {task.text}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTask(project.id, task.id)}
                    className="text-slate-300 hover:text-red-600 p-1 transition-colors cursor-pointer shrink-0"
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
            COLUMN B: RFI TRACKER
            ────────────────────────────────────────────────────── */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <HelpCircle size={18} className="text-sky-600" />
              <h2 className="text-base font-bold text-charcoal tracking-tight font-sans">
                RFIs &amp; Clarifications
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 font-medium">
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
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-charcoal text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={!newRfiQuestion.trim()}
                className="px-4 py-2 bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg btn-tactile disabled:opacity-40 disabled:cursor-not-allowed hover:bg-steel-blue transition-all cursor-pointer shrink-0 shadow-xs"
              >
                Log RFI
              </button>
            </div>
          </form>

          {/* RFI list */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {rfis.length === 0 ? (
              <p className="text-xs font-mono text-slate-400 text-center py-8">
                No RFIs logged for this project.
              </p>
            ) : (
              rfis.map((rfi) => (
                <div
                  key={rfi.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        {getRfiStatusIndicator(rfi.status)}
                        <span className="text-[10px] font-mono text-slate-400">
                          {new Date(rfi.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-charcoal font-medium">
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
                        className="bg-white border border-slate-200 rounded px-2 py-1 text-[10px] font-mono text-charcoal focus:outline-none focus:border-steel-blue cursor-pointer"
                      >
                        <option value="Open">Open</option>
                        <option value="Answered">Answered</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => deleteRfi(project.id, rfi.id)}
                        className="text-slate-300 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Delete RFI"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Answer section */}
                  {answeringRfiId === rfi.id ? (
                    <div className="pt-2 border-t border-slate-200 space-y-2 animate-fade-in">
                      <textarea
                        rows={2}
                        value={rfiAnswerText}
                        onChange={(e) => setRfiAnswerText(e.target.value)}
                        placeholder="Type response / engineering approval..."
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-charcoal text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setAnsweringRfiId(null)}
                          className="px-2.5 py-1 text-[10px] font-mono text-slate-500 hover:text-charcoal cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          onClick={() => handleSaveAnswer(rfi.id)}
                          className="px-3 py-1 bg-sky-600 text-white font-bold text-[10px] font-mono uppercase tracking-wider rounded cursor-pointer shadow-xs hover:bg-steel-blue"
                        >
                          Save Answer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-slate-200/60 flex items-start justify-between gap-2">
                      <div className="text-xs font-mono text-slate-700 flex-1">
                        {rfi.answer ? (
                          <span className="text-emerald-800">
                            <strong className="text-charcoal font-bold">A:</strong> {rfi.answer}
                          </span>
                        ) : (
                          <span className="italic text-slate-400">No response provided yet.</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAnsweringRfiId(rfi.id);
                          setRfiAnswerText(rfi.answer || '');
                        }}
                        className="text-[10px] font-mono text-steel-blue hover:underline cursor-pointer shrink-0 font-medium"
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
