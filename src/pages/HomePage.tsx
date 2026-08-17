import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Box,
  FileText,
  Link2,
  Wrench,
  Building2,
  ClipboardList,
  BarChart3,
  Footprints,
} from 'lucide-react';
import ProjectModal, { ProjectItem } from '../components/ProjectModal';
import { useCms } from '../context/CmsContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { content } = useCms();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center bg-[#f8fafc] text-charcoal overflow-hidden pt-20">
        {/* Soft Modern Positive Accent Blobs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-24 lg:py-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold font-mono text-[11px] uppercase tracking-wider rounded-full flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {content.hero.badge || 'TEKLA STRUCTURAL STEEL DETAILER'}
                </span>
                <span className="px-3 py-1 bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700 uppercase tracking-wider font-semibold rounded-full">
                  AISC & NISD Standard
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight mb-6">
                {content.hero.headlineLine1}
                <br />
                <span className="text-slate-600 font-normal">
                  {content.hero.headlineLine2}
                </span>
                <br />
                <span className="relative inline-block text-emerald-600">
                  {content.hero.headlineLine3}
                  <span className="absolute bottom-1 left-0 w-full h-[4px] bg-emerald-400/30 rounded-full" />
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-lg mb-8">
                {content.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleNav('projects')}
                  className="btn-clicky group inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold text-[12px] uppercase tracking-[0.15em] hover:bg-emerald-600 transition-all duration-300 rounded-xl shadow-lg shadow-slate-900/10"
                >
                  View Steel Projects
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className="btn-clicky inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-800 font-bold text-[12px] uppercase tracking-[0.15em] hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 rounded-xl shadow-xs"
                >
                  Request Detailing Quote
                </button>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -top-3 -right-3 w-full h-full border-2 border-emerald-500/30 rounded-2xl z-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                <div className="relative z-10 bg-white overflow-hidden border border-slate-200/80 shadow-2xl rounded-2xl">
                  <img
                    src="/images/hero-steel.jpg"
                    alt="Tekla 3D Steel Structure Model"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 z-20 bg-white/95 text-slate-900 backdrop-blur-md px-4 py-3 border-l-4 border-emerald-500 shadow-xl rounded-r-xl">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-mono font-bold">Tekla Structures 2025</p>
                    <p className="text-xs font-bold text-slate-900">Fabrication-Ready Shop Package</p>
                  </div>
                  <div className="absolute top-4 right-4 z-20 bg-emerald-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 shadow-md rounded-full">
                    LOD 400
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REAL TECHNICAL METRICS BAR ─── */}
      <section className="bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: 'Steel Detailed', val: '1,200+ Tons', icon: <Building2 size={20} className="text-emerald-400" /> },
              { label: 'BIM Engine', val: 'Tekla 2025', icon: <Box size={20} className="text-emerald-400" /> },
              { label: 'Standards', val: 'AISC & NISD', icon: <CheckCircle size={20} className="text-emerald-400" /> },
              { label: 'Output Data', val: 'NC & DSTV', icon: <ClipboardList size={20} className="text-emerald-400" /> },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white font-mono">{stat.val}</p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="bg-white text-slate-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-mono font-bold">Portfolio Showcase</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                Featured Steel Projects
              </h2>
            </div>
            <button
              onClick={() => handleNav('projects')}
              className="group flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-slate-600 font-bold hover:text-emerald-600 transition-colors"
            >
              View All Projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: '/images/project-1.jpg',
                title: 'Curved Industrial Steel Walkway Platform',
                category: 'Industrial Platform',
                desc: 'Full Tekla BIM model with curved steel walkway, handrails, grating, and connection details for an industrial plant.',
              },
              {
                img: '/images/project-2.jpg',
                title: 'PEB Warehouse Portal Frame',
                category: 'Pre-Engineered Building',
                desc: 'Complete portal frame modeling with purlins, bracing, and girts for a 40m span PEB warehouse facility.',
              },
              {
                img: '/images/project-3.jpg',
                title: 'Industrial Steel Platform & Handrail',
                category: 'Industrial Steel',
                desc: 'Multi-level access platform with checkered plate flooring, stairs, and safety handrails for process equipment access.',
              },
              {
                img: '/images/project-4.jpg',
                title: 'Steel Stair and Guardrail System',
                category: 'Access Structures',
                desc: 'Detailed stair stringers, treads, guardrail posts, and mid-rails with fabrication-ready shop drawings.',
              },
              {
                img: '/images/project-5.jpg',
                title: 'Multi-storey Steel Building Framing',
                category: 'Structural Steel',
                desc: 'Full structural steel framing model for a 4-storey commercial building with composite deck connections.',
              },
              {
                img: '/images/project-6.jpg',
                title: 'Heavy Steel Connection Details',
                category: 'Connection Design',
                desc: 'Moment connections, base plates, splice joints, and bracing gussets modeled with full bolt and weld details.',
              },
            ].map((project, i) => (
              <div 
                key={i} 
                className="group cursor-pointer bg-white border border-slate-200/80 p-5 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1" 
                onClick={() => setSelectedProject(project as ProjectItem)}
              >
                <div className="overflow-hidden mb-4 relative bg-slate-100 rounded-xl border border-slate-100">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 text-emerald-700 font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs border border-emerald-100">
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
                  View Specs & Photos <ArrowRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT I DELIVER ─── */}
      <section className="bg-[#f8fafc] text-slate-900 py-24 lg:py-32 border-y border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-mono font-bold">Deliverables Package</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Fabrication-Ready Steel Detailing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Box size={28} className="text-emerald-600" />,
                title: 'Tekla BIM Models',
                desc: 'Accurate, coordinated 3D models built in Tekla Structures with proper material grades, profiles, bolt assemblies, and weld preparations — ready for fabrication extraction.',
              },
              {
                icon: <FileText size={28} className="text-emerald-600" />,
                title: 'Shop Drawings & GA Drawings',
                desc: 'Clean, organized general arrangement drawings and detailed shop drawings with dimensions, sections, material lists, and fabrication notes — clear enough for any workshop.',
              },
              {
                icon: <Link2 size={28} className="text-emerald-600" />,
                title: 'Connection Detailing & Construction Clarity',
                desc: 'Every joint, splice, base plate, and gusset is modeled and detailed with full bolt patterns, weld symbols, and erection marks for seamless fabrication and erection.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 lg:p-10 border border-slate-200/80 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES SNAPSHOT ─── */}
      <section className="bg-white text-slate-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-mono font-bold">What I Do</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                Specialized Detailing Services
              </h2>
            </div>
            <button
              onClick={() => handleNav('services')}
              className="group flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-slate-600 font-bold hover:text-emerald-600 transition-colors"
            >
              All Services
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Wrench size={24} className="text-emerald-600" />, title: 'Structural Steel Detailing', desc: 'Complete detailing of structural steel members, assemblies, and connections using Tekla Structures.' },
              { icon: <Building2 size={24} className="text-emerald-600" />, title: 'PEB & Industrial Modeling', desc: 'Pre-engineered building frames, portal structures, and industrial steel modeling for fabrication.' },
              { icon: <ClipboardList size={24} className="text-emerald-600" />, title: 'Shop Drawing Production', desc: 'Fabrication-ready shop drawings with dimensions, bolt details, weld symbols, and material lists.' },
              { icon: <Link2 size={24} className="text-emerald-600" />, title: 'Steel Connection Detailing', desc: 'Moment connections, shear connections, base plates, splices, and bracing connections — fully detailed.' },
              { icon: <BarChart3 size={24} className="text-emerald-600" />, title: 'Material Take-Off / Reports', desc: 'Accurate material quantity reports, bolt lists, and assembly summaries extracted from the Tekla model.' },
              { icon: <Footprints size={24} className="text-emerald-600" />, title: 'Stairs, Platforms & Access', desc: 'Steel staircases, walkway platforms, handrails, ladders, and access structures — detailed for fabrication.' },
            ].map((svc, i) => (
              <div
                key={i}
                className="p-6 lg:p-8 border border-slate-200/80 bg-white rounded-2xl group cursor-pointer transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1"
                onClick={() => handleNav('services')}
              >
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                  {svc.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{svc.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="bg-slate-900 text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 font-bold font-mono">Workflow Pipeline</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
              From Structural Drawings to Shop Floor
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { step: '01', title: 'Drawing & RFI Review', desc: 'Review structural drawings & issue RFIs to resolve design queries before modeling' },
              { step: '02', title: 'Tekla 3D BIM Modeling', desc: 'Construct LOD 400 3D Tekla model with exact member profiles, plates, and welds' },
              { step: '03', title: 'Connection & Clash Check', desc: 'Detail moment, shear, and bracing connections with zero clash tolerance' },
              { step: '04', title: 'Shop Package & CNC Data', desc: 'Extract GA plans, shop assembly drawings, bolt lists, and NC/DSTV CNC files' },
              { step: '05', title: 'Fabrication & Erection Support', desc: 'Provide immediate technical support for shop floor and field erection teams' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl font-extrabold text-emerald-400 font-mono mb-3 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="w-full h-[1px] bg-white/10 mb-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SNAPSHOT ─── */}
      <section className="bg-white text-slate-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -top-3 -right-3 w-full h-full border-2 border-emerald-500/30 rounded-2xl z-0" />
              <img
                src="/images/about-portrait.jpg"
                alt="Julkar Naeem - Steel Structure Detailer"
                className="w-full max-w-md aspect-[3/4] object-cover relative z-10 border border-slate-200/80 shadow-2xl rounded-2xl"
              />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-mono font-bold">About Detailer</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-6 tracking-tight">
                Julkar Naeem
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                I am a Steel Structure Detailer specializing in Tekla Structures. I focus on clean, organized, fabrication-oriented steel models and drawings that help fabricators and contractors execute with clarity.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                With over 150 successfully delivered steel structure projects — from PEB warehouses to multi-storey buildings, industrial platforms to complex connection details — I bring precision and real-world fabrication understanding to every project.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Tekla Structures Expert',
                  'Fabrication-Focused Approach',
                  '150+ Projects Delivered',
                  'Global Project Experience',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-slate-800 font-bold">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleNav('about')}
                className="btn-clicky group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold text-[12px] uppercase tracking-[0.15em] hover:bg-emerald-600 transition-all duration-300 rounded-xl shadow-lg"
              >
                About Me
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-[#f8fafc] text-slate-900 border-t border-slate-200/80 py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-mono font-bold">Let's Work Together</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6 tracking-tight">
            Need Fabrication-Ready Steel Drawings?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-10 max-w-xl mx-auto">
            Let's turn your structural concept into an accurate Tekla model and clear shop drawing package.
          </p>
          <button
            onClick={() => handleNav('contact')}
            className="btn-clicky group inline-flex items-center gap-2 px-9 py-4.5 bg-emerald-500 text-white text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-emerald-600 transition-all duration-300 rounded-xl shadow-xl shadow-emerald-500/25"
          >
            Start a Project
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Project Detail Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => handleNav('contact')}
      />
    </>
  );
}
