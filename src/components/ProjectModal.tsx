import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, Layers, Cpu, Weight, FileCode, Play, Image as ImageIcon } from 'lucide-react';
import { ProjectItem } from '../types/cms';

export type { ProjectItem };

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: () => void;
}

export default function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  const [activeMedia, setActiveMedia] = useState<string>('');
  const [isVideoActive, setIsVideoActive] = useState<boolean>(false);

  useEffect(() => {
    if (project) {
      setActiveMedia(project.img);
      setIsVideoActive(false);
    }
  }, [project]);

  if (!project) return null;

  const galleryList = Array.from(new Set([project.img, ...(project.gallery || [])]));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 shadow-2xl rounded-2xl text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-100 text-slate-700 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors duration-200 rounded-full shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Modal Main Header Bar */}
        <div className="p-6 bg-[#f8fafc] text-slate-900 border-b border-slate-200/80 pr-16">
          <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold font-mono text-[10px] uppercase tracking-[0.15em] mb-2 rounded-full shadow-xs">
            {project.category}
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
            {project.title}
          </h2>
        </div>

        {/* Modal Main Media Display (Full Photo Uncropped) */}
        <div className="relative w-full min-h-[350px] max-h-[75vh] bg-[#0a0e17] flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          {isVideoActive && project.videoUrl ? (
            project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
              <iframe
                src={project.videoUrl.replace('watch?v=', 'embed/')}
                title={project.title}
                className="w-full h-[450px] border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={project.videoUrl}
                controls
                autoPlay
                className="w-full max-h-[70vh] object-contain bg-black"
              />
            )
          ) : (
            <img
              src={activeMedia || project.img}
              alt={project.title}
              className="max-h-[70vh] w-auto max-w-full object-contain mx-auto shadow-2xl transition-all duration-300"
            />
          )}
        </div>

        {/* Gallery & Video Thumbnail Strip */}
        <div className="p-4 bg-[#f8fafc] border-b border-slate-200/80 flex items-center gap-3 overflow-x-auto">
          {/* Photos */}
          {galleryList.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveMedia(imgUrl);
                setIsVideoActive(false);
              }}
              className={`relative w-20 h-14 flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all ${
                !isVideoActive && activeMedia === imgUrl
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-105'
                  : 'border-slate-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain bg-black/80" />
              <span className="absolute top-1 left-1 bg-slate-900/80 text-white p-0.5 rounded-sm">
                <ImageIcon size={10} />
              </span>
            </button>
          ))}

          {/* Video Button if Available */}
          {project.videoUrl && (
            <button
              onClick={() => setIsVideoActive(true)}
              className={`relative w-24 h-14 flex-shrink-0 border-2 rounded-lg bg-slate-900 text-white flex flex-col items-center justify-center gap-1 transition-all ${
                isVideoActive
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-500 text-white'
                  : 'border-slate-200 opacity-80 hover:opacity-100'
              }`}
            >
              <Play size={16} className={isVideoActive ? 'text-white' : 'text-emerald-400'} />
              <span className="text-[9px] uppercase tracking-wider font-bold">Play Video</span>
            </button>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 md:p-10 space-y-8">
          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#f8fafc] border border-slate-200/80 rounded-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <Weight size={14} className="text-emerald-600" /> Tonnage
              </div>
              <p className="font-mono font-extrabold text-slate-900 text-sm">{project.tonnage || 'Custom Scope'}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <Cpu size={14} className="text-emerald-600" /> Software
              </div>
              <p className="font-extrabold text-slate-900 text-sm">Tekla 2025</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <Layers size={14} className="text-emerald-600" /> Model Standard
              </div>
              <p className="font-extrabold text-slate-900 text-sm">LOD 400 BIM</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <FileCode size={14} className="text-emerald-600" /> Formats
              </div>
              <p className="font-extrabold text-slate-900 text-sm">NC, DSTV, IFC</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 mb-3">
              Project Overview
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              {project.desc}
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 mb-4">
              Scope & Package Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '3D Coordinated Tekla Model',
                'General Arrangement (GA) Drawings',
                'Fabrication Assembly Shop Drawings',
                'Single Part Drawings & Fittings',
                'Anchor Bolt Layout Plans',
                'NC / DSTV Files for CNC Machines',
                'Material Take-off & Bolt Lists',
                'Field Erection Mark Layouts',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-800 font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold text-slate-900">Need a similar steel structure detailed?</p>
              <p className="text-xs text-slate-500">Get fabrication-ready models and drawings for your project.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onInquire();
              }}
              className="btn-clicky w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-500 text-white text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-emerald-600 transition-all duration-200 rounded-xl shadow-lg shadow-emerald-500/20"
            >
              Inquire About Similar Project <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
