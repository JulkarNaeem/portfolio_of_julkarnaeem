import { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  X,
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Mail,
  MapPin,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/SocialIcons';
import ProjectModal, { ProjectItem } from '../components/ProjectModal';
import { portfolioData } from '../data/portfolioData';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const WA_LINK = 'https://wa.me/8801739411586?text=Hi%20Julkar!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.';

export default function HomePage({ onNavigate }: HomePageProps) {
  const content = portfolioData;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const heroImages = Array.from(new Set([content.hero.heroImage, ...content.projects.map((p) => p.img)]));

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

  // Select top 6 projects for the streamlined home showcase
  const featuredProjects = content.projects.slice(0, 6);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          1. HERO SECTION (FULL-WIDTH BANNER ON TOP)
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden cad-grid-light pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-24">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-steel-blue/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          
          {/* ══════════════════════════════════════════════════════
              A. FULL-WIDTH PANORAMIC TEKLA 3D MODEL & DRAWING BANNER (ON TOP)
              ══════════════════════════════════════════════════════ */}
          <div className="w-full mb-12 sm:mb-16 animate-fade-in-up">
            <div className="relative group">
              
              {/* Main Widescreen Panoramic Image Container */}
              <div className="relative z-10 bg-[#f8fafc] border border-border rounded-2xl shadow-xl overflow-hidden h-[340px] sm:h-[480px] lg:h-[580px] flex items-center justify-center transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:border-steel-blue/40">
                
                {/* Active Panoramic Image */}
                <img
                  src={heroImages[currentHeroIndex]}
                  alt="Tekla 3D Steel Structure Model by Julkar Naeem"
                  loading="eager"
                  decoding="async"
                  className={`w-full h-full object-contain p-4 sm:p-6 transition-all duration-500 ${
                    isFading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
                  }`}
                />

                {/* Left & Right Large Navigation Arrows */}
                <button 
                  onClick={handlePrevHero} 
                  aria-label="Previous structure photo"
                  className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 bg-charcoal/90 text-white rounded-full flex items-center justify-center opacity-75 group-hover:opacity-100 hover:bg-safety-yellow hover:text-charcoal transition-all duration-200 shadow-2xl z-30 cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNextHero} 
                  aria-label="Next structure photo"
                  className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 bg-charcoal/90 text-white rounded-full flex items-center justify-center opacity-75 group-hover:opacity-100 hover:bg-safety-yellow hover:text-charcoal transition-all duration-200 shadow-2xl z-30 cursor-pointer"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Technical Software Badge Overlay */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 bg-charcoal/95 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 border-l-4 border-safety-yellow text-white shadow-2xl">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-safety-yellow font-mono font-bold">
                    {content.hero.softwareBadgeTitle || 'Tekla Structures 2025'}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                    {content.hero.softwareBadgeSub || 'Fabrication-Ready BIM'}
                  </p>
                </div>

                {/* Slide Counter */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 bg-charcoal/95 text-white text-[11px] uppercase font-mono px-3.5 py-1.5 font-bold border border-white/15 flex items-center gap-2 shadow-xl">
                  <span className="text-safety-yellow">{String(currentHeroIndex + 1).padStart(2, '0')}</span>
                  <span className="text-white/40">/</span>
                  <span>{String(heroImages.length).padStart(2, '0')}</span>
                </div>

                {/* Thumbnail Dots */}
                <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 flex items-center gap-2 bg-charcoal/85 px-3 py-2 backdrop-blur-sm border border-white/10">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => changeHeroImage(idx)}
                      aria-label={`Jump to image ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentHeroIndex === idx ? 'w-6 bg-safety-yellow' : 'w-2 bg-white/40 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              B. HEADLINE, POSITIONING & CTA BLOCK
              ══════════════════════════════════════════════════════ */}
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface border border-border rounded-full mb-6 shadow-xs">
              <MapPin size={13} className="text-steel-blue flex-shrink-0" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-charcoal/80 font-medium font-mono">
                Dhaka, Bangladesh · Remote Worldwide (UTC +6)
              </span>
              <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-ping ml-1" />
            </div>

            {/* Subtitle Badge */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-safety-yellow" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-steel-blue font-bold">
                {content.hero.badge}
              </span>
              <span className="w-8 h-[2px] bg-safety-yellow" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-charcoal leading-[1.12] tracking-tight mb-6">
              {content.hero.headlineLine1}{' '}
              <span className="text-steel-blue font-extrabold">
                {content.hero.headlineLine2}
              </span>{' '}
              <span className="text-charcoal bg-gradient-to-r from-charcoal via-charcoal to-steel-blue/90 bg-clip-text">
                {content.hero.headlineLine3}
              </span>
            </h1>

            {/* Subtitle paragraph */}
            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-2xl mx-auto mb-8">
              {content.hero.subtitle}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center flex-wrap mb-8">
              <button
                onClick={() => handleNav('projects')}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-safety-yellow text-charcoal text-[12px] uppercase tracking-[0.16em] font-bold btn-tactile shadow-lg hover:bg-steel-blue hover:text-white transition-all duration-300 cursor-pointer"
              >
                View Steel Projects
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-steel-blue text-white text-[12px] uppercase tracking-[0.16em] font-semibold btn-tactile shadow-md hover:bg-charcoal transition-all duration-300 cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-safety-yellow group-hover:scale-110 transition-all">
                  <Play size={10} className="fill-white text-white group-hover:fill-charcoal group-hover:text-charcoal ml-0.5" />
                </span>
                Watch Video Intro
              </button>
            </div>

            {/* Certifications & Toolkit strip */}
            <div className="pt-6 border-t border-border/70 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-[10px] uppercase tracking-wider text-charcoal/70 font-mono">Certified:</span>
                <span className="px-3 py-1 border border-steel-blue/30 bg-surface text-steel-blue text-[9px] uppercase tracking-wider font-bold shadow-xs">
                  Trimble Tekla 2025
                </span>
                <span className="px-3 py-1 border border-steel-blue/30 bg-surface text-steel-blue text-[9px] uppercase tracking-wider font-bold shadow-xs">
                  AISC Detailer Series
                </span>
              </div>
              
              <div className="h-4 w-[1px] bg-border hidden sm:block" />

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-charcoal/70 font-mono">Toolkit:</span>
                <div className="w-7 h-7 bg-white border border-border p-1 flex items-center justify-center shadow-xs rounded-xs" title="Tekla Structures 2025">
                  <img src="/images/icons/tekla.jpg" alt="Tekla" className="w-full h-full object-contain" />
                </div>
                <div className="w-7 h-7 bg-white border border-border p-1 flex items-center justify-center shadow-xs rounded-xs" title="AutoCAD 2D">
                  <img src="/images/icons/autocad.jpg" alt="AutoCAD" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. INTERNATIONAL ENGINEERING STANDARDS & TRUST STRIP
          ══════════════════════════════════════════════════════ */}
      <section className="bg-charcoal text-white border-y border-white/10 relative overflow-hidden cad-grid-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-safety-yellow font-bold font-mono">
                Global Code Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
                Steel Detailing for USA, Canada, Australia &amp; Bangladesh
              </h2>
            </div>
            <p className="text-xs font-mono text-[#F3F4F6]/75 bg-white/5 border border-white/10 px-3 py-1.5 self-start md:self-auto">
              Imperial (ft-in) &amp; Metric (mm) Dual Capability
            </p>
          </div>

          {/* 4-Country Regional Standards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            
            {/* USA */}
            <div className="p-5 bg-white/5 border border-white/10 hover:border-safety-yellow/60 transition-all duration-300 cad-corner-box group">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xl">🇺🇸</span>
                <span className="px-2 py-0.5 bg-safety-yellow/15 border border-safety-yellow/40 text-safety-yellow text-[9px] uppercase font-mono font-bold">
                  United States
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-safety-yellow transition-colors mb-1">
                AISC 303 &amp; 360 Standards
              </h3>
              <p className="text-xs text-[#F3F4F6]/80 leading-relaxed font-sans mb-3">
                Imperial (ft-in) dimensions, AWS D1.1 structural welding symbols, and OSHA compliant erection plans.
              </p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-steel-blue-light">
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">AISC DTS</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Imperial ft-in</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">DSTV/NC1</span>
              </div>
            </div>

            {/* Canada */}
            <div className="p-5 bg-white/5 border border-white/10 hover:border-safety-yellow/60 transition-all duration-300 cad-corner-box group">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xl">🇨🇦</span>
                <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-white text-[9px] uppercase font-mono font-bold">
                  Canada
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-safety-yellow transition-colors mb-1">
                CISC &amp; CSA S16 Practice
              </h3>
              <p className="text-xs text-[#F3F4F6]/80 leading-relaxed font-sans mb-3">
                Dual Imperial &amp; Metric drawings, cold-climate PEB framing, and heavy snow/wind load details.
              </p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-steel-blue-light">
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">CISC Practice</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Dual Units</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">CSA S16</span>
              </div>
            </div>

            {/* Australia */}
            <div className="p-5 bg-white/5 border border-white/10 hover:border-safety-yellow/60 transition-all duration-300 cad-corner-box group">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xl">🇦🇺</span>
                <span className="px-2 py-0.5 bg-safety-yellow/15 border border-safety-yellow/40 text-safety-yellow text-[9px] uppercase font-mono font-bold">
                  Australia &amp; NZ
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-safety-yellow transition-colors mb-1">
                AS 4100 &amp; AS/NZS 5131
              </h3>
              <p className="text-xs text-[#F3F4F6]/80 leading-relaxed font-sans mb-3">
                AS/NZS 1554 welding symbols, ASI guidelines, and real-time 2–4 hr daily timezone overlap with Dhaka.
              </p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-steel-blue-light">
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">AS 4100</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">AS/NZS 5131</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">AEST/AWST</span>
              </div>
            </div>

            {/* Bangladesh */}
            <div className="p-5 bg-white/5 border border-white/10 hover:border-safety-yellow/60 transition-all duration-300 cad-corner-box group">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xl">🇧🇩</span>
                <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-[#22c55e] text-[9px] uppercase font-mono font-bold">
                  Bangladesh
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-safety-yellow transition-colors mb-1">
                BNBC &amp; PEB Detailing
              </h3>
              <p className="text-xs text-[#F3F4F6]/80 leading-relaxed font-sans mb-3">
                Pre-engineered sheds, multi-storey framing, curved rafters, and direct in-person/phone coordination.
              </p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-steel-blue-light">
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">BNBC Code</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">PEB Sheds</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Local Support</span>
              </div>
            </div>

          </div>

          {/* Machine-Ready Deliverables Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#F3F4F6]/80">
            <span className="flex items-center gap-2 text-white font-bold">
              <span className="w-2 h-2 rounded-full bg-safety-yellow" />
              Standard Machine-Ready Deliverables:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 bg-white/5 border border-white/15">Tekla 3D (.db1 / .ifc)</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/15">AutoCAD (.dwg)</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/15">DSTV / NC1 (CNC Beam Lines)</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/15">BOM &amp; KISS Reports</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/15">3D PDF Visuals</span>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. FEATURED STEEL PROJECTS (IMMEDIATE VISUAL PROOF)
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-safety-yellow" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-steel-blue font-bold">
                  Portfolio Showcase
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal tracking-tight">
                Featured Steel Projects
              </h2>
              <p className="text-charcoal/80 text-sm sm:text-base mt-2 max-w-2xl">
                Coordinated Tekla 3D BIM models, fabrication shop drawings, and connection detail packages delivered for steel fabricators.
              </p>
            </div>
            
            <button
              onClick={() => handleNav('projects')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-white text-[11px] uppercase tracking-[0.18em] font-bold btn-tactile-dark hover:bg-steel-blue hover:text-white transition-all self-start md:self-auto shadow-md cursor-pointer"
            >
              View All {content.projects.length} Projects
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Project Cards Grid (Top 6) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <div
                key={project.id || i}
                className="group cursor-pointer bg-white border border-border hover:border-steel-blue hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cad-corner-box hover:-translate-y-1"
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
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <span className="px-4 py-2 bg-safety-yellow text-charcoal font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 size={13} /> View Drawings
                      </span>
                    </div>

                    {/* Tonnage Badge */}
                    {project.tonnage && project.tonnage !== '—' && (
                      <div className="absolute top-3 right-3 bg-charcoal/90 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 font-mono font-bold shadow-md border border-white/10">
                        {project.tonnage}
                      </div>
                    )}

                    {/* Gallery Badge */}
                    {project.gallery && project.gallery.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-safety-yellow text-charcoal text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold shadow-md flex items-center gap-1">
                        <span>📷 {project.gallery.length} Images</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-steel-blue font-bold">
                        {project.category}
                      </span>
                      {project.software && (
                        <span className="text-[9px] uppercase tracking-wider text-steel-blue bg-surface border border-border px-2 py-0.5 font-mono font-semibold">
                          {typeof project.software === 'string' ? project.software.split(' ')[0] : 'Tekla'}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-charcoal mb-2 group-hover:text-steel-blue transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-charcoal/75 leading-relaxed line-clamp-2 mb-4">
                      {project.desc}
                    </p>

                    {/* Deliverables Tags */}
                    {project.deliverables && project.deliverables.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                        {project.deliverables.slice(0, 3).map((deliv) => (
                          <span
                            key={deliv}
                            className="text-[10px] uppercase tracking-wider text-charcoal/80 bg-surface px-2 py-0.5 border border-border font-medium"
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
                  <span className="text-[11px] uppercase tracking-[0.15em] text-charcoal font-bold group-hover:text-steel-blue transition-colors flex items-center gap-1.5">
                    View Drawings <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <span className="text-xs text-steel-blue/60 font-mono font-semibold">#0{i + 1}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. VIDEO SHOWCASE, QA CHECKS & MUTUAL NDA PROTECTION
          ══════════════════════════════════════════════════════ */}
      <section className="bg-charcoal text-white py-20 lg:py-24 relative overflow-hidden cad-grid-dark border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Video Cinema Player (6 Cols) */}
            <div className="lg:col-span-6 w-full space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-safety-yellow border border-safety-yellow/30 text-[10px] uppercase font-mono font-bold tracking-widest shadow-xs">
                <span className="w-2 h-2 rounded-full bg-clash-red animate-pulse" /> 1-Minute Introduction
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Meet Julkar Naeem | Tekla Specialist
              </h2>
              
              <div className="relative bg-black border-2 border-white/20 p-2 shadow-2xl cad-corner-box">
                <div className="relative w-full aspect-video overflow-hidden bg-black rounded-xs">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/Uy2WJKxm-qk?rel=0"
                    title="Steel Structure Detailer intro of Julkar Naeem"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* Right: Quality Checks & NDA Callout (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-safety-yellow font-bold block mb-2">
                  Shop Floor Quality Standard
                </span>
                <h3 className="text-2xl font-extrabold text-white leading-snug">
                  How I verify models before drawings leave my desk:
                </h3>
              </div>

              <ul className="space-y-3">
                {[
                  'Can it be cut, drilled, and fitted accurately in the shop?',
                  'Is there full weld torch and bolt wrench clearance?',
                  'Are part marks and assembly numbers automated & clean?',
                  'Are 3D collision and interference tests 100% resolved?',
                  'Can the members be safely transported and erected on site?',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#F3F4F6]">
                    <CheckCircle2 size={16} className="text-safety-yellow flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* RFI Protocol Note */}
              <div className="p-4 bg-white/5 border border-white/10 text-xs text-[#F3F4F6]/80 leading-relaxed font-mono">
                <strong className="text-safety-yellow">RFI Protocol:</strong> If design information is missing or conflicting, I issue clear, marked-up RFIs immediately. No guessing on structural dimensions.
              </div>

              {/* NDA Protection Card */}
              <div className="p-5 bg-white/10 border border-safety-yellow/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={22} className="text-safety-yellow flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Mutual NDA Guarantee</h4>
                    <p className="text-xs text-[#F3F4F6]/75">
                      Ready to sign standard NDAs before reviewing your CAD drawings.
                    </p>
                  </div>
                </div>

                <a
                  href={`${WA_LINK}&text=Hi%20Julkar!%20I%20have%20a%20project%20and%20would%20like%20to%20request%20an%20NDA%20before%20sending%20drawings.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-safety-yellow text-charcoal hover:bg-steel-blue hover:text-white text-[11px] uppercase tracking-wider font-bold transition-all whitespace-nowrap shadow-md"
                >
                  Request NDA
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SOCIAL PROOF & VERIFIED CLIENT REVIEWS
          ══════════════════════════════════════════════════════ */}
      <section className="bg-surface py-20 lg:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-safety-yellow" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-steel-blue font-bold font-mono">
                  Verified Social Proof
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal tracking-tight">
                Trusted by Fabricators &amp; Engineers Worldwide
              </h2>
              <p className="text-charcoal/80 text-sm sm:text-base mt-2 max-w-xl">
                150+ successful projects delivered with zero fit-up clashes and 100% on-time milestone records.
              </p>
            </div>

            {/* Overall Rating Pill */}
            <div className="p-4 bg-white border border-border flex items-center gap-4 self-start md:self-auto shadow-xs">
              <div className="text-center">
                <div className="text-2xl font-mono font-extrabold text-charcoal leading-none">5.0</div>
                <div className="flex items-center gap-0.5 text-safety-yellow mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
              </div>
              <div className="h-8 w-[1px] bg-border" />
              <div className="text-xs font-mono text-charcoal/80">
                <p className="font-bold text-charcoal">150+ Projects</p>
                <p className="text-[11px] text-charcoal/60">100% Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                quote: 'Naeem has an excellent understanding of AutoCAD and also possesses strong computer knowledge. He has experience creating 3D models and designs, making detailed drawings, and troubleshooting any issues. He is a great problem solver who can quickly identify issues and provide solutions, and he communicates effectively.',
                author: 'Nahid Hossain',
                role: 'Graphic Designer',
                location: 'Professional Colleague',
                tag: 'AutoCAD, 3D Models & Problem Solving',
              },
              {
                quote: 'Julkar is an absolute master in Tekla Structures. The drawings for our 85-ton curved industrial shed were delivered ahead of schedule with zero fit-up errors on the shop floor.',
                author: 'David M.',
                role: 'Steel Fabricator & Contractor',
                location: 'Houston, Texas, USA',
                tag: 'PEB Industrial Shed (85 Tons)',
              },
              {
                quote: 'Complete LOD 400 models with CNC DSTV files made our plasma cutter beam line run flawlessly. Highly communicative and immediately addressed all connection markups.',
                author: 'Alastair R.',
                role: 'Operations & Engineering Manager',
                location: 'Birmingham, United Kingdom',
                tag: 'Multi-Storey Steel Frame (280 Tons)',
              },
            ].map((review, rIdx) => (
              <div
                key={rIdx}
                className="p-7 bg-white border border-border hover:border-steel-blue transition-all duration-300 flex flex-col justify-between cad-corner-box group hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-safety-yellow">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <Quote size={20} className="text-steel-blue/20 group-hover:text-steel-blue/50 transition-colors" />
                  </div>
                  <p className="text-sm text-charcoal/85 leading-relaxed italic mb-6">
                    "{review.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <span className="inline-block text-[9px] uppercase font-mono text-steel-blue font-bold mb-1">
                    {review.tag}
                  </span>
                  <p className="font-bold text-charcoal text-sm">{review.author}</p>
                  <p className="text-xs text-charcoal/70 font-mono">{review.role}</p>
                  <p className="text-[11px] text-charcoal/50 font-mono mt-0.5">{review.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Guarantees Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-border shadow-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck size={22} className="text-steel-blue flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-charcoal font-mono">Trimble Tekla 2025</p>
                <p className="text-[10px] text-charcoal/60 font-mono">LOD 400 Certified</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={22} className="text-[#22c55e] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-charcoal font-mono">AISC &amp; AS Standards</p>
                <p className="text-[10px] text-charcoal/60 font-mono">100% Code Compliant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={22} className="text-[#22c55e] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-charcoal font-mono">Zero Clash Guarantee</p>
                <p className="text-[10px] text-charcoal/60 font-mono">BIM Coordinated</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={22} className="text-steel-blue flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-charcoal font-mono">Strict NDA Protected</p>
                <p className="text-[10px] text-charcoal/60 font-mono">Confidential Data</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. FINAL CALL TO ACTION
          ══════════════════════════════════════════════════════ */}
      <section className="bg-charcoal py-20 lg:py-28 text-white relative overflow-hidden cad-grid-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-safety-yellow font-bold bg-white/10 border border-safety-yellow/30 px-3 py-1 mb-3">
            Start Your Detailing Project
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Need Fabrication-Ready Steel Drawings?
          </h2>
          <p className="text-base text-[#F3F4F6]/90 leading-relaxed mb-8 max-w-xl mx-auto">
            Get accurate Tekla BIM models, GA erection plans, shop drawings, and CNC files delivered with reliable turnaround from Dhaka, Bangladesh.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <button
              onClick={() => handleNav('contact')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-safety-yellow text-charcoal text-[12px] uppercase tracking-[0.16em] font-bold btn-tactile shadow-xl hover:bg-steel-blue hover:text-white transition-all duration-300 cursor-pointer"
            >
              Start a Project / Get Quote
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <a
              href="mailto:contact@julkarnaeem.com"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-[12px] uppercase tracking-[0.16em] font-semibold border border-white/20 transition-all duration-300 cursor-pointer"
            >
              <Mail size={16} className="text-safety-yellow" />
              Email Inquiry
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-steel-blue text-white text-[12px] uppercase tracking-[0.16em] font-bold btn-tactile shadow-xl hover:bg-charcoal border border-steel-blue transition-all duration-300 cursor-pointer"
            >
              <WhatsAppIcon size={16} />
              WhatsApp Me
            </a>
          </div>
        </div>
      </section>

      {/* Project Drawing Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => handleNav('contact')}
      />

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-charcoal border-2 border-steel-blue p-2 sm:p-3 shadow-2xl cad-corner-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-10 right-0 text-white/80 hover:text-safety-yellow flex items-center gap-1 text-xs font-mono uppercase tracking-widest cursor-pointer transition-colors"
            >
              Close <X size={18} />
            </button>

            <div className="relative w-full aspect-video bg-black overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/Uy2WJKxm-qk?autoplay=1&rel=0"
                title="Steel Structure Detailer intro of Julkar Naeem"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
