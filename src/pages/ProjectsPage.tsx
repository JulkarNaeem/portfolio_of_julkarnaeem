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
      <section className="bg-charcoal pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 tracking-tight">
            Steel Projects
          </h1>
          <p className="text-lg text-steel-light mt-4 max-w-2xl">
            A selection of fabrication-ready Tekla BIM models and shop drawing packages delivered for steel fabricators, contractors, and engineering firms.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-border">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-medium transition-all ${
                  active === cat
                    ? 'bg-charcoal text-white'
                    : 'bg-surface text-steel hover:text-charcoal'
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
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="overflow-hidden mb-5 relative">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.tonnage !== '—' && (
                    <div className="absolute top-4 right-4 bg-charcoal/90 text-white text-[10px] uppercase tracking-wider px-3 py-1 font-mono">
                      {project.tonnage}
                    </div>
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">
                  {project.category}
                </span>
                <h3 className="text-lg font-semibold text-charcoal mt-1 mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-steel leading-relaxed mb-4">
                  {project.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-charcoal font-medium group-hover:text-accent transition-colors">
                  View Details <ArrowRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface border-t border-border py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4 tracking-tight">
            Have a Steel Project That Needs Detailing?
          </h2>
          <p className="text-steel mb-8">
            I'm ready to help you create accurate Tekla models and fabrication-ready drawings.
          </p>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-charcoal text-[12px] uppercase tracking-[0.15em] font-semibold hover:bg-charcoal hover:text-white transition-all duration-300"
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
