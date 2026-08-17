import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
      <section className="bg-[#0a0e17] text-white pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-mono font-bold">Portfolio Showcase</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
            Steel Projects Gallery
          </h1>
          <p className="text-base md:text-lg text-steel-light mt-4 max-w-2xl">
            Fabrication-ready Tekla BIM models, connection details, and shop drawing packages delivered for steel fabricators and contractors.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-[#0a0e17] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-bold font-mono transition-all ${
                  active === cat
                    ? 'bg-accent text-charcoal shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-white/5 border border-white/10 text-steel-light hover:text-white hover:border-accent/40'
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
                className="group cursor-pointer bg-[#121824] border border-white/10 p-4 hover:border-accent/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.12)]"
                onClick={() => setSelectedProject(project)}
              >
                <div className="overflow-hidden mb-4 relative bg-black/40 border border-white/5">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.tonnage && project.tonnage !== '—' && (
                    <div className="absolute top-3 right-3 bg-charcoal/90 border border-accent/40 text-accent font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 font-bold shadow-md">
                      {project.tonnage}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-charcoal/90 text-accent font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-white/10">
                    {project.category}
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mt-1 mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-steel-light leading-relaxed mb-4 line-clamp-2">
                  {project.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-accent font-bold group-hover:translate-x-1 transition-transform">
                  View Full Specs <ArrowRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f172a] text-white border-t border-white/10 py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
            Have a Steel Project That Needs Detailing?
          </h2>
          <p className="text-steel-light mb-8">
            I'm ready to help you create accurate Tekla models and fabrication-ready drawings.
          </p>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-clicky group inline-flex items-center gap-2 px-8 py-4 bg-accent text-charcoal text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.25)]"
          >
            Start a Project
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
