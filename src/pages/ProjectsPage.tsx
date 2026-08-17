import { useState } from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import ProjectModal, { ProjectItem } from '../components/ProjectModal';
import { useCms } from '../context/CmsContext';

const categories = [
  'All',
  'Industrial Platform',
  'PEB',
  'Structural Steel',
  'Access Structures',
  'Connection Design',
];

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

export default function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const { content } = useCms();
  const [active, setActive] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects = content.projects;

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Page Header */}
      <section className="bg-charcoal pt-32 pb-16 lg:pt-36 lg:pb-20 text-white relative overflow-hidden cad-grid-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">Portfolio & Models</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
            Steel Projects
          </h1>
          <p className="text-base sm:text-lg text-steel-light mt-4 max-w-2xl leading-relaxed">
            A comprehensive showcase of fabrication-ready Tekla BIM models, GA drawings, and shop drawing packages delivered for steel fabricators worldwide.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Category Filter Bar */}
          <div className="flex flex-wrap gap-2.5 mb-12 pb-6 border-b border-border">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-200 cursor-pointer ${
                  active === cat
                    ? 'bg-charcoal text-white shadow-md border-b-2 border-accent'
                    : 'bg-surface text-steel hover:text-charcoal hover:bg-surface-alt border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <div 
                key={i} 
                className="group cursor-pointer bg-white border border-border hover:border-accent hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cad-corner-box hover:-translate-y-1"
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  {/* Image Frame */}
                  <div className="relative bg-[#f8fafc] border-b border-border p-4 overflow-hidden aspect-[4/3] flex items-center justify-center">
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover Overlay with Inspect Icon */}
                    <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <span className="px-4 py-2 bg-accent text-charcoal font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 size={13} /> Inspect Drawings
                      </span>
                    </div>

                    {/* Tonnage Badge */}
                    {project.tonnage && project.tonnage !== '—' && (
                      <div className="absolute top-3 right-3 bg-charcoal/90 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 font-mono font-bold shadow-md border border-white/10">
                        {project.tonnage}
                      </div>
                    )}

                    {/* Gallery Count */}
                    {project.gallery && project.gallery.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-accent text-charcoal text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold shadow-md flex items-center gap-1">
                        <span>📷 {project.gallery.length} Images</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
                        {project.category}
                      </span>
                      {project.software && (
                        <span className="text-[9px] uppercase tracking-wider text-steel bg-surface border border-border px-2 py-0.5 font-mono">
                          {typeof project.software === 'string' ? project.software.split(' ')[0] : 'Tekla'}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-charcoal mb-2 group-hover:text-accent transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-steel leading-relaxed mb-4 line-clamp-2">
                      {project.desc}
                    </p>

                    {/* Deliverables Tags */}
                    {project.deliverables && project.deliverables.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                        {project.deliverables.slice(0, 3).map((deliv, dIdx) => (
                          <span
                            key={dIdx}
                            className="text-[10px] uppercase tracking-wider text-charcoal/70 bg-surface px-2 py-0.5 border border-border font-medium"
                          >
                            {deliv}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-border/40">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-charcoal font-bold group-hover:text-accent transition-colors flex items-center gap-1.5">
                    Inspect Drawings <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <span className="text-xs text-steel/50 font-mono">#0{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-surface border-t border-border py-20 relative cad-grid-light">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-charcoal mb-4 tracking-tight">
            Have a Steel Project That Needs Detailing?
          </h2>
          <p className="text-steel mb-8 text-base">
            I'm ready to help you create accurate Tekla models and fabrication-ready drawings for your upcoming fabrication work.
          </p>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-charcoal text-[12px] uppercase tracking-[0.16em] font-bold btn-tactile shadow-lg hover:bg-charcoal hover:text-white transition-all duration-300 cursor-pointer"
          >
            Start a Project
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* Project Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => {
          onNavigate('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </>
  );
}
