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
  Play,
  X,
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Mail,
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
      <section className="relative min-h-screen flex items-center bg-white overflow-hidden cad-grid-light pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24">
        {/* Subtle radial glow in background */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-steel-blue/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Headline & Bio */}
            <div className="order-2 lg:order-1 animate-fade-in-up">
              {/* Location badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded-full mb-5 shadow-xs">
                <MapPin size={13} className="text-steel-blue flex-shrink-0" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-charcoal/80 font-medium font-mono">
                  Dhaka, Bangladesh · Remote Worldwide
                </span>
                <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-ping ml-1" />
              </div>

              {/* Subtitle Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-safety-yellow" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-steel-blue font-bold">
                  {content.hero.badge}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] xl:text-[3.6rem] font-extrabold text-charcoal leading-[1.12] tracking-tight mb-6">
                {content.hero.headlineLine1}
                <br />
                <span className="text-steel-blue font-extrabold">
                  {content.hero.headlineLine2}
                </span>
                <br />
                <span className="text-charcoal bg-gradient-to-r from-charcoal via-charcoal to-steel-blue/90 bg-clip-text">
                  {content.hero.headlineLine3}
                </span>
              </h1>

              {/* Subtitle paragraph */}
              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-lg mb-8">
                {content.hero.subtitle}
              </p>

              {/* CTA Action Buttons: Primary Safety Yellow / Secondary Steel Blue */}
              <div className="flex flex-col sm:flex-row gap-3.5 flex-wrap">
                <button
                  onClick={() => handleNav('projects')}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-safety-yellow text-charcoal text-[12px] uppercase tracking-[0.16em] font-bold btn-tactile shadow-lg hover:bg-steel-blue hover:text-white transition-all duration-300 cursor-pointer"
                >
                  View Projects
                  <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>

                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-steel-blue text-white text-[12px] uppercase tracking-[0.16em] font-semibold btn-tactile shadow-md hover:bg-charcoal transition-all duration-300 cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-safety-yellow group-hover:scale-110 transition-all">
                    <Play size={10} className="fill-white text-white group-hover:fill-charcoal group-hover:text-charcoal ml-0.5" />
                  </span>
                  Watch Video Intro
                </button>
              </div>

              {/* Certifications mini badges */}
              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-charcoal/70 font-mono">Certified:</span>
                <span className="px-3 py-1 border border-steel-blue/30 bg-surface text-steel-blue text-[9px] uppercase tracking-widest font-bold shadow-xs hover:scale-105 transition-transform" title="Trimble Solutions, May 2025, Credential ID 144852093">
                  Tekla Structures Steel Fundamentals
                </span>
                <span className="px-3 py-1 border border-steel-blue/30 bg-surface text-steel-blue text-[9px] uppercase tracking-widest font-bold shadow-xs hover:scale-105 transition-transform" title="AISC, March 2025">
                  AISC Detailer Training Series
                </span>
              </div>

              {/* Software Toolkit Mini Strip */}
              <div className="mt-5 pt-4 border-t border-border/70 flex items-center gap-3 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-charcoal/70 font-mono">Toolkit:</span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white border border-border p-1 flex items-center justify-center shadow-xs hover:border-steel-blue hover:scale-110 transition-all rounded-xs cursor-pointer" title="Tekla Structures 2025 (Primary BIM)">
                    <img src="/images/icons/tekla.jpg" alt="Tekla Structures 2025" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-8 h-8 bg-white border border-border p-1 flex items-center justify-center shadow-xs hover:border-steel-blue hover:scale-110 transition-all rounded-xs cursor-pointer" title="Autodesk AutoCAD (2D Drafting)">
                    <img src="/images/icons/autocad.jpg" alt="AutoCAD" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image Carousel with CAD Precision Frame */}
            <div className="order-1 lg:order-2">
              <div className="relative group">
                
                {/* CAD Technical Crosses in corners */}
                <div className="absolute -top-3 -left-3 text-steel-blue font-mono text-xs z-30 pointer-events-none select-none font-bold">+</div>
                <div className="absolute -top-3 -right-3 text-steel-blue font-mono text-xs z-30 pointer-events-none select-none font-bold">+</div>
                <div className="absolute -bottom-3 -left-3 text-steel-blue font-mono text-xs z-30 pointer-events-none select-none font-bold">+</div>
                <div className="absolute -bottom-3 -right-3 text-steel-blue font-mono text-xs z-30 pointer-events-none select-none font-bold">+</div>

                {/* Decorative border frame */}
                <div className="absolute -top-3 -right-3 w-full h-full border border-steel-blue/30 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />

                {/* Main Image Container */}
                <div className="relative z-10 bg-white border border-border shadow-2xl overflow-hidden aspect-[4/3] flex items-center justify-center transition-all duration-500 ease-out group-hover:shadow-[0_20px_50px_rgba(22,78,128,0.15)] group-hover:border-steel-blue/50">
                  
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-safety-yellow hover:text-charcoal transition-all duration-200 shadow-xl z-30 cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={handleNextHero} 
                    aria-label="Next structure photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-charcoal/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-safety-yellow hover:text-charcoal transition-all duration-200 shadow-xl z-30 cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Technical Badge Overlay */}
                  <div className="absolute bottom-4 left-4 z-20 bg-charcoal/95 backdrop-blur-md px-4 py-2.5 border-l-3 border-safety-yellow text-white shadow-xl flex items-center gap-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-safety-yellow font-mono font-bold">
                        {content.hero.softwareBadgeTitle || 'Tekla Structures 2025'}
                      </p>
                      <p className="text-xs font-semibold text-white tracking-wide">
                        {content.hero.softwareBadgeSub || 'Fabrication-Ready BIM'}
                      </p>
                    </div>
                  </div>

                  {/* Slide Counter & Indicators */}
                  <div className="absolute top-4 right-4 z-20 bg-charcoal/95 text-white text-[10px] uppercase font-mono px-3 py-1 font-bold border border-white/10 flex items-center gap-2">
                    <span className="text-safety-yellow">{String(currentHeroIndex + 1).padStart(2, '0')}</span>
                    <span className="text-white/40">/</span>
                    <span>{String(heroImages.length).padStart(2, '0')}</span>
                  </div>

                  {/* Thumbnail Dots */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-charcoal/80 px-2 py-1.5 backdrop-blur-xs">
                    {heroImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => changeHeroImage(idx)}
                        aria-label={`Jump to image ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          currentHeroIndex === idx ? 'w-5 bg-safety-yellow' : 'w-1.5 bg-white/40 hover:bg-white'
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
          <span className="text-[9px] uppercase tracking-[0.3em] text-steel-blue font-mono font-bold">Explore</span>
          <div className="w-[1px] h-6 bg-safety-yellow animate-pulse" />
        </div>
      </section>

      {/* ─── INTERNATIONAL CODES, DUAL UNITS & TIMEZONE TRUST STRIP ─── */}
      <section className="bg-charcoal text-white border-y border-white/10 relative overflow-hidden cad-grid-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] text-safety-yellow font-bold font-mono">
              Global Compliance &amp; Delivery Standards
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
              Detailed for Fabricators in USA, Canada, Australia &amp; Bangladesh
            </h2>
          </div>

          {/* 4-Country Regional Standards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            
            {/* USA */}
            <div className="p-5 bg-white/5 border border-white/10 hover:border-safety-yellow/60 transition-all duration-300 cad-corner-box group">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xl">🇺🇸</span>
                <span className="px-2 py-0.5 bg-safety-yellow/15 border border-safety-yellow/40 text-safety-yellow text-[9px] uppercase font-mono font-bold">
                  United States
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-safety-yellow transition-colors mb-1">
                AISC 303 &amp; 360 Standards
              </h3>
              <p className="text-xs text-[#F3F4F6]/80 leading-relaxed font-sans mb-3">
                Imperial (ft-in) dimensions, AWS D1.1 structural welding, and OSHA compliant erection plans.
              </p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-steel-blue-light">
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">AISC DTS</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Imperial ft-in</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">DSTV/NC1</span>
              </div>
            </div>

            {/* Canada */}
            <div className="p-5 bg-white/5 border border-white/10 hover:border-safety-yellow/60 transition-all duration-300 cad-corner-box group">
              <div className="flex items-center justify-between gap-2 mb-3">
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
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xl">🇦🇺</span>
                <span className="px-2 py-0.5 bg-safety-yellow/15 border border-safety-yellow/40 text-safety-yellow text-[9px] uppercase font-mono font-bold">
                  Australia &amp; NZ
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-safety-yellow transition-colors mb-1">
                AS 4100 &amp; AS/NZS 5131
              </h3>
              <p className="text-xs text-[#F3F4F6]/80 leading-relaxed font-sans mb-3">
                AS/NZS 1554 welding symbols, ASI guidelines, and real-time 2–4 hr daily timezone overlap.
              </p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-steel-blue-light">
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">AS 4100</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">AS/NZS 5131</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">AEST/AWST</span>
              </div>
            </div>

            {/* Bangladesh */}
            <div className="p-5 bg-white/5 border border-white/10 hover:border-safety-yellow/60 transition-all duration-300 cad-corner-box group">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xl">🇧🇩</span>
                <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-[#22c55e] text-[9px] uppercase font-mono font-bold">
                  Bangladesh
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-safety-yellow transition-colors mb-1">
                BNBC &amp; PEB Detailing
              </h3>
              <p className="text-xs text-[#F3F4F6]/80 leading-relaxed font-sans mb-3">
                Pre-engineered sheds, multi-storey framing, curved rafters, and direct in-person coordination.
              </p>
              <div className="flex flex-wrap gap-1 text-[9px] font-mono text-steel-blue-light">
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">BNBC Code</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">PEB Sheds</span>
                <span className="bg-white/5 px-1.5 py-0.5 border border-white/10">Local Delivery</span>
              </div>
            </div>

          </div>

          {/* Machine-Ready Deliverables Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#F3F4F6]/80">
            <span className="flex items-center gap-2 text-white font-bold">
              <span className="w-2 h-2 rounded-full bg-safety-yellow" />
              Machine-Ready Deliverables:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 bg-white/5 border border-white/15">Tekla 3D (.db1 / .ifc)</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/15">AutoCAD (.dwg)</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/15">DSTV / NC1 (CNC)</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/15">BOM &amp; KISS Reports</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/15">3D PDF Visuals</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── TRUST STATS BAR ─── */}
      <section className="bg-[#1b2026] text-white border-b border-white/10 relative overflow-hidden cad-grid-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-9">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '150+', label: 'Projects Delivered', desc: 'BIM & Shop Drawings' },
              { value: '9+',   label: 'Years Experience',   desc: 'Tekla Detailing' },
              { value: 'Global', label: 'Clients Worldwide', desc: 'USA · CA · AU · BD' },
              { value: '2025', label: 'Tekla Version',      desc: 'Latest Standards' },
            ].map((item, i) => (
              <div key={i} className="text-center group transition-transform duration-300 hover:scale-105">
                <p className="text-3xl md:text-4xl font-extrabold text-safety-yellow mb-1 font-mono tracking-tight group-hover:drop-shadow-[0_0_12px_rgba(245,196,0,0.5)] transition-all">
                  {item.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white font-semibold">{item.label}</p>
                <p className="text-[10px] text-[#F3F4F6]/70 font-mono mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT & DETAILING PRACTICE WITH 4-STEP RFI / QA WORKFLOW ─── */}
      <section className="bg-white py-20 lg:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
            
            {/* Left: Direct Professional Voice */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border text-steel-blue text-[10px] uppercase font-mono font-bold tracking-widest shadow-xs">
                About My Detailing Practice
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight leading-tight">
                I detail steel so the shop can build it without confusion or site fit-up delays.
              </h2>
              <div className="space-y-4 text-base text-charcoal/85 leading-relaxed font-sans">
                <p>
                  I'm a Senior Steel Structure Detailer with 9+ years in structural steel and construction, with over 150 projects successfully fabricated. Using Tekla Structures 2025 and AutoCAD, I transform structural design drawings into coordinated 3D BIM models, clean connection details, and fabrication-ready shop drawing packages.
                </p>
                <p>
                  My experience spans PEB and portal-frame sheds, multi-storey commercial frames, industrial process platforms, circular tank walkways, heavy staircases, handrails, and flyover structures — all detailed strictly according to AISC, CISC, AS 4100, or BNBC requirements.
                </p>
              </div>

              {/* Standards & Units Callout */}
              <div className="p-5 bg-surface border-l-4 border-safety-yellow border-t border-r border-b border-border space-y-2">
                <p className="text-xs uppercase font-mono tracking-wider font-bold text-steel-blue">
                  Code &amp; Measurement Compliance
                </p>
                <p className="text-sm font-semibold text-charcoal leading-relaxed">
                  I work natively in both <strong>Imperial (ft-in / fractions)</strong> and <strong>Metric (mm)</strong> units, strictly following your consulting engineer's design, connection schedules, and client specifications.
                </p>
              </div>
            </div>

            {/* Right: Quality Checks & RFI Policy */}
            <div className="lg:col-span-5 bg-charcoal text-white p-7 lg:p-8 cad-corner-box shadow-xl border border-white/10 space-y-5">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-safety-yellow font-bold block">
                Shop Floor Quality Checklist
              </span>
              <h3 className="text-lg font-bold text-white leading-snug">
                Every drawing is verified against critical fabrication checks:
              </h3>
              <ul className="space-y-3">
                {[
                  'Can it be cut & fitted accurately in the shop?',
                  'Is there full weld torch and bolt wrench clearance?',
                  'Are part marks and assembly numbers automated & clean?',
                  'Are 3D interference and clash tests 100% resolved?',
                  'Can the members be safely transported and erected on site?',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#F3F4F6]">
                    <CheckCircle2 size={16} className="text-safety-yellow flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-white/10 text-xs text-[#F3F4F6]/80 leading-relaxed font-mono">
                <strong className="text-safety-yellow">RFI Protocol:</strong> If information is ambiguous or conflicting, I issue clear, marked-up RFIs immediately. No guessing on structural dimensions.
              </div>
            </div>

          </div>

          {/* 4-Step Engineering RFI & Quality Workflow */}
          <div className="border border-border bg-surface p-8 sm:p-10 cad-corner-box shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-[10px] uppercase tracking-[0.2em] text-steel-blue font-bold font-mono">
                Systematic Remote Workflow
              </span>
              <h3 className="text-2xl font-extrabold text-charcoal mt-1 tracking-tight">
                From Contract Drawings to Shop Floor Fabrication
              </h3>
              <p className="text-sm text-charcoal/70 mt-1">
                A structured 4-step detailing workflow designed for international contractors and fabricators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Design Review & Grid Setup',
                  desc: 'Review architectural and structural drawings, verify design loads, set up 3D Tekla grids, and apply regional standard parameters.',
                },
                {
                  step: '02',
                  title: 'RFI & Connection Detailing',
                  desc: 'Coordinate moment, shear, and bracing connections. Log and submit early RFIs with clear sketch markups to resolve clashes.',
                },
                {
                  step: '03',
                  title: 'Model QA & Clash Check',
                  desc: 'Perform multi-layer collision audits, check bolt wrench clearances, verify part numbering, and extract GA erection plans.',
                },
                {
                  step: '04',
                  title: 'Fabrication Drawing Package',
                  desc: 'Generate complete assembly shop drawings, single part details, DSTV (.nc1) files, DXFs, and automated BOM reports.',
                },
              ].map((w, idx) => (
                <div key={idx} className="p-5 bg-white border border-border hover:border-steel-blue transition-all relative group">
                  <span className="text-2xl font-extrabold text-steel-blue/30 font-mono group-hover:text-steel-blue transition-colors">
                    {w.step}
                  </span>
                  <h4 className="text-sm font-bold text-charcoal mt-2 mb-2 group-hover:text-steel-blue transition-colors">
                    {w.title}
                  </h4>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-sans">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* NDA & IP Protection Guarantee Callout */}
            <div className="mt-8 p-5 bg-charcoal text-white border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-safety-yellow/10 border border-safety-yellow/30 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} className="text-safety-yellow" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>100% Client Intellectual Property &amp; Confidentiality Guarantee</span>
                  </h4>
                  <p className="text-xs text-[#F3F4F6]/75 mt-0.5">
                    Ready to execute standard mutual Non-Disclosure Agreements (NDAs) before reviewing your proprietary CAD files or structural calculations.
                  </p>
                </div>
              </div>

              <a
                href={`${WA_LINK}&text=Hi%20Julkar!%20I%20have%20a%20project%20and%20would%20like%20to%20request%20an%20NDA%20before%20sending%20drawings.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-safety-yellow text-charcoal hover:bg-steel-blue hover:text-white text-[11px] uppercase tracking-wider font-bold transition-all whitespace-nowrap shadow-md"
              >
                Request NDA / Inquire
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ─── PROFESSIONAL HISTORY BAND (B3) ─── */}
      <section className="bg-surface py-14 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-steel-blue flex-shrink-0" />
              <h3 className="text-base font-extrabold text-charcoal font-mono uppercase tracking-wider">
                Professional Experience
              </h3>
            </div>
            <p className="text-xs font-mono font-bold text-steel-blue bg-white px-3 py-1.5 border border-border inline-block shadow-xs">
              9+ years in steel and construction · 150+ projects delivered
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                role: 'Sr. Detailing Engineer',
                company: 'SES Steel Structure Ltd, Dhaka',
                period: 'Feb 2025 – Present',
                current: true,
              },
              {
                role: 'Detailing Engineer',
                company: 'SES Steel Structure Ltd',
                period: 'Feb 2023 – Feb 2025',
                current: false,
              },
              {
                role: 'Detailing Engineer',
                company: 'NDE Steel Structures Ltd',
                period: 'Feb 2022 – Feb 2023',
                current: false,
              },
              {
                role: 'Quality Assurance Engineer',
                company: 'Confidence Steel Ltd',
                period: 'Nov 2017 – Nov 2019',
                current: false,
              },
            ].map((exp, eIdx) => (
              <div
                key={eIdx}
                className={`p-5 border transition-all ${
                  exp.current
                    ? 'bg-white border-steel-blue shadow-md'
                    : 'bg-white border-border'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-steel-blue font-bold uppercase tracking-wider">
                    {exp.period}
                  </span>
                  {exp.current && (
                    <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" title="Current Role" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-charcoal leading-tight mb-1">{exp.role}</h4>
                <p className="text-xs text-charcoal/70 font-mono">{exp.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO INTRODUCTION SHOWCASE ─── */}
      <section className="bg-charcoal text-white py-20 lg:py-24 relative overflow-hidden cad-grid-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Video Overview & Highlights (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-safety-yellow border border-safety-yellow/30 text-[10px] uppercase font-mono font-bold tracking-widest mb-3 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-clash-red animate-pulse" /> Video Presentation
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Meet Julkar Naeem
                </h2>
                <p className="text-sm text-[#F3F4F6]/90 mt-3 leading-relaxed">
                  Watch a 1-minute video introduction to my structural steel detailing background, Tekla Structures 3D modeling workflow, and fabrication drawing deliverables.
                </p>
              </div>

              {/* Value Highlights */}
              <div className="space-y-3 pt-1">
                {[
                  {
                    title: '9+ Years Tekla Detailing Experience',
                    desc: 'Expertise in LOD 400 BIM modeling, PEB industrial sheds, and complex access structures.',
                  },
                  {
                    title: 'Fabrication-Ready Precision',
                    desc: 'Zero-clash assemblies, GA plans, part details, and automated BOM reports.',
                  },
                  {
                    title: 'AISC & International Standards',
                    desc: 'Standardized connection detailing for fabricators and structural engineers.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xs hover:border-steel-blue/60 transition-colors">
                    <CheckCircle className="text-safety-yellow w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">{item.title}</h4>
                      <p className="text-[11px] text-[#F3F4F6]/80 mt-0.5 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Primary WhatsApp CTA & Secondary Projects Link */}
              <div className="pt-2 flex items-center gap-4 flex-wrap">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-safety-yellow text-charcoal text-xs uppercase tracking-widest font-bold btn-tactile hover:bg-steel-blue hover:text-white transition-all shadow-lg cursor-pointer"
                >
                  <WhatsAppIcon size={16} /> Discuss on WhatsApp
                </a>
                <button
                  onClick={() => handleNav('projects')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-[#F3F4F6]/80 hover:text-safety-yellow transition-colors cursor-pointer"
                >
                  View Projects <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Right: Embedded 16:9 YouTube Cinema Player (7 Cols) */}
            <div className="lg:col-span-7 w-full">
              <div className="relative bg-black border-2 border-white/20 p-2 shadow-2xl cad-corner-box group">
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

          </div>

        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-safety-yellow" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-steel-blue font-bold">Portfolio & Drawings</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                Featured Steel Projects
              </h2>
              <p className="text-charcoal/80 text-sm sm:text-base mt-2 max-w-xl">
                9 selected projects from 150+ delivered — more available on request. Coordinated Tekla 3D BIM models, fabrication shop drawings, and connection packages.
              </p>
            </div>
            <button
              onClick={() => handleNav('projects')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-white text-[11px] uppercase tracking-[0.18em] font-semibold btn-tactile-dark hover:bg-steel-blue hover:text-white transition-all self-start md:self-auto shadow-md cursor-pointer"
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
                    
                    {/* Hover Overlay with Inspect Icon */}
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

                    {/* Gallery Count Badge */}
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
                        {project.deliverables.slice(0, 3).map((deliv, dIdx) => (
                          <span
                            key={dIdx}
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

      {/* ─── PROCESS TIMELINE (Moved under Projects) ─── */}
      <section className="bg-charcoal text-white py-20 lg:py-28 relative overflow-hidden cad-grid-dark border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-white/10 text-safety-yellow border border-safety-yellow/30 text-[11px] uppercase tracking-[0.25em] font-bold mb-2">Workflow</span>
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
                <div className="text-3xl font-extrabold text-safety-yellow font-mono mb-3 group-hover:drop-shadow-[0_0_10px_rgba(245,196,0,0.5)] transition-all">
                  {item.step}
                </div>
                <div className="w-full h-[1px] bg-steel-blue/40 mb-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-safety-yellow rounded-full shadow-[0_0_8px_rgba(245,196,0,0.8)]" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-[#F3F4F6]/80 text-sm leading-relaxed">{item.desc}</p>
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
              <span className="text-[11px] uppercase tracking-[0.25em] text-steel-blue font-bold">Service Catalog & Packages</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2 tracking-tight">
                Project Catalog & Tiered Offerings
              </h2>
              <p className="text-charcoal/80 text-sm sm:text-base mt-2 max-w-xl">
                Choose from Starter, Standard, or Advanced structural detailing tiers with clear turnaround times.
              </p>
            </div>
            <button
              onClick={() => handleNav('services')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-white text-[11px] uppercase tracking-[0.18em] font-bold btn-tactile-dark hover:bg-steel-blue hover:text-white transition-all self-start md:self-auto shadow-md cursor-pointer"
            >
              Explore Full Catalog & Tiers
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Upwork Style 3-Tier Summary Cards with Transparent Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {[
              {
                tier: 'Starter Tier',
                badge: 'Quick Scope',
                price: '$70',
                delivery: '2 days',
                scope: 'Stairs, small platforms & single parts (up to 5 tons)',
                desc: '1–4 shop drawings, single-part fitting details, basic material summary.',
              },
              {
                tier: 'Standard Tier',
                badge: 'Most Popular',
                price: '$160',
                delivery: '6 days',
                scope: 'PEB sheds & industrial frames (up to 25 tons)',
                desc: 'Complete LOD 400 Tekla model, GA erection plans, assembly shop drawings, NC/DSTV files, BOM.',
                featured: true,
              },
              {
                tier: 'Advanced Tier',
                badge: 'Full Detailing Suite',
                price: '$290',
                delivery: '10 days',
                scope: 'Multi-storey, heavy plants & infrastructure (up to 100+ tons)',
                desc: 'End-to-end BIM coordination, full drawing package, clash detection, anchor bolt plans, bolt schedules.',
              },
            ].map((pkg, pIdx) => (
              <div
                key={pIdx}
                className={`p-7 border transition-all duration-300 flex flex-col justify-between cad-corner-box ${
                  pkg.featured
                    ? 'bg-charcoal text-white border-safety-yellow shadow-2xl scale-102 hover:shadow-[0_15px_40px_rgba(245,196,0,0.2)]'
                    : 'bg-surface text-charcoal border-border hover:border-steel-blue hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 ${
                      pkg.featured ? 'bg-safety-yellow text-charcoal' : 'bg-white text-steel-blue border border-border'
                    }`}>
                      {pkg.badge}
                    </span>
                    <span className={`text-xs font-mono font-semibold ${pkg.featured ? 'text-safety-yellow' : 'text-steel-blue'}`}>
                      {pkg.delivery}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{pkg.tier}</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className={`text-lg font-mono font-extrabold ${pkg.featured ? 'text-safety-yellow' : 'text-steel-blue'}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-[10px] uppercase font-mono ${pkg.featured ? 'text-white/60' : 'text-charcoal/60'}`}>
                      / fixed project
                    </span>
                  </div>
                  <p className={`text-xs font-mono font-semibold mb-4 ${pkg.featured ? 'text-[#F3F4F6]/80' : 'text-steel-blue'}`}>
                    {pkg.scope}
                  </p>
                  <p className={`text-sm leading-relaxed mb-6 ${pkg.featured ? 'text-[#F3F4F6]/90' : 'text-charcoal/80'}`}>
                    {pkg.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleNav('services')}
                  className={`w-full py-3 text-[11px] uppercase tracking-[0.16em] font-bold transition-all text-center cursor-pointer ${
                    pkg.featured
                      ? 'bg-safety-yellow text-charcoal hover:bg-steel-blue hover:text-white'
                      : 'bg-steel-blue text-white hover:bg-charcoal'
                  }`}
                >
                  View Package Details →
                </button>
              </div>
            ))}
          </div>

          {/* Pricing Guarantee & Estimation Note */}
          <div className="mb-12 p-4 bg-surface border border-border/80 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-steel-blue/10 flex items-center justify-center text-steel-blue flex-shrink-0">
                <DollarSign size={18} />
              </div>
              <p className="text-xs text-charcoal/80 font-mono">
                <strong className="text-charcoal">Transparent Pricing:</strong> Fixed lump-sum rates or hourly contracts (<span className="text-steel-blue font-bold">$25 – $45/hr</span>). Free scope evaluation &amp; quote within 24 hours.
              </p>
            </div>
            <button
              onClick={() => handleNav('contact')}
              className="text-xs font-mono uppercase tracking-wider font-bold text-steel-blue hover:text-charcoal underline flex-shrink-0 cursor-pointer"
            >
              Request Free Estimate →
            </button>
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
                className="p-6 border border-border hover:border-steel-blue hover:shadow-lg bg-surface group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleNav('services')}
              >
                <div className="text-steel-blue group-hover:text-safety-yellow transition-colors duration-300 mb-3">
                  {svc.icon}
                </div>
                <h3 className="text-base font-bold text-charcoal mb-1.5 group-hover:text-steel-blue transition-colors">{svc.title}</h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── SOCIAL PROOF & CLIENT REVIEWS SECTION ─── */}
      <section className="bg-[#1A1E24] text-white py-24 lg:py-32 relative overflow-hidden cad-grid-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-safety-yellow" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-safety-yellow font-bold font-mono">
                  Verified Social Proof &amp; Client Feedback
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Trusted by Fabricators &amp; Engineers Worldwide
              </h2>
              <p className="text-[#F3F4F6]/80 text-sm sm:text-base mt-2 max-w-xl">
                150+ successful projects delivered with zero fit-up clashes and 100% on-time milestone records.
              </p>
            </div>

            {/* Overall Rating Pill */}
            <div className="p-4 bg-white/5 border border-white/10 flex items-center gap-4 self-start md:self-auto">
              <div className="text-center">
                <div className="text-2xl font-mono font-extrabold text-safety-yellow leading-none">5.0</div>
                <div className="flex items-center gap-0.5 text-safety-yellow mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
              </div>
              <div className="h-8 w-[1px] bg-white/15" />
              <div className="text-xs font-mono text-[#F3F4F6]/80">
                <p className="font-bold text-white">150+ Projects</p>
                <p className="text-[11px] text-[#F3F4F6]/60">100% Satisfaction</p>
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
                role: 'Steel Fabricator & Project Contractor',
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
                className="p-7 bg-[#20252B] border border-white/10 hover:border-safety-yellow/60 transition-all duration-300 flex flex-col justify-between cad-corner-box group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-safety-yellow">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <Quote size={20} className="text-white/20 group-hover:text-safety-yellow/40 transition-colors" />
                  </div>
                  <p className="text-sm text-[#F3F4F6]/90 leading-relaxed italic mb-6">
                    "{review.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="inline-block text-[9px] uppercase font-mono text-safety-yellow font-bold mb-1.5">
                    {review.tag}
                  </span>
                  <p className="font-bold text-white text-sm">{review.author}</p>
                  <p className="text-xs text-[#F3F4F6]/70 font-mono">{review.role}</p>
                  <p className="text-[11px] text-[#F3F4F6]/50 font-mono mt-0.5">{review.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Guarantees Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/5 border border-white/10 rounded-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} className="text-safety-yellow flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white font-mono">Trimble Tekla 2025</p>
                <p className="text-[10px] text-[#F3F4F6]/60 font-mono">LOD 400 Certified</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} className="text-[#22c55e] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white font-mono">AISC &amp; BS Standards</p>
                <p className="text-[10px] text-[#F3F4F6]/60 font-mono">100% Code Compliant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} className="text-[#22c55e] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white font-mono">Zero Clash Guarantee</p>
                <p className="text-[10px] text-[#F3F4F6]/60 font-mono">BIM Model Coordinated</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} className="text-safety-yellow flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white font-mono">Strict NDA Protected</p>
                <p className="text-[10px] text-[#F3F4F6]/60 font-mono">Confidential Project Data</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── FINAL CALL TO ACTION ─── */}
      <section className="bg-charcoal py-24 lg:py-32 text-white relative overflow-hidden cad-grid-dark border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-safety-yellow font-bold bg-white/10 border border-safety-yellow/30 px-3 py-1 mb-2">Let's Work Together</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-6 tracking-tight">
            Need Fabrication-Ready Steel Drawings?
          </h2>
          <p className="text-base sm:text-lg text-[#F3F4F6]/90 leading-relaxed mb-10 max-w-xl mx-auto">
            Let's turn your structural concept into an accurate Tekla model and clear shop drawing package — delivered remotely from Dhaka, Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNav('contact')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-safety-yellow text-charcoal text-[12px] uppercase tracking-[0.16em] font-bold btn-tactile shadow-xl hover:bg-steel-blue hover:text-white transition-all duration-300 cursor-pointer"
            >
              Start a Project
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <a
              href="mailto:contact@julkarnaeem.com"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-[12px] uppercase tracking-[0.16em] font-semibold border border-white/20 transition-all duration-300 cursor-pointer"
            >
              <Mail size={16} className="text-safety-yellow" />
              Email Me
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

      {/* Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => handleNav('contact')}
      />

      {/* Full-Screen Video Lightbox Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-charcoal border-2 border-steel-blue p-2 sm:p-3 shadow-2xl cad-corner-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-10 right-0 text-white/80 hover:text-safety-yellow flex items-center gap-1 text-xs font-mono uppercase tracking-widest cursor-pointer transition-colors"
            >
              Close <X size={18} />
            </button>

            {/* Responsive 16:9 YouTube Player */}
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
