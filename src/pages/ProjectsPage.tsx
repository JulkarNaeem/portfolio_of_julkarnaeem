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
      <section className="bg-[#f8fafc] text-slate-900 pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-mono font-bold">Portfolio Showcase</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Steel Projects Gallery
          </h1>
          <p className="text-base md:text-lg text-slate-600 mt-4 max-w-2xl">
            Fabrication-ready Tekla BIM models, connection details, and shop drawing packages delivered for steel fabricators and contractors.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white text-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-slate-200/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-bold font-mono transition-all rounded-xl ${
                  active === cat
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-emerald-500/40'
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
                className="group cursor-pointer bg-white border border-slate-200/80 p-5 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                onClick={() => setSelectedProject(project)}
              >
                <div className="overflow-hidden mb-4 relative bg-slate-100 rounded-xl border border-slate-100">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.tonnage && project.tonnage !== '—' && (
                    <div className="absolute top-3 right-3 bg-slate-900 text-white font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 font-bold shadow-md rounded-md">
                      {project.tonnage}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-white/95 text-emerald-700 font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs border border-emerald-100">
                    {project.category}
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-2 group-hover:text-emerald-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {project.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-emerald-600 font-bold group-hover:translate-x-1 transition-transform">
                  View Full Specs <ArrowRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8fafc] text-slate-900 border-t border-slate-200/80 py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Have a Steel Project That Needs Detailing?
          </h2>
          <p className="text-slate-600 mb-8">
            I'm ready to help you create accurate Tekla models and fabrication-ready drawings.
          </p>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-clicky group inline-flex items-center gap-2 px-9 py-4 bg-emerald-500 text-white text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-emerald-600 transition-all duration-300 rounded-xl shadow-xl shadow-emerald-500/25"
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
