import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Download,
  Upload,
  RotateCcw,
  Layout,
  Briefcase,
  Wrench,
  User,
  Mail,
  Database,
  Image as ImageIcon,
  Video,
  Film,
  Compass,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { ProjectItem } from '../../types/cms';

interface AdminDashboardProps {
  embedded?: boolean;
}

export default function AdminDashboard({ embedded = false }: AdminDashboardProps) {
  const {
    content,
    isAdminOpen,
    setIsAdminOpen,
    updateField,
    addProject,
    updateProject,
    deleteProject,
    addService,
    deleteService,
    resetToDefaults,
    exportJson,
    importJson,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'navbar' | 'hero' | 'projects' | 'services' | 'about' | 'contact' | 'data'>('navbar');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [newServiceModal, setNewServiceModal] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [passcodeMsg, setPasscodeMsg] = useState<string | null>(null);

  // Fallback for NavSettings
  const navSettings = content.navSettings || {
    brandInitials: content.profileName?.split(' ').map((n) => n[0]).join('') || 'JN',
    brandName: content.profileName || 'Julkar Naeem',
    brandRole: content.profileRole || 'Steel Detailer',
    ctaLabel: 'Inquire Now',
    ctaPage: 'contact',
    navLinks: [
      { label: 'Home', page: 'home', visible: true },
      { label: 'Projects', page: 'projects', visible: true },
      { label: 'Services', page: 'services', visible: true },
      { label: 'About', page: 'about', visible: true },
      { label: 'Contact', page: 'contact', visible: true },
    ],
  };

  // New Project Form State
  const [newProjData, setNewProjData] = useState<Omit<ProjectItem, 'id'>>({
    title: '',
    category: 'Industrial Platform',
    img: '/images/project-1.jpg',
    desc: '',
    tonnage: '50 tons',
    gallery: [],
    videoUrl: '',
  });

  // New Service Form State
  const [newSvcData, setNewSvcData] = useState({
    title: '',
    iconName: 'Wrench',
    desc: '',
    includes: ['Custom detailing item 1', 'Custom detailing item 2'],
  });

  if (!embedded && !isAdminOpen) return null;

  // Total Media Count Calculation
  const totalGalleryPhotos = content.projects.reduce((acc, p) => acc + (p.gallery?.length || 0), 0);
  const totalVideos = content.projects.filter((p) => p.videoUrl).length;

  // File Upload Helper to convert local files to DataURL
  const handleFileUpload = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        callback(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjData.title) return;
    addProject(newProjData);
    setNewProjData({
      title: '',
      category: 'Industrial Platform',
      img: '/images/project-1.jpg',
      desc: '',
      tonnage: '50 tons',
      gallery: [],
      videoUrl: '',
    });
    setNewProjectModal(false);
  };

  const handleSaveEditProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.id) return;
    updateProject(editingProject.id, editingProject);
    setEditingProject(null);
  };

  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSvcData.title) return;
    addService(newSvcData);
    setNewSvcData({
      title: '',
      iconName: 'Wrench',
      desc: '',
      includes: ['Custom detailing item 1', 'Custom detailing item 2'],
    });
    setNewServiceModal(false);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = importJson(jsonInput);
    if (success) {
      setImportStatus('Content successfully imported!');
      setJsonInput('');
    } else {
      setImportStatus('Error importing JSON. Please check file format.');
    }
  };

  const dashboardContent = (
    <div
      className={`w-full bg-[#11111c] text-white flex flex-col overflow-hidden ${
        embedded
          ? 'max-w-6xl mx-auto py-6 px-4 border border-white/10 shadow-2xl my-6 rounded-none'
          : 'relative w-full max-w-4xl h-full border-l border-white/10 shadow-2xl'
      }`}
    >
      {/* Top Header Drawer Bar if not embedded */}
      {!embedded && (
        <div className="px-6 py-5 bg-[#181828] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent flex items-center justify-center shadow-lg">
              <Sparkles size={18} className="text-charcoal" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">Management Dashboard</h2>
              <p className="text-xs text-steel-lighter">Modify portfolio content, navbar, photos, and settings</p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            aria-label="Close admin dashboard"
            className="w-8 h-8 bg-white/10 text-white hover:bg-accent hover:text-charcoal flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* METRIC OVERVIEW STATS BAR */}
      <div className="p-6 bg-[#161625] border-b border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white/5 border border-white/10 hover:border-accent/30 transition-colors">
          <div className="flex items-center justify-between text-steel-lighter mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Projects</span>
            <Briefcase size={16} className="text-accent" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">{content.projects.length}</p>
          <span className="text-[10px] text-steel-lighter">Portfolio Showcase</span>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 hover:border-accent/30 transition-colors">
          <div className="flex items-center justify-between text-steel-lighter mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Services</span>
            <Wrench size={16} className="text-accent" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">{content.services.length}</p>
          <span className="text-[10px] text-steel-lighter">Active Detailing Scope</span>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 hover:border-accent/30 transition-colors">
          <div className="flex items-center justify-between text-steel-lighter mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Media Assets</span>
            <ImageIcon size={16} className="text-accent" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">{totalGalleryPhotos + totalVideos}</p>
          <span className="text-[10px] text-steel-lighter">{totalGalleryPhotos} Photos • {totalVideos} Videos</span>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 hover:border-accent/30 transition-colors">
          <div className="flex items-center justify-between text-steel-lighter mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Security</span>
            <ShieldCheck size={16} className="text-accent" />
          </div>
          <p className="text-sm font-bold text-accent tracking-wide uppercase mt-1">Passcode Active</p>
          <span className="text-[10px] text-steel-lighter">Protected Portal</span>
        </div>
      </div>

      {/* MAIN SIDEBAR & CONTENT CONTAINER */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* VERTICAL SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 flex-shrink-0 bg-[#161625] border-r border-white/10 p-4 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-2">
            Dashboard Menu
          </div>
          {[
            { id: 'navbar', label: 'Navbar & Header', icon: Compass },
            { id: 'hero', label: 'Hero & Profile', icon: Layout },
            { id: 'projects', label: 'Projects & Media', icon: Briefcase },
            { id: 'services', label: 'Services', icon: Wrench },
            { id: 'about', label: 'About & Bio', icon: User },
            { id: 'contact', label: 'Contact Details', icon: Mail },
            { id: 'data', label: 'Backup & Reset', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-semibold border-l-4 transition-all text-left ${
                  isActive
                    ? 'border-accent text-accent bg-[#11111c] shadow-md font-bold'
                    : 'border-transparent text-steel-lighter hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-accent' : 'text-steel-lighter'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* BODY CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#11111c]">

        {/* TAB 0: NAVBAR & HEADER SETTINGS */}
        {activeTab === 'navbar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent flex items-center gap-2">
                <Compass size={16} /> Navbar & Header Customization
              </h3>
            </div>

            {/* BRAND LOGO CARD */}
            <div className="p-5 bg-[#181828] border border-white/10 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-white border-b border-white/10 pb-2">
                1. Brand Logo & Title Settings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">
                    Logo Monogram Initials
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={navSettings.brandInitials}
                    onChange={(e) =>
                      updateField('navSettings', { ...navSettings, brandInitials: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white font-mono text-sm focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">
                    Brand Name / Title
                  </label>
                  <input
                    type="text"
                    value={navSettings.brandName}
                    onChange={(e) =>
                      updateField('navSettings', { ...navSettings, brandName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">
                    Role Tagline Subtitle
                  </label>
                  <input
                    type="text"
                    value={navSettings.brandRole}
                    onChange={(e) =>
                      updateField('navSettings', { ...navSettings, brandRole: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* NAVBAR CTA BUTTON CARD */}
            <div className="p-5 bg-[#181828] border border-white/10 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-white border-b border-white/10 pb-2">
                2. Top Action Button (CTA)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={navSettings.ctaLabel}
                    onChange={(e) =>
                      updateField('navSettings', { ...navSettings, ctaLabel: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">
                    Target Navigation Page
                  </label>
                  <select
                    value={navSettings.ctaPage}
                    onChange={(e) =>
                      updateField('navSettings', { ...navSettings, ctaPage: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  >
                    <option value="contact">Contact Page</option>
                    <option value="projects">Projects Page</option>
                    <option value="services">Services Page</option>
                    <option value="about">About Page</option>
                  </select>
                </div>
              </div>
            </div>

            {/* NAVIGATION LINKS VISIBILITY CARD */}
            <div className="p-5 bg-[#181828] border border-white/10 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-white border-b border-white/10 pb-2">
                3. Menu Items Visibility
              </h4>
              <div className="space-y-3">
                {navSettings.navLinks.map((link, idx) => (
                  <div
                    key={link.page}
                    className="p-3 bg-black/30 border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => {
                          const updated = [...navSettings.navLinks];
                          updated[idx].label = e.target.value;
                          updateField('navSettings', { ...navSettings, navLinks: updated });
                        }}
                        className="px-3 py-1.5 bg-black/50 border border-white/20 text-white text-xs font-medium focus:border-accent"
                      />
                      <span className="text-xs text-steel-lighter font-mono">#{link.page}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...navSettings.navLinks];
                        updated[idx].visible = !updated[idx].visible;
                        updateField('navSettings', { ...navSettings, navLinks: updated });
                      }}
                      className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-all ${
                        link.visible
                          ? 'bg-accent/20 text-accent border-accent/40'
                          : 'bg-white/5 text-steel-lighter border-white/10'
                      }`}
                    >
                      {link.visible ? 'Visible' : 'Hidden'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: HERO & PROFILE */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Profile & Top Banner</h3>

            <div className="p-5 bg-[#181828] border border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Full Name</label>
                  <input
                    type="text"
                    value={content.profileName}
                    onChange={(e) => updateField('profileName', e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Primary Role</label>
                  <input
                    type="text"
                    value={content.profileRole}
                    onChange={(e) => updateField('profileRole', e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Hero Subtitle Badge</label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) => updateField('hero.badge', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Headline Line 1</label>
                  <input
                    type="text"
                    value={content.hero.headlineLine1}
                    onChange={(e) => updateField('hero.headlineLine1', e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Headline Line 2</label>
                  <input
                    type="text"
                    value={content.hero.headlineLine2}
                    onChange={(e) => updateField('hero.headlineLine2', e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Headline Line 3</label>
                  <input
                    type="text"
                    value={content.hero.headlineLine3}
                    onChange={(e) => updateField('hero.headlineLine3', e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Hero Description Paragraph</label>
                <textarea
                  rows={3}
                  value={content.hero.subtitle}
                  onChange={(e) => updateField('hero.subtitle', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Projects Delivered Highlight</label>
                <input
                  type="text"
                  value={content.hero.projectsCountText}
                  onChange={(e) => updateField('hero.projectsCountText', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS & MEDIA MANAGER */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Projects Portfolio ({content.projects.length})</h3>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setNewProjectModal(true);
                }}
                className="px-4 py-2 bg-accent text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-all shadow-md"
              >
                <Plus size={14} /> Add New Project
              </button>
            </div>

            {/* Add Project Form */}
            {newProjectModal && !editingProject && (
              <form onSubmit={handleAddProjectSubmit} className="p-5 bg-[#181828] border border-accent space-y-4 shadow-xl animate-fadeIn">
                <h4 className="text-xs uppercase tracking-wider text-accent font-semibold">New Project Form</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Project Title *"
                    required
                    value={newProjData.title}
                    onChange={(e) => setNewProjData({ ...newProjData, title: e.target.value })}
                    className="px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                  />
                  <select
                    value={newProjData.category}
                    onChange={(e) => setNewProjData({ ...newProjData, category: e.target.value })}
                    className="px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                  >
                    <option value="Industrial Platform">Industrial Platform</option>
                    <option value="PEB">PEB</option>
                    <option value="Structural Steel">Structural Steel</option>
                    <option value="Access Structures">Access Structures</option>
                    <option value="Connection Design">Connection Design</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={newProjData.img}
                      onChange={(e) => setNewProjData({ ...newProjData, img: e.target.value })}
                      className="flex-1 px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                    />
                    <label className="px-3 py-2 bg-white/10 hover:bg-accent hover:text-charcoal text-xs font-semibold cursor-pointer flex items-center">
                      <ImageIcon size={14} />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, (dataUrl) => setNewProjData({ ...newProjData, img: dataUrl }));
                        }}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Structural Tonnage (e.g. 45 tons)"
                    value={newProjData.tonnage}
                    onChange={(e) => setNewProjData({ ...newProjData, tonnage: e.target.value })}
                    className="px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                  />
                </div>
                <textarea
                  placeholder="Project Description..."
                  rows={2}
                  value={newProjData.desc}
                  onChange={(e) => setNewProjData({ ...newProjData, desc: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewProjectModal(false)}
                    className="px-3 py-1.5 bg-white/10 text-white text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-accent text-charcoal text-xs font-semibold"
                  >
                    Save New Project
                  </button>
                </div>
              </form>
            )}

            {/* Projects List with Dropdown Edit Drawer */}
            <div className="space-y-4">
              {content.projects.map((project) => {
                const isEditing = editingProject?.id === project.id;
                return (
                  <div
                    key={project.id}
                    className={`bg-[#181828] border transition-all duration-300 overflow-hidden ${
                      isEditing ? 'border-accent ring-2 ring-accent/30 shadow-2xl' : 'border-white/10 hover:border-accent/40'
                    }`}
                  >
                    {/* Project Header Bar */}
                    <div className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={project.img} alt={project.title} className="w-16 h-12 object-cover bg-black/40 border border-white/10" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">{project.category}</span>
                            {project.gallery && project.gallery.length > 0 && (
                              <span className="text-[9px] bg-white/10 px-1.5 py-0.5 text-steel-lighter font-mono flex items-center gap-1">
                                <ImageIcon size={10} /> {project.gallery.length} photos
                              </span>
                            )}
                            {project.videoUrl && (
                              <span className="text-[9px] bg-accent/20 text-accent px-1.5 py-0.5 font-mono flex items-center gap-1">
                                <Video size={10} /> Video
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-white">{project.title}</h4>
                          <p className="text-xs text-steel-lighter line-clamp-1">{project.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setNewProjectModal(false);
                            if (isEditing) {
                              setEditingProject(null);
                            } else {
                              setEditingProject({ ...project });
                            }
                          }}
                          className={`px-3 py-1.5 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                            isEditing
                              ? 'bg-white text-charcoal'
                              : 'bg-accent text-charcoal hover:bg-white'
                          }`}
                        >
                          <Edit2 size={12} /> {isEditing ? 'Close' : 'Edit Project'}
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          aria-label="Delete project"
                          className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* INLINE DROPDOWN EDIT FORM UNDERNEATH THIS PROJECT */}
                    {isEditing && (
                      <form onSubmit={handleSaveEditProject} className="p-5 bg-[#11111c] border-t-2 border-accent space-y-4 animate-fadeIn">
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <h4 className="text-xs uppercase tracking-wider text-accent font-bold">
                            Editing Details for: {project.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => setEditingProject(null)}
                            className="text-white hover:text-accent"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-steel-lighter mb-1">Project Title</label>
                            <input
                              type="text"
                              required
                              value={editingProject.title}
                              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                              className="w-full px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-steel-lighter mb-1">Category</label>
                            <select
                              value={editingProject.category}
                              onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                              className="w-full px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                            >
                              <option value="Industrial Platform">Industrial Platform</option>
                              <option value="PEB">PEB</option>
                              <option value="Structural Steel">Structural Steel</option>
                              <option value="Access Structures">Access Structures</option>
                              <option value="Connection Design">Connection Design</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-steel-lighter mb-1">Structural Tonnage</label>
                            <input
                              type="text"
                              value={editingProject.tonnage || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, tonnage: e.target.value })}
                              className="w-full px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-steel-lighter mb-1">Cover Photo (URL or Upload)</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editingProject.img}
                                onChange={(e) => setEditingProject({ ...editingProject, img: e.target.value })}
                                className="flex-1 px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                                placeholder="/images/project-1.jpg"
                              />
                              <label className="px-3 py-2 bg-white/10 hover:bg-accent hover:text-charcoal text-xs font-semibold uppercase tracking-wider cursor-pointer flex items-center gap-1">
                                <ImageIcon size={14} /> Upload
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileUpload(file, (dataUrl) => setEditingProject({ ...editingProject, img: dataUrl }));
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-steel-lighter mb-1">Project Description</label>
                          <textarea
                            rows={3}
                            value={editingProject.desc}
                            onChange={(e) => setEditingProject({ ...editingProject, desc: e.target.value })}
                            className="w-full px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                          />
                        </div>

                        {/* GALLERY PHOTOS MANAGER */}
                        <div className="p-3 bg-black/40 border border-white/10 space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] uppercase tracking-wider font-semibold text-accent flex items-center gap-1.5">
                              <ImageIcon size={14} /> Project Photo Gallery ({editingProject.gallery?.length || 0})
                            </label>
                            <label className="px-2.5 py-1 bg-accent text-charcoal text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-white flex items-center gap-1">
                              <Plus size={12} /> Add Photos
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || []);
                                  files.forEach((file) => {
                                    handleFileUpload(file, (dataUrl) => {
                                      setEditingProject((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              gallery: [...(prev.gallery || []), dataUrl],
                                            }
                                          : null
                                      );
                                    });
                                  });
                                }}
                              />
                            </label>
                          </div>

                          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {editingProject.gallery?.map((imgUrl, i) => (
                              <div key={i} className="relative group aspect-square bg-white/5 border border-white/20 overflow-hidden">
                                <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingProject({
                                      ...editingProject,
                                      gallery: editingProject.gallery?.filter((_, idx) => idx !== i),
                                    });
                                  }}
                                  className="absolute top-1 right-1 bg-red-600 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 size={10} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* VIDEO UPLOADER / EMBED */}
                        <div className="p-3 bg-black/40 border border-white/10 space-y-2">
                          <label className="text-[11px] uppercase tracking-wider font-semibold text-accent flex items-center gap-1.5">
                            <Film size={14} /> Project Video (MP4 File Upload or Video URL)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Video URL (e.g. YouTube embed or MP4 link)"
                              value={editingProject.videoUrl || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                              className="flex-1 px-3 py-2 bg-white/5 border border-white/20 text-white text-xs"
                            />
                            <label className="px-3 py-2 bg-white/10 hover:bg-accent hover:text-charcoal text-xs font-semibold uppercase tracking-wider cursor-pointer flex items-center gap-1">
                              <Video size={14} /> Upload Video
                              <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, (dataUrl) => setEditingProject({ ...editingProject, videoUrl: dataUrl }));
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingProject(null)}
                            className="px-4 py-2 bg-white/10 text-white text-xs font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-accent text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-white"
                          >
                            Save Project Changes
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES MANAGER */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Services Offered ({content.services.length})</h3>
              <button
                onClick={() => setNewServiceModal(true)}
                className="px-4 py-2 bg-accent text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-all shadow-md"
              >
                <Plus size={14} /> Add Service
              </button>
            </div>

            {/* Add Service Form */}
            {newServiceModal && (
              <form onSubmit={handleAddServiceSubmit} className="p-5 bg-[#181828] border border-accent space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-accent font-semibold">New Service Form</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Service Title *"
                    required
                    value={newSvcData.title}
                    onChange={(e) => setNewSvcData({ ...newSvcData, title: e.target.value })}
                    className="px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                  />
                  <select
                    value={newSvcData.iconName}
                    onChange={(e) => setNewSvcData({ ...newSvcData, iconName: e.target.value })}
                    className="px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                  >
                    <option value="Wrench">Wrench</option>
                    <option value="Building2">Building2</option>
                    <option value="ClipboardList">ClipboardList</option>
                    <option value="Link2">Link2</option>
                    <option value="BarChart3">BarChart3</option>
                    <option value="Footprints">Footprints</option>
                  </select>
                </div>
                <textarea
                  placeholder="Service Description..."
                  rows={2}
                  value={newSvcData.desc}
                  onChange={(e) => setNewSvcData({ ...newSvcData, desc: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/20 text-white text-xs"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewServiceModal(false)}
                    className="px-3 py-1.5 bg-white/10 text-white text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-accent text-charcoal text-xs font-semibold"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            )}

            {/* Services List */}
            <div className="space-y-4">
              {content.services.map((service) => (
                <div key={service.id} className="p-4 bg-[#181828] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{service.title}</h4>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="p-1.5 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-steel-lighter">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ABOUT & BIO */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">About Page & Bio</h3>

            <div className="p-5 bg-[#181828] border border-white/10 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Subtitle / Headline</label>
                <input
                  type="text"
                  value={content.about.subtitle}
                  onChange={(e) => updateField('about.subtitle', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Bio Paragraph 1</label>
                <textarea
                  rows={3}
                  value={content.about.bioParagraphs[0] || ''}
                  onChange={(e) => {
                    const copy = [...content.about.bioParagraphs];
                    copy[0] = e.target.value;
                    updateField('about.bioParagraphs', copy);
                  }}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Quote Text</label>
                <textarea
                  rows={2}
                  value={content.about.quoteText}
                  onChange={(e) => updateField('about.quoteText', e.target.value)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CONTACT */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Contact Details</h3>

            <div className="p-5 bg-[#181828] border border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Email Address</label>
                  <input
                    type="email"
                    value={content.contact.email}
                    onChange={(e) => updateField('contact.email', e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-lighter mb-1">Location</label>
                  <input
                    type="text"
                    value={content.contact.location}
                    onChange={(e) => updateField('contact.location', e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 text-white text-sm focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: BACKUP & RESET */}
        {activeTab === 'data' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Export, Import & Reset</h3>

            <div className="p-5 bg-[#181828] border border-white/10 space-y-5">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">1. Export Portfolio JSON</h4>
                <p className="text-xs text-steel-lighter mb-3">Download your customized portfolio settings as a JSON file backup.</p>
                <button
                  onClick={exportJson}
                  className="px-4 py-2 bg-accent text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-white"
                >
                  <Download size={14} /> Export Content Backup JSON
                </button>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">2. Import Portfolio JSON</h4>
                <p className="text-xs text-steel-lighter mb-2">Paste JSON content below to restore or load configuration.</p>
                <form onSubmit={handleImportSubmit} className="space-y-3">
                  <textarea
                    rows={4}
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Paste JSON configuration here..."
                    className="w-full px-3 py-2 bg-black/40 border border-white/20 text-white text-xs font-mono"
                  />
                  {importStatus && <p className="text-xs text-accent font-semibold">{importStatus}</p>}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-accent hover:text-charcoal"
                  >
                    <Upload size={14} /> Import JSON Configuration
                  </button>
                </form>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">3. Change Admin Passcode</h4>
                <p className="text-xs text-steel-lighter mb-2">Update passcode required to access the admin portal.</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="New Admin Passcode"
                    value={content.adminPasscode || 'admin123'}
                    onChange={(e) => {
                      updateField('adminPasscode', e.target.value);
                      setPasscodeMsg('Passcode updated!');
                    }}
                    className="px-3 py-2 bg-black/40 border border-white/20 text-white text-xs font-mono"
                  />
                </div>
                {passcodeMsg && <p className="text-xs text-accent mt-1">{passcodeMsg}</p>}
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-red-400 mb-1">4. Reset to Default Portfolio Data</h4>
                <p className="text-xs text-steel-lighter mb-3">Wipe local edits and restore original portfolio data.</p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all portfolio content back to defaults?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <RotateCcw size={14} /> Reset All Content to Defaults
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Bottom Drawer Bar */}
      <div className="p-4 bg-[#161625] border-t border-white/10 flex items-center justify-between text-xs text-steel-lighter">
        <span>All edits auto-save to local storage</span>
        {!embedded && (
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-5 py-2 bg-accent text-charcoal font-semibold uppercase tracking-wider text-xs hover:bg-white"
          >
            Done Editing
          </button>
        )}
      </div>
    </div>
  );

  if (embedded) {
    return dashboardContent;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/80 backdrop-blur-sm transition-opacity duration-300">
      {dashboardContent}
    </div>
  );
}
