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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal/90 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-border shadow-2xl rounded-none text-charcoal animate-scale-in cad-corner-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-charcoal text-white hover:bg-accent hover:text-charcoal flex items-center justify-center transition-colors duration-200 shadow-lg cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Main Header Bar */}
        <div className="p-6 bg-charcoal text-white border-b border-white/10 pr-16 cad-grid-dark">
          <span className="inline-block px-3 py-1 bg-accent text-charcoal font-bold text-[10px] uppercase tracking-[0.2em] mb-1.5 font-mono shadow-xs">
            {project.category}
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
            {project.title}
          </h2>
        </div>

        {/* Modal Main Media Display */}
        <div className="relative w-full min-h-[350px] max-h-[72vh] bg-[#0d0d15] flex items-center justify-center p-3 sm:p-5 overflow-hidden">
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
              className="max-h-[70vh] w-auto max-w-full object-contain mx-auto shadow-2xl transition-all duration-300 animate-fade-in"
            />
          )}
        </div>

        {/* Gallery & Video Thumbnail Strip */}
        <div className="p-4 bg-surface border-b border-border flex items-center gap-3 overflow-x-auto">
          {galleryList.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveMedia(imgUrl);
                setIsVideoActive(false);
              }}
              className={`relative w-20 h-14 flex-shrink-0 border-2 overflow-hidden transition-all cursor-pointer ${
                !isVideoActive && activeMedia === imgUrl
                  ? 'border-accent ring-2 ring-accent/30 scale-105 shadow-md'
                  : 'border-border opacity-70 hover:opacity-100 hover:scale-102'
              }`}
            >
              <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain bg-black/80" />
              <span className="absolute top-1 left-1 bg-charcoal/80 text-white p-0.5">
                <ImageIcon size={10} />
              </span>
            </button>
          ))}

          {project.videoUrl && (
            <button
              onClick={() => setIsVideoActive(true)}
              className={`relative w-24 h-14 flex-shrink-0 border-2 bg-charcoal text-white flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                isVideoActive
                  ? 'border-accent ring-2 ring-accent/30 bg-accent text-charcoal'
                  : 'border-border opacity-80 hover:opacity-100'
              }`}
            >
              <Play size={16} className={isVideoActive ? 'text-charcoal' : 'text-accent'} />
              <span className="text-[9px] uppercase tracking-wider font-bold">Play Video</span>
            </button>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 md:p-10 space-y-8">
          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-surface border border-border">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-steel text-xs uppercase tracking-wider font-mono">
                <Weight size={14} className="text-accent" /> Tonnage
              </div>
              <p className="font-mono font-bold text-charcoal text-sm">{project.tonnage || 'Custom Scope'}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-steel text-xs uppercase tracking-wider font-mono">
                <Cpu size={14} className="text-accent" /> Software
              </div>
              <p className="font-semibold text-charcoal text-sm">Tekla 2025</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-steel text-xs uppercase tracking-wider font-mono">
                <Layers size={14} className="text-accent" /> Model Standard
              </div>
              <p className="font-semibold text-charcoal text-sm">LOD 400 BIM</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-steel text-xs uppercase tracking-wider font-mono">
                <FileCode size={14} className="text-accent" /> Formats
              </div>
              <p className="font-semibold text-charcoal text-sm">NC, DSTV, IFC</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2 font-mono">
              Project Overview
            </h3>
            <p className="text-steel leading-relaxed text-base">
              {project.desc}
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4 font-mono">
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
                  <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-charcoal font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-charcoal">Need a similar steel structure detailed?</p>
              <p className="text-xs text-steel">Get fabrication-ready models and drawings for your project.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onInquire();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-charcoal text-white text-[11px] uppercase tracking-[0.16em] font-bold btn-tactile-dark hover:bg-accent hover:text-charcoal transition-all duration-200 cursor-pointer shadow-lg"
            >
              Inquire About Similar Project <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
