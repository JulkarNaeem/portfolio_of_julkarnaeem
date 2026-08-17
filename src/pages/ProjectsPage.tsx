import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const categories = [
  'All',
  'Industrial Platform',
  'PEB',
  'Structural Steel',
  'Access Structures',
  'Connection Design',
];

const projects = [
  {
    img: '/images/project-1.jpg',
    title: 'Curved Industrial Steel Walkway Platform',
    category: 'Industrial Platform',
    desc: 'Full Tekla BIM model with curved steel walkway, handrails, grating, and connection details for an industrial plant.',
    tonnage: '45 tons',
  },
  {
    img: '/images/project-2.jpg',
    title: 'PEB Warehouse Portal Frame',
    category: 'PEB',
    desc: 'Complete portal frame modeling with purlins, bracing, and girts for a 40m span PEB warehouse facility.',
    tonnage: '120 tons',
  },
  {
    img: '/images/project-3.jpg',
    title: 'Industrial Steel Platform & Handrail',
    category: 'Industrial Platform',
    desc: 'Multi-level access platform with checkered plate flooring, stairs, and safety handrails for process equipment access.',
    tonnage: '32 tons',
  },
  {
    img: '/images/project-4.jpg',
    title: 'Steel Stair and Guardrail System',
    category: 'Access Structures',
    desc: 'Detailed stair stringers, treads, guardrail posts, and mid-rails with fabrication-ready shop drawings.',
    tonnage: '18 tons',
  },
  {
    img: '/images/project-5.jpg',
    title: 'Multi-storey Steel Building Framing',
    category: 'Structural Steel',
    desc: 'Full structural steel framing model for a 4-storey commercial building with composite deck connections.',
    tonnage: '280 tons',
  },
  {
    img: '/images/project-6.jpg',
    title: 'Heavy Steel Connection Details',
    category: 'Connection Design',
    desc: 'Moment connections, base plates, splice joints, and bracing gussets modeled with full bolt and weld details.',
    tonnage: '—',
  },
  {
    img: '/images/project-1.jpg',
    title: 'Chemical Plant Pipe Rack Platform',
    category: 'Industrial Platform',
    desc: 'Complex pipe rack support structure with multiple access levels, grating, and kick plates for a chemical processing facility.',
    tonnage: '65 tons',
  },
  {
    img: '/images/project-2.jpg',
    title: 'Cold Storage PEB Facility',
    category: 'PEB',
    desc: 'Insulated pre-engineered building with specialized panel connections and crane beam provisions for cold storage operations.',
    tonnage: '95 tons',
  },
  {
    img: '/images/project-5.jpg',
    title: 'Steel Bridge Girder System',
    category: 'Structural Steel',
    desc: 'Plate girder bridge structure with cross-bracing, stiffener details, and bearing connection assemblies.',
    tonnage: '180 tons',
  },
];

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

export default function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [active, setActive] = useState('All');

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
              <div key={i} className="group cursor-pointer">
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
                <h3 className="text-lg font-semibold text-charcoal mt-1 mb-2 group-hover:text-steel transition-colors">
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
    </>
  );
}
