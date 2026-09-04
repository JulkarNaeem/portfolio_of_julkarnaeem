import { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  FolderGit2,
  Weight,
  Layers,
  Clock,
  ListTodo,
  Eye,
  Edit,
  Trash2,
  MapPin,
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

  // Clean minimal status indicator (colored dot + text)
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

  return (
    <div className="space-y-6 animate-fade-in text-charcoal">
      {/* ══════════════════════════════════════════════════════
          1. STATS OVERVIEW CARDS (CLEAN ROUNDED CARDS)
          ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Projects */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Total Projects</span>
            <FolderGit2 size={16} className="text-steel-blue" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-charcoal font-mono">
            {stats.totalCount}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Active repository</span>
        </div>

        {/* Total Tonnage */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Total Weight</span>
            <Weight size={16} className="text-steel-blue" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-charcoal font-mono">
            {stats.totalTons.toLocaleString()} <span className="text-sm font-normal text-steel-blue font-semibold">tons</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Fabricated steel</span>
        </div>

        {/* Total Area */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-shadow col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Total Area</span>
            <Layers size={16} className="text-steel-blue" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-charcoal font-mono">
            {(stats.totalAreaSqm / 1000).toFixed(1)}k <span className="text-sm font-normal text-slate-500">m²</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            {stats.totalAreaSqft.toLocaleString()} sq ft
          </span>
        </div>

        {/* In Progress */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">In Progress</span>
            <Clock size={16} className="text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
            {stats.inProgressCount}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Live detailing scopes</span>
        </div>

        {/* Open Tasks / RFIs */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-medium">Pending Action</span>
            <ListTodo size={16} className="text-steel-blue" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-charcoal font-mono flex items-baseline gap-2">
            <span>{stats.openTasksCount} <span className="text-xs font-normal text-slate-500">tasks</span></span>
            <span className="text-slate-300">/</span>
            <span className="text-sky-600 text-lg">{stats.openRfisCount} <span className="text-xs font-normal text-sky-600/80">RFIs</span></span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Requiring review</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          2. FILTER & SEARCH BAR + ACTION BUTTON
          ══════════════════════════════════════════════════════ */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-xs">
        {/* Search & Filter Group */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search size={15} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, ID (JN-001), type, location, standard..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-charcoal text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue focus:bg-white transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400 hidden sm:inline-block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-charcoal text-xs font-mono focus:outline-none focus:border-steel-blue cursor-pointer"
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
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-safety-yellow text-charcoal text-xs uppercase tracking-[0.16em] font-bold rounded-lg btn-tactile hover:bg-steel-blue hover:text-white transition-all duration-200 cursor-pointer shadow-xs shrink-0"
        >
          <Plus size={15} />
          New Project
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. PROJECT DATABASE TABLE & GRID
          ══════════════════════════════════════════════════════ */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-600 text-[10px] uppercase font-mono tracking-wider">
                <th className="py-3 px-4 font-semibold">Project Details</th>
                <th className="py-3 px-4 font-semibold">Type &amp; Standard</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Tonnage</th>
                <th className="py-3 px-4 font-semibold">Area</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold text-center">Tasks / RFIs</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-xs">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <p className="text-sm font-sans">No matching projects found.</p>
                    {search && (
                      <button
                        onClick={() => setSearch('')}
                        className="mt-2 text-xs text-steel-blue hover:underline cursor-pointer font-semibold"
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
                      className="hover:bg-slate-50/75 transition-colors cursor-pointer group"
                    >
                      {/* Thumbnail & Title */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-10 bg-slate-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-slate-200">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <FolderGit2 size={16} className="text-slate-400" />
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-charcoal group-hover:text-steel-blue transition-colors font-sans block">
                              {p.title}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                              <span className="text-steel-blue font-semibold">{p.id}</span>
                              {p.projectNumber && <span>· {p.projectNumber}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type & Standard */}
                      <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                        <div className="font-medium text-charcoal">{p.type}</div>
                        <div className="text-[10px] text-slate-400">{p.designStandard}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusIndicator(p.status)}
                      </td>

                      {/* Tonnage */}
                      <td className="py-3.5 px-4 font-semibold text-charcoal">
                        {p.weight_tons > 0 ? (
                          <span>{p.weight_tons} <span className="text-[10px] font-normal text-slate-500">t</span></span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      {/* Area */}
                      <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                        {p.area_sqm > 0 ? (
                          <div>
                            <div className="font-medium text-charcoal">{p.area_sqm.toLocaleString()} m²</div>
                            <div className="text-[10px] text-slate-400">{p.area_sqft.toLocaleString()} sq ft</div>
                          </div>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-slate-400 shrink-0" />
                          <span className="truncate max-w-[130px]">{p.location}</span>
                        </div>
                      </td>

                      {/* Tasks / RFIs */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {tasksTotal > 0 ? (
                            <span className="text-[11px] text-slate-600 font-mono">
                              ✓ {tasksDone}/{tasksTotal}
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-300">0 tasks</span>
                          )}

                          {rfisTotal > 0 ? (
                            <span className={`text-[11px] font-mono ${rfisOpen > 0 ? 'text-sky-600 font-semibold' : 'text-slate-500'}`}>
                              RFI: {rfisTotal}
                            </span>
                          ) : null}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => onSelectProject(p.id)}
                            className="p-1.5 text-slate-400 hover:text-steel-blue hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                            title="View Project Details"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => onEditProject(p.id)}
                            className="p-1.5 text-slate-400 hover:text-steel-blue hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit size={15} />
                          </button>
                          {deleteConfirmId === p.id ? (
                            <div className="flex items-center gap-1 bg-red-50 p-1 rounded-md border border-red-200 animate-fade-in">
                              <button
                                onClick={(e) => handleDelete(p.id, e)}
                                className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded hover:bg-red-700 cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-1.5 py-0.5 text-slate-500 hover:text-charcoal text-[10px] cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(p.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
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
