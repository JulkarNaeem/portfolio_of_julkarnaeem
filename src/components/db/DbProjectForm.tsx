import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Image as ImageIcon, Check } from 'lucide-react';
import { useProjectDb } from '../../context/ProjectDbContext';
import {
  PROJECT_STATUSES,
  PROJECT_TYPES,
  DESIGN_STANDARDS,
  PRESET_PROJECT_IMAGES,
  ProjectStatus,
} from '../../types/db';

interface DbProjectFormProps {
  projectId?: string | null;
  onCancel: () => void;
  onSaved: (id: string) => void;
}

const SQM_TO_SQFT = 10.76391;

export default function DbProjectForm({ projectId, onCancel, onSaved }: DbProjectFormProps) {
  const { projects, addProject, updateProject, getProject } = useProjectDb();
  const isEditing = !!projectId;

  const [formData, setFormData] = useState({
    id: '',
    projectNumber: '',
    type: PROJECT_TYPES[0] as string,
    status: 'Completed' as ProjectStatus,
    title: '',
    description: '',
    weight_tons: 0,
    area_sqm: 0,
    area_sqft: 0,
    location: '',
    designStandard: DESIGN_STANDARDS[0] as string,
    image: PRESET_PROJECT_IMAGES[0] as string,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && projectId) {
      const existing = getProject(projectId);
      if (existing) {
        setFormData({
          id: existing.id,
          projectNumber: existing.projectNumber || '',
          type: existing.type,
          status: existing.status,
          title: existing.title,
          description: existing.description,
          weight_tons: existing.weight_tons,
          area_sqm: existing.area_sqm,
          area_sqft: existing.area_sqft,
          location: existing.location,
          designStandard: existing.designStandard,
          image: existing.image,
        });
      }
    } else {
      // Auto-suggest next ID e.g. JN-011
      const count = projects.length + 1;
      const formattedNum = String(count).padStart(3, '0');
      setFormData((prev) => ({
        ...prev,
        id: `JN-${formattedNum}`,
        projectNumber: `PRJ-${new Date().getFullYear()}-${formattedNum}`,
      }));
    }
  }, [projectId, isEditing]);

  // Two-way area conversion
  const handleAreaSqmChange = (valStr: string) => {
    const val = parseFloat(valStr) || 0;
    const convertedSqft = val > 0 ? Math.round(val * SQM_TO_SQFT) : 0;
    setFormData((prev) => ({
      ...prev,
      area_sqm: val,
      area_sqft: convertedSqft,
    }));
  };

  const handleAreaSqftChange = (valStr: string) => {
    const val = parseFloat(valStr) || 0;
    const convertedSqm = val > 0 ? Math.round(val / SQM_TO_SQFT) : 0;
    setFormData((prev) => ({
      ...prev,
      area_sqft: val,
      area_sqm: convertedSqm,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedId = formData.id.trim().toUpperCase();
    if (!trimmedId) {
      setError('Project ID is required (e.g. JN-001).');
      return;
    }

    if (!formData.title.trim()) {
      setError('Project title is required.');
      return;
    }

    if (!isEditing) {
      const exists = projects.some((p) => p.id.toUpperCase() === trimmedId);
      if (exists) {
        setError(`A project with ID "${trimmedId}" already exists. Choose a unique ID.`);
        return;
      }

      addProject({
        id: trimmedId,
        projectNumber: formData.projectNumber.trim() || undefined,
        type: formData.type,
        status: formData.status,
        title: formData.title.trim(),
        description: formData.description.trim(),
        weight_tons: Number(formData.weight_tons) || 0,
        area_sqm: Number(formData.area_sqm) || 0,
        area_sqft: Number(formData.area_sqft) || 0,
        location: formData.location.trim() || 'Global',
        designStandard: formData.designStandard,
        image: formData.image,
      });
      onSaved(trimmedId);
    } else {
      updateProject(projectId!, {
        projectNumber: formData.projectNumber.trim() || undefined,
        type: formData.type,
        status: formData.status,
        title: formData.title.trim(),
        description: formData.description.trim(),
        weight_tons: Number(formData.weight_tons) || 0,
        area_sqm: Number(formData.area_sqm) || 0,
        area_sqft: Number(formData.area_sqft) || 0,
        location: formData.location.trim() || 'Global',
        designStandard: formData.designStandard,
        image: formData.image,
      });
      onSaved(projectId!);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in text-charcoal">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-600 hover:text-steel-blue transition-colors cursor-pointer font-semibold"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </button>
        <span className="text-xs font-mono text-slate-500">
          {isEditing ? `Editing: ${projectId}` : 'Create New Project Record'}
        </span>
      </div>

      {/* Form Card */}
      <div className="bg-white border-2 border-border p-6 sm:p-8 shadow-md relative cad-corner-box">
        <div className="border-b border-border pb-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-sans">
            {isEditing ? `Edit Project: ${formData.title || projectId}` : 'Add New Project to Database'}
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Fill in Tekla detailing project metadata, geometry calculations, and deliverables.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-mono animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: ID, Project Number, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-2 font-semibold">
                Project ID <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value.toUpperCase() })}
                placeholder="e.g. JN-011"
                disabled={isEditing}
                required
                className="w-full bg-[#F8FAFC] border border-border px-3.5 py-2.5 text-charcoal text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue focus:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-2 font-semibold">
                Project Number
              </label>
              <input
                type="text"
                value={formData.projectNumber}
                onChange={(e) => setFormData({ ...formData, projectNumber: e.target.value })}
                placeholder="e.g. PRJ-2025-011"
                className="w-full bg-[#F8FAFC] border border-border px-3.5 py-2.5 text-charcoal text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-2 font-semibold">
                Status <span className="text-amber-600">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                className="w-full bg-[#F8FAFC] border border-border px-3.5 py-2.5 text-charcoal text-xs font-mono focus:outline-none focus:border-steel-blue cursor-pointer"
              >
                {PROJECT_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Title & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-2 font-semibold">
                Project Title <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. 5-Storey Commercial Steel Frame"
                required
                className="w-full bg-[#F8FAFC] border border-border px-3.5 py-2.5 text-charcoal text-xs font-sans placeholder:text-slate-400 focus:outline-none focus:border-steel-blue focus:bg-white transition-colors font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-2 font-semibold">
                Project Type <span className="text-amber-600">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#F8FAFC] border border-border px-3.5 py-2.5 text-charcoal text-xs font-mono focus:outline-none focus:border-steel-blue cursor-pointer"
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Description */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-2 font-semibold">
              Scope &amp; Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detail the fabrication scope, connection types, GA packages, and Tekla BIM LOD standard..."
              className="w-full bg-[#F8FAFC] border border-border px-3.5 py-2.5 text-charcoal text-xs font-sans placeholder:text-slate-400 focus:outline-none focus:border-steel-blue focus:bg-white transition-colors leading-relaxed"
            />
          </div>

          {/* Row 4: Weight, Area m², Area sqft (Two-Way Auto-Converter) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-[#F8FAFC] p-4 border border-border">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-2 font-semibold">
                Weight (Tons)
              </label>
              <input
                type="number"
                step="any"
                min="0"
                value={formData.weight_tons === 0 ? '' : formData.weight_tons}
                onChange={(e) => setFormData({ ...formData, weight_tons: parseFloat(e.target.value) || 0 })}
                placeholder="0"
                className="w-full bg-white border border-border px-3.5 py-2.5 text-charcoal text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-700 font-semibold">
                  Area (m²)
                </label>
                <span className="text-[10px] text-steel-blue font-mono font-bold">⇄ Auto</span>
              </div>
              <input
                type="number"
                step="any"
                min="0"
                value={formData.area_sqm === 0 ? '' : formData.area_sqm}
                onChange={(e) => handleAreaSqmChange(e.target.value)}
                placeholder="e.g. 2400"
                className="w-full bg-white border border-border px-3.5 py-2.5 text-charcoal text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-700 font-semibold">
                  Area (Sq Ft)
                </label>
                <span className="text-[10px] text-steel-blue font-mono font-bold">⇄ Auto</span>
              </div>
              <input
                type="number"
                step="any"
                min="0"
                value={formData.area_sqft === 0 ? '' : formData.area_sqft}
                onChange={(e) => handleAreaSqftChange(e.target.value)}
                placeholder="e.g. 25833"
                className="w-full bg-white border border-border px-3.5 py-2.5 text-charcoal text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue transition-colors"
              />
            </div>
          </div>

          {/* Row 5: Location & Design Standard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-2 font-semibold">
                Project Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Dhaka, Bangladesh or Calgary, Canada"
                className="w-full bg-[#F8FAFC] border border-border px-3.5 py-2.5 text-charcoal text-xs font-sans placeholder:text-slate-400 focus:outline-none focus:border-steel-blue focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-2 font-semibold">
                Design Standard <span className="text-amber-600">*</span>
              </label>
              <select
                value={formData.designStandard}
                onChange={(e) => setFormData({ ...formData, designStandard: e.target.value })}
                className="w-full bg-[#F8FAFC] border border-border px-3.5 py-2.5 text-charcoal text-xs font-mono focus:outline-none focus:border-steel-blue cursor-pointer"
              >
                {DESIGN_STANDARDS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 6: Cover Image Picker from Preset Gallery */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 font-semibold">
                Project Cover Image
              </label>
              <span className="text-[10px] text-slate-500 font-mono">
                Select from Tekla project gallery
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-h-56 overflow-y-auto p-2 bg-[#F8FAFC] border border-border">
              {PRESET_PROJECT_IMAGES.map((imgUrl) => {
                const isSelected = formData.image === imgUrl;
                const fileName = imgUrl.split('/').pop()?.replace('.png', '').replace('.jpg', '') || '';

                return (
                  <button
                    key={imgUrl}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: imgUrl })}
                    className={`relative aspect-[4/3] bg-white border-2 overflow-hidden transition-all group cursor-pointer shadow-xs ${
                      isSelected
                        ? 'border-steel-blue shadow-md ring-2 ring-steel-blue/30'
                        : 'border-border hover:border-slate-400'
                    }`}
                    title={fileName}
                  >
                    <img
                      src={imgUrl}
                      alt={fileName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {isSelected && (
                      <div className="absolute top-1 right-1 bg-steel-blue text-white p-0.5 rounded-xs shadow">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                    <span className="absolute bottom-0 inset-x-0 bg-charcoal/80 text-white text-[8px] font-mono px-1 py-0.5 truncate text-left">
                      {fileName}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom URL Input */}
            <div className="flex items-center gap-2 pt-1">
              <ImageIcon size={14} className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Or enter custom image path (e.g. /images/Project Photos/...)"
                className="w-full bg-[#F8FAFC] border border-border px-3 py-1.5 text-charcoal text-[11px] font-mono placeholder:text-slate-400 focus:outline-none focus:border-steel-blue focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-slate-600 hover:text-charcoal hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-safety-yellow text-charcoal text-xs uppercase tracking-[0.16em] font-bold btn-tactile hover:bg-steel-blue hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
            >
              <Save size={15} />
              {isEditing ? 'Update Project' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
