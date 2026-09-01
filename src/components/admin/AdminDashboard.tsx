import React, { useState } from 'react';
import {
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Edit3,
  Eye,
  RotateCcw,
  Download,
  Upload,
  Layout,
  Briefcase,
  Wrench,
  User,
  Mail,
  Database,
  Image as ImageIcon,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { ProjectItem } from '../../types/cms';

// Pre-existing Tekla project images in public folder for visual one-click picker
const PRESET_PROJECT_IMAGES = [
  { name: 'Metrorail Station Structure', path: '/images/Project Photos/Metrorail Station Structure with stair.png' },
  { name: 'Flyover Steel Support Member', path: '/images/Project Photos/3d Drawing View of Flyover Support member.png' },
  { name: 'Multistoried Building Frame', path: '/images/Project Photos/Multistoried Building.png' },
  { name: 'Curved Rafter Industrial Shed', path: '/images/Project Photos/Carver Rafter Shed industrial.png' },
  { name: 'Curved Walkway Platform (Tank)', path: '/images/Project Photos/Carve Walkaway Platform.png' },
  { name: 'Spiral Steel Staircase', path: '/images/Project Photos/Spiral Stair.png' },
  { name: 'General Steel Staircase', path: '/images/Project Photos/Stair.png' },
  { name: 'Commercial Shed with Rooftop', path: '/images/Project Photos/Multistoried Building with Rooftop Shed & stair.png' },
];

interface AdminDashboardProps {
  embedded?: boolean;
}

export default function AdminDashboard({ embedded = false }: AdminDashboardProps) {
  const {
    content,
    updateField,
    addProject,
    updateProject,
    deleteProject,
    resetToDefaults,
    exportJson,
    importJson,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'services' | 'about' | 'contact' | 'backup'>('hero');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [selectedPresetImage, setSelectedPresetImage] = useState<string>('');

  // New Project Form State
  const [newProject, setNewProject] = useState<Omit<ProjectItem, 'id'>>({
    title: '',
    category: 'Structural Steel',
    img: PRESET_PROJECT_IMAGES[0].path,
    desc: '',
    tonnage: '50 tons',
    software: 'Tekla Structures 2025',
    deliverables: ['3D BIM Model', 'Shop Drawings', 'GA Drawings', 'BOM Report'],
    gallery: [PRESET_PROJECT_IMAGES[0].path],
    videoUrl: '',
  });

  const triggerSaveNotification = (msg = 'Changes saved successfully to your live website!') => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    addProject({
      ...newProject,
      id: `proj-${Date.now()}`,
      gallery: newProject.gallery?.length ? newProject.gallery : [newProject.img],
    });

    setShowNewProjectModal(false);
    setNewProject({
      title: '',
      category: 'Structural Steel',
      img: PRESET_PROJECT_IMAGES[0].path,
      desc: '',
      tonnage: '50 tons',
      software: 'Tekla Structures 2025',
      deliverables: ['3D BIM Model', 'Shop Drawings', 'GA Drawings', 'BOM Report'],
      gallery: [PRESET_PROJECT_IMAGES[0].path],
      videoUrl: '',
    });
    triggerSaveNotification('New Project added to Portfolio!');
  };

  const handleUpdateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    updateProject(editingProject.id, editingProject);
    setEditingProject(null);
    triggerSaveNotification('Project details updated!');
  };

  return (
    <div className="min-h-screen bg-[#20252B] text-white flex flex-col font-sans">
      
      {/* Toast Save Notification */}
      {saveSuccessMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#22c55e] text-charcoal px-5 py-3 rounded-lg shadow-2xl font-bold text-xs flex items-center gap-2.5 animate-fade-in border-2 border-white/20">
          <CheckCircle2 size={18} className="text-charcoal" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 gap-8">
        
        {/* ─── LEFT SIDEBAR: Visual Navigation ─── */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-4">
          <div className="bg-[#282e36] border border-white/10 p-5 rounded-xl shadow-xl space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-accent tracking-widest block mb-1">
                Visual CMS Controls
              </span>
              <h2 className="text-lg font-extrabold text-white">Content Editor</h2>
              <p className="text-xs text-steel-light mt-0.5">Click any section below to edit texts, images, and services.</p>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1.5 pt-2">
              {[
                { id: 'hero', label: 'Hero & Branding', icon: Layout, desc: 'Name, Headlines, Software' },
                { id: 'projects', label: '3D Projects & Models', icon: Briefcase, desc: `${content.projects.length} Projects Listed` },
                { id: 'services', label: 'Service Packages', icon: Wrench, desc: 'Starter, Standard, Advanced' },
                { id: 'about', label: 'About & Bio', icon: User, desc: 'Story, Experience, Quote' },
                { id: 'contact', label: 'Contact & Socials', icon: Mail, desc: 'WhatsApp, Email, Links' },
                { id: 'backup', label: 'Backup & Restore', icon: Database, desc: '1-Click Export & Reset' },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3.5 cursor-pointer ${
                      isActive
                        ? 'bg-accent text-charcoal font-bold shadow-lg shadow-accent/20'
                        : 'text-steel-lighter hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-md ${isActive ? 'bg-charcoal text-accent' : 'bg-white/5 text-steel-lighter'}`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold leading-tight">{tab.label}</p>
                      <p className={`text-[10px] truncate ${isActive ? 'text-charcoal/80' : 'text-steel'}`}>{tab.desc}</p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Helper Box */}
          <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-accent font-bold text-[11px] uppercase tracking-wider font-mono">
              <HelpCircle size={14} /> Non-Developer Tip
            </div>
            <p className="text-steel-light leading-relaxed text-[11px]">
              Changes update your website immediately in real-time. No coding or terminal commands needed!
            </p>
          </div>
        </aside>

        {/* ─── RIGHT MAIN PANEL: Friendly Form Editor ─── */}
        <main className="flex-1 min-w-0 bg-[#181926] border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl space-y-8">
          
          {/* ══════════════════════════════════════════════
              TAB 1: HERO & BRANDING
             ══════════════════════════════════════════════ */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">Hero Section & Main Branding</h3>
                  <p className="text-xs text-steel-light">Customize your main headlines, role title, and featured Tekla model image.</p>
                </div>
                <button
                  onClick={() => triggerSaveNotification()}
                  className="px-5 py-2.5 bg-accent text-charcoal text-xs uppercase font-bold tracking-wider rounded-md hover:bg-white transition-all flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
                >
                  <Save size={15} /> Save Hero Changes
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-steel-lighter mb-1.5 font-mono">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={content.profileName}
                    onChange={(e) => updateField('profileName', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md focus:border-accent text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-steel-lighter mb-1.5 font-mono">
                    Professional Role Title
                  </label>
                  <input
                    type="text"
                    value={content.profileRole}
                    onChange={(e) => updateField('profileRole', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md focus:border-accent text-white text-sm outline-none"
                  />
                </div>
              </div>

              {/* 3-Line Headline Editor */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-4">
                <span className="text-[11px] uppercase font-mono font-bold text-accent tracking-wider block">
                  3-Line Main Hero Headline
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-steel-lighter mb-1">Line 1 (e.g. Steel Structures,)</label>
                    <input
                      type="text"
                      value={content.hero.headlineLine1}
                      onChange={(e) => updateField('hero.headlineLine1', e.target.value)}
                      className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-steel-lighter mb-1">Line 2 (e.g. Detailed for)</label>
                    <input
                      type="text"
                      value={content.hero.headlineLine2}
                      onChange={(e) => updateField('hero.headlineLine2', e.target.value)}
                      className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-steel-lighter mb-1">Line 3 (e.g. Fabrication)</label>
                    <input
                      type="text"
                      value={content.hero.headlineLine3}
                      onChange={(e) => updateField('hero.headlineLine3', e.target.value)}
                      className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-steel-lighter mb-1">Hero Subtitle Paragraph</label>
                  <textarea
                    rows={3}
                    value={content.hero.subtitle}
                    onChange={(e) => updateField('hero.subtitle', e.target.value)}
                    className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none resize-none"
                  />
                </div>
              </div>

              {/* Primary Hero Image Picker */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase font-mono font-bold text-accent tracking-wider block">
                      Primary Hero 3D Model Image
                    </span>
                    <p className="text-xs text-steel-light">Select which drawing structure model appears first on your homepage:</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PRESET_PROJECT_IMAGES.map((preset, idx) => {
                    const isSelected = content.hero.heroImage === preset.path;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          updateField('hero.heroImage', preset.path);
                          triggerSaveNotification(`Hero image set to: ${preset.name}`);
                        }}
                        className={`p-2 border-2 rounded-lg text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-accent bg-accent/10 shadow-lg scale-102 ring-2 ring-accent/30'
                            : 'border-white/10 bg-charcoal hover:border-white/30 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="aspect-[4/3] bg-black/40 rounded overflow-hidden mb-2">
                          <img src={preset.path} alt={preset.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <p className="text-[10px] font-bold text-white truncate">{preset.name}</p>
                        <span className={`text-[9px] font-mono ${isSelected ? 'text-accent font-bold' : 'text-steel'}`}>
                          {isSelected ? '✓ Active Hero' : 'Click to select'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════════════════════════════════
              TAB 2: 3D PROJECTS & MODELS
             ══════════════════════════════════════════════ */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">3D Tekla Projects & Portfolio</h3>
                  <p className="text-xs text-steel-light">Manage, edit, or add new steel structure drawings and models.</p>
                </div>
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="px-5 py-2.5 bg-accent text-charcoal text-xs uppercase font-bold tracking-wider rounded-md hover:bg-white transition-all flex items-center gap-2 shadow-lg cursor-pointer self-start sm:self-auto"
                >
                  <Plus size={16} /> Add New Project
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.projects.map((proj, idx) => (
                  <div
                    key={proj.id || idx}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-accent/60 transition-all flex gap-4 items-start group"
                  >
                    <div className="w-24 h-20 bg-charcoal rounded overflow-hidden border border-white/10 flex-shrink-0">
                      <img src={proj.img} alt={proj.title} className="w-full h-full object-contain p-1" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded">
                          {proj.category}
                        </span>
                        <span className="text-[10px] text-steel font-mono">{proj.tonnage}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white truncate">{proj.title}</h4>
                      <p className="text-xs text-steel-light line-clamp-2 mt-1">{proj.desc}</p>

                      {/* Edit & Delete Controls */}
                      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/10">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="text-xs text-accent hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 size={12} /> Edit Details
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                              deleteProject(proj.id);
                              triggerSaveNotification('Project deleted!');
                            }
                          }}
                          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Project Modal */}
              {editingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                  <div className="bg-[#20252B] border-2 border-accent rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <Edit3 size={18} className="text-accent" /> Edit Project: {editingProject.title}
                      </h4>
                      <button onClick={() => setEditingProject(null)} className="text-steel hover:text-white">✕</button>
                    </div>

                    <form onSubmit={handleUpdateProjectSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs text-steel-lighter font-mono mb-1">Project Title</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-steel-lighter font-mono mb-1">Category</label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                            className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none"
                          >
                            <option value="Industrial Platform">Industrial Platform</option>
                            <option value="PEB">PEB</option>
                            <option value="Structural Steel">Structural Steel</option>
                            <option value="Access Structures">Access Structures</option>
                            <option value="Connection Design">Connection Design</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-steel-lighter font-mono mb-1">Tonnage Scope</label>
                          <input
                            type="text"
                            value={editingProject.tonnage || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, tonnage: e.target.value })}
                            placeholder="e.g. 150 tons"
                            className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-steel-lighter font-mono mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingProject.desc}
                          onChange={(e) => setEditingProject({ ...editingProject, desc: e.target.value })}
                          className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none resize-none"
                        />
                      </div>

                      {/* Visual Drawing Selector for this project */}
                      <div>
                        <label className="block text-xs text-steel-lighter font-mono mb-2">Change Image Model</label>
                        <div className="grid grid-cols-4 gap-2">
                          {PRESET_PROJECT_IMAGES.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setEditingProject({ ...editingProject, img: preset.path })}
                              className={`p-1 border rounded ${
                                editingProject.img === preset.path ? 'border-accent bg-accent/20' : 'border-white/10 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img src={preset.path} alt={preset.name} className="w-full h-12 object-contain" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-accent text-charcoal font-bold text-xs uppercase rounded hover:bg-white"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Add Project Modal */}
              {showNewProjectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                  <div className="bg-[#20252B] border-2 border-accent rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <Plus size={18} className="text-accent" /> Add New Steel Project
                      </h4>
                      <button onClick={() => setShowNewProjectModal(false)} className="text-steel hover:text-white">✕</button>
                    </div>

                    <form onSubmit={handleCreateProject} className="space-y-4">
                      <div>
                        <label className="block text-xs text-steel-lighter font-mono mb-1">Project Name *</label>
                        <input
                          type="text"
                          required
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          placeholder="e.g. Metro Rail Staircase & Walkway"
                          className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-steel-lighter font-mono mb-1">Structure Category</label>
                          <select
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none"
                          >
                            <option value="Industrial Platform">Industrial Platform</option>
                            <option value="PEB">PEB</option>
                            <option value="Structural Steel">Structural Steel</option>
                            <option value="Access Structures">Access Structures</option>
                            <option value="Connection Design">Connection Design</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-steel-lighter font-mono mb-1">Tonnage Scope</label>
                          <input
                            type="text"
                            value={newProject.tonnage || ''}
                            onChange={(e) => setNewProject({ ...newProject, tonnage: e.target.value })}
                            placeholder="e.g. 75 tons"
                            className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-steel-lighter font-mono mb-1">Description & Scope</label>
                        <textarea
                          rows={3}
                          required
                          value={newProject.desc}
                          onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })}
                          placeholder="Describe the 3D model, Tekla version, and shop drawing outputs..."
                          className="w-full px-3 py-2 bg-charcoal border border-white/15 rounded text-sm text-white focus:border-accent outline-none resize-none"
                        />
                      </div>

                      {/* Visual Image Chooser */}
                      <div>
                        <label className="block text-xs text-steel-lighter font-mono mb-2">Select Drawing Image</label>
                        <div className="grid grid-cols-4 gap-2">
                          {PRESET_PROJECT_IMAGES.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setNewProject({ ...newProject, img: preset.path, gallery: [preset.path] })}
                              className={`p-1 border rounded ${
                                newProject.img === preset.path ? 'border-accent bg-accent/20 ring-2 ring-accent/30' : 'border-white/10 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img src={preset.path} alt={preset.name} className="w-full h-12 object-contain" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setShowNewProjectModal(false)}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-accent text-charcoal font-bold text-xs uppercase rounded hover:bg-white"
                        >
                          Add Project
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ══════════════════════════════════════════════
              TAB 3: SERVICE PACKAGES
             ══════════════════════════════════════════════ */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">Upwork & Catalog Service Offerings</h3>
                  <p className="text-xs text-steel-light">Review the 6 specialized detailing services shown on your website.</p>
                </div>
                <button
                  onClick={() => triggerSaveNotification()}
                  className="px-5 py-2.5 bg-accent text-charcoal text-xs uppercase font-bold tracking-wider rounded-md hover:bg-white transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save size={15} /> Save Services
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.services.map((svc, idx) => (
                  <div key={svc.id || idx} className="p-5 bg-white/5 border border-white/10 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-accent uppercase font-bold">Service #{idx + 1}</span>
                      <span className="text-xs text-steel">{svc.iconName}</span>
                    </div>
                    <div>
                      <label className="block text-[10px] text-steel-lighter uppercase font-mono mb-1">Service Title</label>
                      <input
                        type="text"
                        value={svc.title}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].title = e.target.value;
                          updateField('services', updated);
                        }}
                        className="w-full px-3 py-1.5 bg-charcoal border border-white/15 rounded text-xs text-white focus:border-accent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-steel-lighter uppercase font-mono mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={svc.desc}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].desc = e.target.value;
                          updateField('services', updated);
                        }}
                        className="w-full px-3 py-1.5 bg-charcoal border border-white/15 rounded text-xs text-white focus:border-accent outline-none resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════
              TAB 4: ABOUT & BIO
             ══════════════════════════════════════════════ */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">About Section & Personal Bio</h3>
                  <p className="text-xs text-steel-light">Update your professional story, quote, and tagline.</p>
                </div>
                <button
                  onClick={() => triggerSaveNotification()}
                  className="px-5 py-2.5 bg-accent text-charcoal text-xs uppercase font-bold tracking-wider rounded-md hover:bg-white transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save size={15} /> Save About Changes
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-steel-lighter mb-1.5 font-mono">
                    Page Subtitle / Headline
                  </label>
                  <input
                    type="text"
                    value={content.about.subtitle || ''}
                    onChange={(e) => updateField('about.subtitle', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md focus:border-accent text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-steel-lighter mb-1.5 font-mono">
                    Featured Personal Quote
                  </label>
                  <textarea
                    rows={2}
                    value={content.about.quoteText || ''}
                    onChange={(e) => updateField('about.quoteText', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md focus:border-accent text-white text-sm outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-steel-lighter mb-1.5 font-mono">
                    Main Bio Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={content.about.bioParagraphs?.[0] || ''}
                    onChange={(e) => {
                      const paras = content.about.bioParagraphs ? [...content.about.bioParagraphs] : [''];
                      paras[0] = e.target.value;
                      updateField('about.bioParagraphs', paras);
                    }}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md focus:border-accent text-white text-sm outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════
              TAB 5: CONTACT & SOCIALS
             ══════════════════════════════════════════════ */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">Contact & WhatsApp Settings</h3>
                  <p className="text-xs text-steel-light">Configure your direct communication channels.</p>
                </div>
                <button
                  onClick={() => triggerSaveNotification()}
                  className="px-5 py-2.5 bg-accent text-charcoal text-xs uppercase font-bold tracking-wider rounded-md hover:bg-white transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save size={15} /> Save Contact Details
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-steel-lighter mb-1.5 font-mono">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    value="hello@julkarnaeem.com"
                    readOnly
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white text-sm opacity-80"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-steel-lighter mb-1.5 font-mono">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="text"
                    value="8801739411586"
                    readOnly
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-md text-white text-sm opacity-80"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════
              TAB 6: 1-CLICK BACKUP & RESTORE
             ══════════════════════════════════════════════ */}
          {activeTab === 'backup' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white">One-Click Backup & Recovery</h3>
                <p className="text-xs text-steel-light">Safely export all your website content or restore original factory defaults.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Download Backup */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
                    <Download size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Download Portfolio Backup</h4>
                    <p className="text-xs text-steel-light mt-1">
                      Saves all your customized projects, hero texts, and settings as a secure backup file.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const dataStr = exportJson();
                      const blob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `julkarnaeem_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      triggerSaveNotification('Backup downloaded to your computer!');
                    }}
                    className="w-full py-3 bg-accent text-charcoal font-bold text-xs uppercase tracking-wider rounded-md hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={16} /> Download Backup (.json)
                  </button>
                </div>

                {/* Reset to Factory Defaults */}
                <div className="p-6 bg-white/5 border border-red-500/20 rounded-xl space-y-4">
                  <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center">
                    <RotateCcw size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Reset to Defaults</h4>
                    <p className="text-xs text-steel-light mt-1">
                      Reverts all content and projects back to the original default setup.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all portfolio content to factory defaults?')) {
                        resetToDefaults();
                        triggerSaveNotification('Reset to defaults complete!');
                      }
                    }}
                    className="w-full py-3 bg-red-500/20 text-red-300 border border-red-500/40 font-bold text-xs uppercase tracking-wider rounded-md hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw size={16} /> Reset All Content
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
