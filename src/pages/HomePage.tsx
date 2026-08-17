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
  MapPin,
  Award,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/SocialIcons';
import ProjectModal, { ProjectItem } from '../components/ProjectModal';
import { useCms } from '../context/CmsContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const WA_LINK = 'https://wa.me/8801739411586?text=Hi%20Julkar!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.';

export default function HomePage({ onNavigate }: HomePageProps) {
  const { content } = useCms();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pick 6 featured projects from CMS
  const featuredProjects = content.projects.slice(0, 6);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-32 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="order-2 lg:order-1">
              {/* Location badge */}
              <div className="flex items-center gap-2 mb-5">
                <MapPin size={13} className="text-accent" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-steel font-medium">
                  Dhaka, Bangladesh · Remote Worldwide
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-steel font-medium">
                  {content.hero.badge}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-charcoal leading-[1.1] tracking-tight mb-6">
                {content.hero.headlineLine1}
                <br />
                <span className="text-steel">
                  {content.hero.headlineLine2}
                </span>
                <br />
                {content.hero.headlineLine3}
              </h1>

              <p className="text-lg text-steel leading-relaxed max-w-lg mb-4">
                {content.hero.subtitle}
              </p>

              {/* Stats inline */}
              <div className="flex items-center gap-6 mb-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm font-medium text-charcoal tracking-wide">150+ Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm font-medium text-charcoal tracking-wide">9+ Years</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm font-medium text-charcoal tracking-wide">4+ Countries</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleNav('projects')}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-charcoal text-white text-[12px] uppercase tracking-[0.15em] font-medium hover:bg-accent hover:text-charcoal transition-all duration-300"
                >
                  View Projects
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] text-white text-[12px] uppercase tracking-[0.15em] font-medium hover:bg-[#1ebe5d] transition-all duration-300"
                >
                  <WhatsAppIcon size={14} />
                  Book a Call
                </a>
              </div>

              {/* Certifications mini badges */}
              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-steel">Certified:</span>
                <span className="px-2.5 py-1 border border-[#e8b100] text-[#c89a00] text-[9px] uppercase tracking-wider font-bold">
                  Tekla Steel Fundamentals
                </span>
                <span className="px-2.5 py-1 border border-[#2563eb] text-[#2563eb] text-[9px] uppercase tracking-wider font-bold">
                  AISC DTS
                </span>
              </div>
            </div>

            {/* Right - Hero Image (real Tekla model) */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full border-2 border-accent/20" />
                <img
                  src="/images/Project Photos/Multistoried Building.png"
                  alt="Tekla 3D Steel Structure Model — Multi-storied Building by Julkar Naeem"
                  className="w-full aspect-[4/3] object-contain bg-white relative z-10"
                />
                <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-4 py-3 border-l-2 border-accent">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-steel">Tekla Structures 2025</p>
                  <p className="text-sm font-semibold text-charcoal">Fabrication-Ready BIM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-steel-light">Scroll</span>
          <div className="w-[1px] h-8 bg-steel-lighter animate-pulse" />
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-accent border-y border-accent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '150+', label: 'Projects Delivered' },
              { value: '9+',   label: 'Years Experience' },
              { value: '4+',   label: 'Countries Served' },
              { value: '2025', label: 'Tekla Version' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-charcoal mb-1 font-mono">{item.value}</p>
                <p className="text-[11px] uppercase tracking-[0.15em] text-charcoal/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-2 tracking-tight">
                Featured Steel Projects
              </h2>
              <p className="text-steel text-sm mt-2">Real Tekla BIM models & shop drawings — click any project to explore</p>
            </div>
            <button
              onClick={() => handleNav('projects')}
              className="group flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-steel font-medium hover:text-charcoal transition-colors"
            >
              View All Projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <div
                key={project.id || i}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project as ProjectItem)}
              >
                <div className="overflow-hidden mb-5 bg-surface">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">
                  {project.category}
                </span>
                <h3 className="text-lg font-semibold text-charcoal mt-1 mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-steel leading-relaxed mb-4 line-clamp-2">
                  {project.desc}
                </p>
                {project.tonnage && project.tonnage !== '—' && (
                  <p className="text-[11px] uppercase tracking-wider text-steel mb-3">
                    Tonnage: <span className="text-charcoal font-semibold">{project.tonnage}</span>
                  </p>
                )}
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-charcoal font-medium group-hover:text-accent transition-colors">
                  View Project <ArrowRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT I DELIVER ─── */}
      <section className="bg-surface py-24 lg:py-32 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">Deliverables</span>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-2 tracking-tight">
              Fabrication-Ready Steel Detailing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Box size={28} />,
                title: 'Tekla BIM Models',
                desc: 'Accurate, coordinated 3D models built in Tekla Structures 2025 with proper material grades, profiles, bolt assemblies, and weld preparations — ready for fabrication extraction.',
              },
              {
                icon: <FileText size={28} />,
                title: 'Shop Drawings & GA Drawings',
                desc: 'Clean, organized general arrangement drawings and detailed shop drawings with dimensions, sections, material lists, and fabrication notes — clear enough for any workshop.',
              },
              {
                icon: <Link2 size={28} />,
                title: 'Connection Detailing',
                desc: 'Every joint, splice, base plate, and gusset detailed with full bolt patterns, weld symbols, and erection marks for seamless fabrication and erection.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 lg:p-10 border border-border hover:border-accent/30 transition-colors group">
                <div className="w-14 h-14 bg-surface flex items-center justify-center text-charcoal mb-6 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-charcoal mb-3">{item.title}</h3>
                <p className="text-sm text-steel leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES SNAPSHOT ─── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">What I Do</span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-2 tracking-tight">
                Services
              </h2>
            </div>
            <button
              onClick={() => handleNav('services')}
              className="group flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-steel font-medium hover:text-charcoal transition-colors"
            >
              All Services
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Wrench size={24} />, title: 'Structural Steel Detailing', desc: 'Complete detailing of structural steel members, assemblies, and connections using Tekla Structures.' },
              { icon: <Building2 size={24} />, title: 'PEB & Industrial Modeling', desc: 'Pre-engineered building frames, portal structures, and industrial steel modeling for fabrication.' },
              { icon: <ClipboardList size={24} />, title: 'Shop Drawing Production', desc: 'Fabrication-ready shop drawings with dimensions, bolt details, weld symbols, and material lists.' },
              { icon: <Link2 size={24} />, title: 'Steel Connection Detailing', desc: 'Moment connections, shear connections, base plates, splices, and bracing connections — fully detailed.' },
              { icon: <BarChart3 size={24} />, title: 'Material Take-Off / Reports', desc: 'Accurate material quantity reports, bolt lists, and assembly summaries extracted from the Tekla model.' },
              { icon: <Footprints size={24} />, title: 'Stairs, Platforms & Access', desc: 'Steel staircases, walkway platforms, handrails, ladders, and access structures — detailed for fabrication.' },
            ].map((svc, i) => (
              <div
                key={i}
                className="p-6 lg:p-8 border border-border hover:border-accent/30 bg-white group cursor-pointer transition-all"
                onClick={() => handleNav('services')}
              >
                <div className="text-steel group-hover:text-accent transition-colors mb-4">
                  {svc.icon}
                </div>
                <h3 className="text-base font-semibold text-charcoal mb-2">{svc.title}</h3>
                <p className="text-sm text-steel leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 tracking-tight">
              How I Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: '01', title: 'Review', desc: 'Review drawings and project scope' },
              { step: '02', title: 'Model', desc: 'Build coordinated Tekla BIM model' },
              { step: '03', title: 'Detail', desc: 'Detail connections and assemblies' },
              { step: '04', title: 'Produce', desc: 'Produce shop drawings and deliverables' },
              { step: '05', title: 'Support', desc: 'Revise and support fabrication clarity' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl font-bold text-accent/30 font-mono mb-3 group-hover:text-accent transition-colors">
                  {item.step}
                </div>
                <div className="w-full h-[1px] bg-white/10 mb-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-steel-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SNAPSHOT ─── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="border border-border bg-surface overflow-hidden shadow-md">
                <img
                  src="/images/julkar-naeem-working.png"
                  alt="Julkar Naeem - Steel Structure Detailer at Workstation"
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>
              {/* Certifications overlay */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 border border-border bg-surface">
                  <Award size={14} className="text-[#e8b100] flex-shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-steel">Tekla Certified</p>
                    <p className="text-[10px] font-semibold text-charcoal">Steel Fundamentals 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 border border-border bg-surface">
                  <Award size={14} className="text-[#2563eb] flex-shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-steel">AISC Certified</p>
                    <p className="text-[10px] font-semibold text-charcoal">Detailer Training Series</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">About</span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-2 mb-2 tracking-tight">
                Julkar Naeem
              </h2>
              <p className="text-steel text-sm mb-5 flex items-center gap-1.5">
                <MapPin size={12} className="text-accent" />
                Dhaka, Bangladesh · Remote delivery worldwide
              </p>
              <p className="text-lg text-steel leading-relaxed mb-6">
                Steel Structure Detailer with <strong className="text-charcoal">9+ years of experience</strong> specializing in Tekla Structures. I focus on clean, fabrication-oriented models and drawings that help fabricators execute with clarity.
              </p>
              <p className="text-sm text-steel leading-relaxed mb-8">
                With 150+ delivered projects across 4+ countries — from PEB warehouses to metro rail stations, spiral staircases to flyover support structures — I bring real-world fabrication understanding to every project.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Tekla Structures 2025 Expert',
                  'AISC & Tekla Certified Detailer',
                  '150+ Projects Delivered Worldwide',
                  'Sr. Detailer at SES Steel Structure Ltd.',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-accent flex-shrink-0" />
                    <span className="text-sm text-charcoal font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleNav('about')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 border border-charcoal text-charcoal text-[12px] uppercase tracking-[0.15em] font-medium hover:bg-charcoal hover:text-white transition-all duration-300"
              >
                Full Profile
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">Let's Work Together</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6 tracking-tight">
            Need Fabrication-Ready Steel Drawings?
          </h2>
          <p className="text-lg text-steel-light leading-relaxed mb-10 max-w-xl mx-auto">
            Let's turn your structural concept into an accurate Tekla model and clear shop drawing package — delivered remotely from Dhaka, Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNav('contact')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-charcoal text-[12px] uppercase tracking-[0.15em] font-semibold hover:bg-white hover:text-charcoal transition-all duration-300"
            >
              Start a Project
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white text-[12px] uppercase tracking-[0.15em] font-semibold hover:bg-[#1ebe5d] transition-all duration-300"
            >
              <WhatsAppIcon size={14} />
              WhatsApp Me
            </a>
          </div>
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
