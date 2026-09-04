import { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  FolderGit2,
  Weight,
  Layers,
  Clock,
  ListTodo,
  HelpCircle,
  Eye,
  Edit,
  Trash2,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useProjectDb } from '../../context/ProjectDbContext';
import { PROJECT_STATUSES, ProjectStatus } from '../../types/db';

interface DbDashboardProps {
  onAddProject: () => void;
  onEditProject: (id: string) => void;
  onSelectProject: (id: string) => void;
}

export default function DbDashboard({
  onAddProject,
  onEditProject,
  onSelectProject,
}: DbDashboardProps) {
  const { projects, deleteProject } = useProjectDb();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Computed statistics
  const stats = useMemo(() => {
    const totalCount = projects.length;
    const totalTons = projects.reduce((sum, p) => sum + (Number(p.weight_tons) || 0), 0);
    const totalAreaSqm = projects.reduce((sum, p) => sum + (Number(p.area_sqm) || 0), 0);
    const totalAreaSqft = projects.reduce((sum, p) => sum + (Number(p.area_sqft) || 0), 0);
    const inProgressCount = projects.filter((p) => p.status === 'In progress').length;

    let openTasksCount = 0;
    let openRfisCount = 0;
    projects.forEach((p) => {
      openTasksCount += (p.tasks || []).filter((t) => !t.done).length;
      openRfisCount += (p.rfis || []).filter((r) => r.status === 'Open').length;
    });

    return {
      totalCount,
      totalTons,
      totalAreaSqm,
      totalAreaSqft,
      inProgressCount,
      openTasksCount,
      openRfisCount,
    };
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.id.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.projectNumber && p.projectNumber.toLowerCase().includes(q)) ||
        p.designStandard.toLowerCase().includes(q);

      return matchStatus && matchSearch;
    });
  }, [projects, search, statusFilter]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProject(id);
    setDeleteConfirmId(null);
  };

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Completed
          </span>
        );
      case 'In progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            In Progress
          </span>
        );
      case 'On hold':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            On Hold
          </span>
        );
      case 'Quotation':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            Quotation
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ══════════════════════════════════════════════════════
          1. STATS OVERVIEW CARDS
          ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Total Projects */}
        <div className="bg-[#181E27] border border-white/10 p-5 cad-corner-box">
          <div className="flex items-center justify-between text-[#F3F4F6]/60 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Total Projects</span>
            <FolderGit2 size={16} className="text-safety-yellow" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {stats.totalCount}
          </div>
          <span className="text-[10px] text-[#F3F4F6]/50 font-mono mt-1 block">Active repository</span>
        </div>

        {/* Total Tonnage */}
        <div className="bg-[#181E27] border border-white/10 p-5 cad-corner-box">
          <div className="flex items-center justify-between text-[#F3F4F6]/60 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Total Weight</span>
            <Weight size={16} className="text-safety-yellow" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {stats.totalTons.toLocaleString()} <span className="text-sm font-normal text-safety-yellow">tons</span>
          </div>
          <span className="text-[10px] text-[#F3F4F6]/50 font-mono mt-1 block">Steel fabricated</span>
        </div>

        {/* Total Area */}
        <div className="bg-[#181E27] border border-white/10 p-5 cad-corner-box col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-[#F3F4F6]/60 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Total Area</span>
            <Layers size={16} className="text-safety-yellow" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {(stats.totalAreaSqm / 1000).toFixed(1)}k <span className="text-sm font-normal text-white/60">m²</span>
          </div>
          <span className="text-[10px] text-[#F3F4F6]/50 font-mono mt-1 block">
            {stats.totalAreaSqft.toLocaleString()} sq ft
          </span>
        </div>

        {/* In Progress */}
        <div className="bg-[#181E27] border border-white/10 p-5 cad-corner-box">
          <div className="flex items-center justify-between text-[#F3F4F6]/60 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">In Progress</span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
            {stats.inProgressCount}
          </div>
          <span className="text-[10px] text-[#F3F4F6]/50 font-mono mt-1 block">Live detailing scopes</span>
        </div>

        {/* Open Tasks / RFIs */}
        <div className="bg-[#181E27] border border-white/10 p-5 cad-corner-box">
          <div className="flex items-center justify-between text-[#F3F4F6]/60 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Pending Action</span>
            <ListTodo size={16} className="text-safety-yellow" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-baseline gap-2">
            <span>{stats.openTasksCount} <span className="text-xs font-normal text-[#F3F4F6]/60">tasks</span></span>
            <span className="text-[#F3F4F6]/30">/</span>
            <span className="text-sky-400 text-lg">{stats.openRfisCount} <span className="text-xs font-normal text-sky-300/70">RFIs</span></span>
          </div>
          <span className="text-[10px] text-[#F3F4F6]/50 font-mono mt-1 block">Requiring review</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          2. FILTER & SEARCH BAR + ACTION BUTTON
          ══════════════════════════════════════════════════════ */}
      <div className="bg-[#181E27] border border-white/10 p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-xl">
        {/* Search & Filter Group */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#F3F4F6]/40">
              <Search size={15} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, ID (JN-001), type, location, standard..."
              className="w-full bg-[#12161D] border border-white/15 pl-10 pr-4 py-2.5 text-white text-xs font-mono placeholder:text-white/30 focus:outline-none focus:border-safety-yellow transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[#F3F4F6]/50 hidden sm:inline-block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#12161D] border border-white/15 px-3.5 py-2.5 text-white text-xs font-mono focus:outline-none focus:border-safety-yellow cursor-pointer"
            >
              <option value="All">All Statuses ({projects.length})</option>
              {PROJECT_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st} ({projects.filter((p) => p.status === st).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Project Button */}
        <button
          onClick={onAddProject}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-safety-yellow text-charcoal text-xs uppercase tracking-[0.16em] font-bold btn-tactile hover:bg-steel-blue hover:text-white transition-all duration-300 cursor-pointer shadow-md shrink-0"
        >
          <Plus size={15} />
          New Project
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. PROJECT DATABASE TABLE & GRID
          ══════════════════════════════════════════════════════ */}
      <div className="bg-[#181E27] border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#12161D]/80 text-[#F3F4F6]/70 text-[10px] uppercase font-mono tracking-wider">
                <th className="py-3.5 px-4 font-bold">Project Details</th>
                <th className="py-3.5 px-4 font-bold">Type &amp; Standard</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Tonnage</th>
                <th className="py-3.5 px-4 font-bold">Area</th>
                <th className="py-3.5 px-4 font-bold">Location</th>
                <th className="py-3.5 px-4 font-bold text-center">Tasks / RFIs</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#F3F4F6]/50">
                    <p className="text-sm">No matching projects found.</p>
                    {search && (
                      <button
                        onClick={() => setSearch('')}
                        className="mt-2 text-xs text-safety-yellow hover:underline cursor-pointer"
                      >
                        Clear search filter
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  const tasksTotal = (p.tasks || []).length;
                  const tasksDone = (p.tasks || []).filter((t) => t.done).length;
                  const rfisTotal = (p.rfis || []).length;
                  const rfisOpen = (p.rfis || []).filter((r) => r.status === 'Open').length;

                  return (
                    <tr
                      key={p.id}
                      onClick={() => onSelectProject(p.id)}
                      className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    >
                      {/* Thumbnail & Title */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-11 bg-[#12161D] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <FolderGit2 size={18} className="text-[#F3F4F6]/40" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white group-hover:text-safety-yellow transition-colors font-sans">
                                {p.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-[#F3F4F6]/50 mt-0.5">
                              <span className="text-safety-yellow font-bold">{p.id}</span>
                              {p.projectNumber && <span>· {p.projectNumber}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type & Standard */}
                      <td className="py-4 px-4 text-[#F3F4F6]/80 text-[11px]">
                        <div>{p.type}</div>
                        <div className="text-[10px] text-steel-light">{p.designStandard}</div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        {getStatusBadge(p.status)}
                      </td>

                      {/* Tonnage */}
                      <td className="py-4 px-4 font-bold text-white">
                        {p.weight_tons > 0 ? (
                          <span>{p.weight_tons} <span className="text-[10px] font-normal text-safety-yellow">tons</span></span>
                        ) : (
                          <span className="text-[#F3F4F6]/40">—</span>
                        )}
                      </td>

                      {/* Area */}
                      <td className="py-4 px-4 text-[#F3F4F6]/80 text-[11px]">
                        {p.area_sqm > 0 ? (
                          <div>
                            <div>{p.area_sqm.toLocaleString()} m²</div>
                            <div className="text-[10px] text-[#F3F4F6]/50">{p.area_sqft.toLocaleString()} sq ft</div>
                          </div>
                        ) : (
                          <span className="text-[#F3F4F6]/40">—</span>
                        )}
                      </td>

                      {/* Location */}
                      <td className="py-4 px-4 text-[#F3F4F6]/80 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-[#F3F4F6]/40 shrink-0" />
                          <span className="truncate max-w-[140px]">{p.location}</span>
                        </div>
                      </td>

                      {/* Tasks / RFIs */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          {tasksTotal > 0 ? (
                            <span
                              className={`text-[10px] px-2 py-0.5 border ${
                                tasksDone === tasksTotal
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : 'bg-white/5 text-[#F3F4F6]/80 border-white/10'
                              }`}
                              title={`${tasksDone}/${tasksTotal} tasks done`}
                            >
                              ✓ {tasksDone}/{tasksTotal}
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#F3F4F6]/30">0 tasks</span>
                          )}

                          {rfisTotal > 0 ? (
                            <span
                              className={`text-[10px] px-2 py-0.5 border ${
                                rfisOpen > 0
                                  ? 'bg-sky-500/15 text-sky-300 border-sky-500/40 font-bold'
                                  : 'bg-white/5 text-[#F3F4F6]/60 border-white/10'
                              }`}
                              title={`${rfisOpen} open RFIs`}
                            >
                              RFI: {rfisTotal} {rfisOpen > 0 && `(${rfisOpen} open)`}
                            </span>
                          ) : null}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => onSelectProject(p.id)}
                            className="p-1.5 text-[#F3F4F6]/60 hover:text-safety-yellow hover:bg-white/5 transition-colors cursor-pointer"
                            title="View Project Details"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => onEditProject(p.id)}
                            className="p-1.5 text-[#F3F4F6]/60 hover:text-steel-blue-light hover:bg-white/5 transition-colors cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit size={15} />
                          </button>
                          {deleteConfirmId === p.id ? (
                            <div className="flex items-center gap-1 bg-red-500/10 p-1 border border-red-500/30 animate-fade-in">
                              <button
                                onClick={(e) => handleDelete(p.id, e)}
                                className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold hover:bg-red-700 cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-1.5 py-0.5 text-[#F3F4F6]/60 hover:text-white text-[10px] cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(p.id)}
                              className="p-1.5 text-[#F3F4F6]/40 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
