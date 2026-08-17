import { useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Maximize2,
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
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const heroImages = Array.from(new Set([content.hero.heroImage, ...content.projects.map(p => p.img)]));

  const changeHeroImage = (newIndex: number) => {
    if (newIndex === currentHeroIndex || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentHeroIndex(newIndex);
      setIsFading(false);
    }, 200);
  };

  const handleNextHero = () => {
    changeHeroImage((currentHeroIndex + 1) % heroImages.length);
  };

  const handlePrevHero = () => {
    changeHeroImage((currentHeroIndex - 1 + heroImages.length) % heroImages.length);
  };

  // Auto-cycle hero image smoothly every 6 seconds if idle
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[92vh] flex items-center bg-white overflow-hidden cad-grid-light">
        {/* Subtle radial glow in background */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-28 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Headline & Bio */}
            <div className="order-2 lg:order-1 animate-fade-in-up">
              {/* Location badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded-full mb-5 shadow-xs">
                <MapPin size={13} className="text-accent flex-shrink-0" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-steel font-medium">
                  Dhaka, Bangladesh · Remote Worldwide
                </span>
                <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-ping ml-1" />
              </div>

              {/* Subtitle Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-steel font-semibold">
                  {content.hero.badge}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-charcoal leading-[1.1] tracking-tight mb-6">
                {content.hero.headlineLine1}
                <br />
                <span className="text-steel font-bold">
                  {content.hero.headlineLine2}
                </span>
                <br />
                <span className="text-charcoal bg-gradient-to-r from-charcoal via-charcoal to-accent/80 bg-clip-text">
                  {content.hero.headlineLine3}
                </span>
              </h1>

              {/* Subtitle paragraph */}
              <p className="text-base sm:text-lg text-steel leading-relaxed max-w-lg mb-6">
                {content.hero.subtitle}
              </p>

              {/* Stats inline */}
              <div className="flex items-center gap-6 mb-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_8px_rgba(232,177,0,0.8)]" />
                  <span className="text-sm font-semibold text-charcoal tracking-wide">150+ Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_8px_rgba(232,177,0,0.8)]" />
                  <span className="text-sm font-semibold text-charcoal tracking-wide">9+ Years</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_8px_rgba(232,177,0,0.8)]" />
                  <span className="text-sm font-semibold text-charcoal tracking-wide">4+ Countries</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleNav('projects')}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-white text-[12px] uppercase tracking-[0.16em] font-semibold btn-tactile-dark shadow-lg hover:bg-accent hover:text-charcoal transition-all duration-300"
                >
                  View Projects
                  <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] text-white text-[12px] uppercase tracking-[0.16em] font-semibold btn-tactile shadow-lg hover:bg-[#1ebe5d] transition-all duration-300"
                >
                  <WhatsAppIcon size={16} />
                  Book a Call
                </a>
              </div>

              {/* Certifications mini badges */}
              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-steel font-mono">Certified:</span>
                <span className="px-3 py-1 border border-[#e8b100]/60 bg-[#e8b100]/5 text-[#c89a00] text-[9px] uppercase tracking-widest font-bold shadow-xs hover:scale-105 transition-transform">
                  Tekla Steel Fundamentals
                </span>
                <span className="px-3 py-1 border border-[#2563eb]/60 bg-[#2563eb]/5 text-[#2563eb] text-[9px] uppercase tracking-widest font-bold shadow-xs hover:scale-105 transition-transform">
                  AISC DTS
                </span>
              </div>

              {/* Software Toolkit Mini Strip */}
              <div className="mt-5 pt-4 border-t border-border/70 flex items-center gap-3 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-steel font-mono">Toolkit:</span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white border border-border p-1 flex items-center justify-center shadow-xs hover:border-accent hover:scale-110 transition-all rounded-xs cursor-pointer" title="Tekla Structures 2025">
                    <img src="/images/icons/tekla.jpg" alt="Tekla Structures" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-8 h-8 bg-white border border-border p-1 flex items-center justify-center shadow-xs hover:border-accent hover:scale-110 transition-all rounded-xs cursor-pointer" title="Autodesk AutoCAD">
                    <img src="/images/icons/autocad.jpg" alt="AutoCAD" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-8 h-8 bg-white border border-border p-1 flex items-center justify-center shadow-xs hover:border-accent hover:scale-110 transition-all rounded-xs cursor-pointer" title="Autodesk Revit">
                    <img src="/images/icons/ravit.png" alt="Revit" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-8 h-8 bg-white border border-border p-1 flex items-center justify-center shadow-xs hover:border-accent hover:scale-110 transition-all rounded-xs cursor-pointer" title="Bentley STAAD.Pro">
                    <img src="/images/icons/staad-pro.jpg" alt="STAAD.Pro" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image Carousel with CAD Precision Frame */}
            <div className="order-1 lg:order-2">
              <div className="relative group">
                
                {/* CAD Technical Crosses in corners */}
                <div className="absolute -top-3 -left-3 text-accent font-mono text-xs z-30 pointer-events-none select-none font-bold">+</div>
                <div className="absolute -top-3 -right-3 text-accent font-mono text-xs z-30 pointer-events-none select-none font-bold">+</div>
                <div className="absolute -bottom-3 -left-3 text-accent font-mono text-xs z-30 pointer-events-none select-none font-bold">+</div>
                <div className="absolute -bottom-3 -right-3 text-accent font-mono text-xs z-30 pointer-events-none select-none font-bold">+</div>

                {/* Decorative border frame */}
                <div className="absolute -top-3 -right-3 w-full h-full border border-accent/30 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />

                {/* Main Image Container */}
                <div className="relative z-10 bg-white border border-border shadow-2xl overflow-hidden aspect-[4/3] flex items-center justify-center transition-all duration-500 ease-out group-hover:shadow-[0_20px_50px_rgba(232,177,0,0.15)] group-hover:border-accent/50">
                  
                  {/* Active Carousel Image */}
                  <img
                    src={heroImages[currentHeroIndex]}
                    alt="Tekla 3D Steel Structure Model by Julkar Naeem"
                    loading="eager"
                    decoding="async"
                    className={`w-full h-full object-contain p-3 transition-all duration-300 ${
                      isFading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
                    }`}
                  />

                  {/* Left & Right Navigation Arrows */}
                  <button 
                    onClick={handlePrevHero} 
                    aria-label="Previous structure photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-charcoal transition-all duration-200 shadow-xl z-30 cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={handleNextHero} 
                    aria-label="Next structure photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-charcoal transition-all duration-200 shadow-xl z-30 cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Technical Badge Overlay */}
                  <div className="absolute bottom-4 left-4 z-20 bg-charcoal/90 backdrop-blur-md px-4 py-2.5 border-l-3 border-accent text-white shadow-xl flex items-center gap-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-accent font-mono font-bold">
                        {content.hero.softwareBadgeTitle || 'Tekla Structures 2025'}
                      </p>
                      <p className="text-xs font-semibold text-white tracking-wide">
                        {content.hero.softwareBadgeSub || 'Fabrication-Ready BIM'}
                      </p>
                    </div>
                  </div>

                  {/* Slide Counter & Indicators */}
                  <div className="absolute top-4 right-4 z-20 bg-charcoal/90 text-white text-[10px] uppercase font-mono px-3 py-1 font-bold border border-white/10 flex items-center gap-2">
                    <span className="text-accent">{String(currentHeroIndex + 1).padStart(2, '0')}</span>
                    <span className="text-white/40">/</span>
                    <span>{String(heroImages.length).padStart(2, '0')}</span>
                  </div>

                  {/* Thumbnail Dots */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-charcoal/70 px-2 py-1.5 backdrop-blur-xs">
                    {heroImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => changeHeroImage(idx)}
                        aria-label={`Jump to image ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentHeroIndex === idx ? 'w-5 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[9px] uppercase tracking-[0.3em] text-steel font-mono">Explore</span>
          <div className="w-[1px] h-6 bg-accent animate-pulse" />
        </div>
      </section>

      {/* ─── TRUST STATS BAR ─── */}
      <section className="bg-charcoal text-white border-y border-white/10 relative overflow-hidden cad-grid-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-9">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '150+', label: 'Projects Delivered', desc: 'BIM & Shop Drawings' },
              { value: '9+',   label: 'Years Experience',   desc: 'Tekla Detailing' },
              { value: '4+',   label: 'Countries Served',   desc: 'Worldwide Clients' },
              { value: '2025', label: 'Tekla Version',      desc: 'Latest Standards' },
            ].map((item, i) => (
              <div key={i} className="text-center group transition-transform duration-300 hover:scale-105">
                <p className="text-3xl md:text-4xl font-extrabold text-accent mb-1 font-mono tracking-tight group-hover:drop-shadow-[0_0_12px_rgba(232,177,0,0.5)] transition-all">
                  {item.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white font-semibold">{item.label}</p>
                <p className="text-[10px] text-steel-lighter/60 font-mono mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-accent" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">Portfolio & Drawings</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                Featured Steel Projects
              </h2>
              <p className="text-steel text-sm sm:text-base mt-2 max-w-xl">
                Real Tekla Structures BIM models, shop drawings, and erected structural steelwork. Click any project to inspect the full gallery and drawing details.
              </p>
            </div>
            <button
              onClick={() => handleNav('projects')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-white text-[11px] uppercase tracking-[0.18em] font-semibold btn-tactile-dark hover:bg-accent hover:text-charcoal transition-all self-start md:self-auto shadow-md"
            >
              View All {content.projects.length} Projects
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.projects.map((project, i) => (
              <div
                key={project.id || i}
                className="group cursor-pointer bg-white border border-border hover:border-accent hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cad-corner-box hover:-translate-y-1"
                onClick={() => setSelectedProject(project as ProjectItem)}
              >
                <div>
                  {/* Image Container / Blueprint Viewport */}
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

                    {/* Gallery Count Badge */}
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
                    <p className="text-sm text-steel leading-relaxed line-clamp-2 mb-4">
                      {project.desc}
                    </p>

                    {/* Deliverables Tags */}
                    {project.deliverables && project.deliverables.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                        {project.deliverables.slice(0, 3).map((deliv, dIdx) => (
                          <span
                            key={dIdx}
                            className="text-[10px] uppercase tracking-wider text-charcoal/70 bg-surface px-2 py-0.5 border border-border"
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

      {/* ─── WHAT I DELIVER (Deliverables) ─── */}
      <section className="bg-surface py-24 lg:py-32 border-y border-border relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">Deliverables</span>
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
              <div 
                key={i} 
                className="bg-white p-8 lg:p-10 border border-border hover:border-accent hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 cad-corner-box"
              >
                <div className="w-14 h-14 bg-surface border border-border flex items-center justify-center text-charcoal mb-6 group-hover:bg-accent group-hover:text-charcoal group-hover:border-accent transition-all duration-300 shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-3 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-sm text-steel leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES & PROJECT CATALOG SNAPSHOT ─── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">Service Catalog & Packages</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2 tracking-tight">
                Project Catalog & Tiered Offerings
              </h2>
              <p className="text-steel text-sm sm:text-base mt-2 max-w-xl">
                Structured like an Upwork Project Catalog — choose from Starter, Standard, or Advanced structural detailing tiers with clear turnaround times.
              </p>
            </div>
            <button
              onClick={() => handleNav('services')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-white text-[11px] uppercase tracking-[0.18em] font-bold btn-tactile-dark hover:bg-accent hover:text-charcoal transition-all self-start md:self-auto shadow-md cursor-pointer"
            >
              Explore Full Catalog & Tiers
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Upwork Style 3-Tier Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                tier: 'Starter Scope',
                badge: 'Quick Turnaround',
                delivery: '2 Days Delivery',
                scope: 'Stairs, Small Platforms & Single Parts (Up to 5 Tons)',
                desc: '1–4 Shop drawings, single-part fitting details, and basic material summary.',
              },
              {
                tier: 'Standard Scope',
                badge: 'Most Popular',
                delivery: '4 Days Delivery',
                scope: 'PEB Sheds & Industrial Frames (Up to 25 Tons)',
                desc: 'Complete LOD 400 Tekla model, GA erection plans, assembly shop drawings, NC/DSTV files, and BOM.',
                featured: true,
              },
              {
                tier: 'Advanced Scope',
                badge: 'Full Detailing Suite',
                delivery: '7–10 Days Delivery',
                scope: 'Multi-Storey, Heavy Plants & Infrastructure (Up to 100+ Tons)',
                desc: 'End-to-end BIM coordination, full drawing package, clash detection, anchor bolt plans, and bolt schedules.',
              },
            ].map((pkg, pIdx) => (
              <div
                key={pIdx}
                className={`p-7 border transition-all duration-300 flex flex-col justify-between cad-corner-box ${
                  pkg.featured
                    ? 'bg-charcoal text-white border-accent shadow-2xl scale-102 hover:shadow-[0_15px_40px_rgba(232,177,0,0.2)]'
                    : 'bg-surface text-charcoal border-border hover:border-accent hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 ${
                      pkg.featured ? 'bg-accent text-charcoal' : 'bg-white text-accent border border-border'
                    }`}>
                      {pkg.badge}
                    </span>
                    <span className={`text-xs font-mono font-semibold ${pkg.featured ? 'text-accent' : 'text-steel'}`}>
                      {pkg.delivery}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{pkg.tier}</h3>
                  <p className={`text-xs font-mono font-semibold mb-4 ${pkg.featured ? 'text-steel-lighter' : 'text-steel'}`}>
                    {pkg.scope}
                  </p>
                  <p className={`text-sm leading-relaxed mb-6 ${pkg.featured ? 'text-steel-light' : 'text-steel'}`}>
                    {pkg.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleNav('services')}
                  className={`w-full py-3 text-[11px] uppercase tracking-[0.16em] font-bold transition-all text-center cursor-pointer ${
                    pkg.featured
                      ? 'bg-accent text-charcoal hover:bg-white hover:text-charcoal'
                      : 'bg-white border border-border text-charcoal hover:bg-charcoal hover:text-white'
                  }`}
                >
                  View Package Details →
                </button>
              </div>
            ))}
          </div>

          {/* Quick Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Wrench size={22} />, title: 'Structural Steel Detailing', desc: 'Complete detailing of structural steel members, assemblies, and connections using Tekla Structures.' },
              { icon: <Building2 size={22} />, title: 'PEB & Industrial Modeling', desc: 'Pre-engineered building frames, portal structures, and industrial steel modeling for fabrication.' },
              { icon: <ClipboardList size={22} />, title: 'Shop Drawing Production', desc: 'Fabrication-ready shop drawings with dimensions, bolt details, weld symbols, and material lists.' },
              { icon: <Link2 size={22} />, title: 'Steel Connection Detailing', desc: 'Moment connections, shear connections, base plates, splices, and bracing connections — fully detailed.' },
              { icon: <BarChart3 size={22} />, title: 'Material Take-Off / Reports', desc: 'Accurate material quantity reports, bolt lists, and assembly summaries extracted from the Tekla model.' },
              { icon: <Footprints size={22} />, title: 'Stairs, Platforms & Access', desc: 'Steel staircases, walkway platforms, handrails, ladders, and access structures — detailed for fabrication.' },
            ].map((svc, i) => (
              <div
                key={i}
                className="p-6 border border-border hover:border-accent hover:shadow-lg bg-surface group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleNav('services')}
              >
                <div className="text-steel group-hover:text-accent transition-colors duration-300 mb-3">
                  {svc.icon}
                </div>
                <h3 className="text-base font-bold text-charcoal mb-1.5 group-hover:text-accent transition-colors">{svc.title}</h3>
                <p className="text-xs text-steel leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── PROCESS TIMELINE ─── */}
      <section className="bg-charcoal text-white py-24 lg:py-32 relative overflow-hidden cad-grid-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">Workflow</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 tracking-tight">
              Precision Detailing Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: '01', title: 'Review', desc: 'Review architectural/structural drawings and scope' },
              { step: '02', title: 'Model', desc: 'Build coordinated LOD 400 Tekla BIM model' },
              { step: '03', title: 'Detail', desc: 'Detail joints, connections, and assembly marks' },
              { step: '04', title: 'Produce', desc: 'Generate shop drawings, GA plans, and BOM reports' },
              { step: '05', title: 'Support', desc: 'Revise and clarify for seamless shop floor erection' },
            ].map((item, i) => (
              <div key={i} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-extrabold text-accent/40 font-mono mb-3 group-hover:text-accent transition-colors duration-300">
                  {item.step}
                </div>
                <div className="w-full h-[1px] bg-white/10 mb-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_8px_rgba(232,177,0,0.8)]" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-steel-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SNAPSHOT ─── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="border border-border bg-surface overflow-hidden shadow-xl transition-all duration-300 group-hover:border-accent">
                <img
                  src="/images/julkar-naeem-working.png"
                  alt="Julkar Naeem - Steel Structure Detailer at Workstation"
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>
              
              {/* Certifications overlay */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 p-3.5 border border-border bg-surface shadow-xs hover:border-[#e8b100] transition-colors">
                  <Award size={16} className="text-[#e8b100] flex-shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-steel font-mono font-medium">Tekla Certified</p>
                    <p className="text-[10px] font-bold text-charcoal">Steel Fundamentals 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 border border-border bg-surface shadow-xs hover:border-[#2563eb] transition-colors">
                  <Award size={16} className="text-[#2563eb] flex-shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-steel font-mono font-medium">AISC Certified</p>
                    <p className="text-[10px] font-bold text-charcoal">Detailer Training Series</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">About Detailer</span>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-2 mb-2 tracking-tight">
                Julkar Naeem
              </h2>
              <p className="text-steel text-sm mb-5 flex items-center gap-1.5">
                <MapPin size={13} className="text-accent" />
                Dhaka, Bangladesh · Remote delivery worldwide
              </p>
              <p className="text-base sm:text-lg text-steel leading-relaxed mb-6">
                Steel Structure Detailer with <strong className="text-charcoal font-bold">9+ years of experience</strong> specializing in Tekla Structures. I focus on clean, fabrication-oriented models and drawings that help fabricators execute with clarity.
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
                className="group inline-flex items-center gap-2 px-8 py-3.5 border-2 border-charcoal text-charcoal text-[11px] uppercase tracking-[0.18em] font-bold btn-tactile-dark hover:bg-charcoal hover:text-white transition-all duration-300"
              >
                Full Profile
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CALL TO ACTION ─── */}
      <section className="bg-charcoal py-24 lg:py-32 text-white relative overflow-hidden cad-grid-dark border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">Let's Work Together</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-6 tracking-tight">
            Need Fabrication-Ready Steel Drawings?
          </h2>
          <p className="text-base sm:text-lg text-steel-light leading-relaxed mb-10 max-w-xl mx-auto">
            Let's turn your structural concept into an accurate Tekla model and clear shop drawing package — delivered remotely from Dhaka, Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNav('contact')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-charcoal text-[12px] uppercase tracking-[0.16em] font-bold btn-tactile shadow-xl hover:bg-white hover:text-charcoal transition-all duration-300"
            >
              Start a Project
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] text-white text-[12px] uppercase tracking-[0.16em] font-bold btn-tactile shadow-xl hover:bg-[#1ebe5d] transition-all duration-300"
            >
              <WhatsAppIcon size={16} />
              WhatsApp Me
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => handleNav('contact')}
      />
    </>
  );
}
