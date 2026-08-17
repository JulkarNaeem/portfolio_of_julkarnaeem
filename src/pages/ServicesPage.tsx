import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  RefreshCw,
  ShieldCheck,
  Award,
  Layers,
  FileText,
  FileCode,
  Weight,
  Cpu,
  ChevronRight,
  ExternalLink,
  Wrench,
  Building2,
  ClipboardList,
  Link2,
  BarChart3,
  Footprints,
  Maximize2,
  Check,
  Minus,
} from 'lucide-react';
import { WhatsAppIcon, UpworkIcon } from '../components/SocialIcons';
import { useCms } from '../context/CmsContext';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const WA_NUMBER = '8801739411586';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

// Catalog Gallery Images
const CATALOG_GALLERY = [
  {
    title: 'Stair & Platform Structure (Metrorail)',
    img: '/images/Project Photos/Metrorail Station Structure with stair.png',
  },
  {
    title: 'Flyover Heavy Steel Support Frame',
    img: '/images/Project Photos/3d Drawing View of Flyover Support member.png',
  },
  {
    title: 'Multi-Storied Steel Frame Model',
    img: '/images/Project Photos/Multistoried Building.png',
  },
  {
    title: 'Curved Rafter Industrial Shed',
    img: '/images/Project Photos/Carver Rafter Shed industrial.png',
  },
  {
    title: 'Tank Ring Curved Walkway Platform',
    img: '/images/Project Photos/Carve Walkaway Platform.png',
  },
  {
    title: 'Spiral Steel Staircase Details',
    img: '/images/Project Photos/Spiral Stair.png',
  },
];

// Tier Definitions (Without exposed fixed prices, focused on scope & deliverables)
const TIERS = [
  {
    id: 'starter',
    name: 'Starter Tier',
    badge: 'Quick Scope',
    scope: 'Single Component / Stair / Small Platform (Up to 5 Tons)',
    delivery: '2 Days',
    revisions: '1 Revision',
    description: 'Perfect for small steel accessories, single-member shop drawings, spiral stairs, or connection detail packages.',
    includes: [
      'Coordinated 3D Tekla Model (LOD 350)',
      '1–4 Fabrication Shop Drawing Sheets',
      'Single Part & Fitting Details',
      'Basic Material Quantity List',
      '2D DWG & High-Res PDF Deliverables',
    ],
    excludes: [
      'General Arrangement (GA) Erection Plan',
      'NC / DSTV CNC Machine Files',
      'Complex Clash Coordination',
    ],
  },
  {
    id: 'standard',
    name: 'Standard Tier',
    badge: 'Most Popular',
    scope: 'PEB Shed / Medium Industrial Platform (Up to 25 Tons)',
    delivery: '4 Days',
    revisions: '2 Revisions',
    description: 'Complete detailing package for PEB buildings, warehouses, mezzanines, walkway platforms, and industrial framing.',
    includes: [
      'Full LOD 400 Coordinated Tekla BIM Model',
      'General Arrangement (GA) Erection Plans',
      'Complete Assembly & Part Shop Drawings',
      'Anchor Bolt Layout & Base Plate Details',
      'NC / DSTV Files for CNC Fabricators',
      'Full Material Take-Off (BOM) Report',
    ],
    excludes: [
      'Multi-storey Heavy Connection Engineering',
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced Tier',
    badge: 'Enterprise Scope',
    scope: 'Multi-Storey / Large Industrial Plant (Up to 100+ Tons)',
    delivery: '7–10 Days',
    revisions: '3 Revisions / Priority Support',
    description: 'End-to-end structural detailing for complex multi-storey steel buildings, heavy infrastructure, bridges, or complete factories.',
    includes: [
      'Complete LOD 400 Tekla BIM Model Suite',
      'Full GA Erection Plans with Section Cuts',
      '100% Complete Shop Drawing Package',
      'Anchor Bolt Layout & Foundation Embed Plans',
      'All CNC Data (NC, DSTV, DXF, IFC Formats)',
      'Full BOM, Bolt Schedules & Paint Area Reports',
      'Shop Floor & Erection Support for Clarity',
    ],
    excludes: [],
  },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { content } = useCms();
  const [selectedTier, setSelectedTier] = useState<string>('standard');
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

  const activeTier = TIERS.find((t) => t.id === selectedTier) || TIERS[1];

  const handleOrderTier = (tierName: string) => {
    const text = encodeURIComponent(
      `Hi Julkar! I am interested in your Upwork-style Project Catalog:\n` +
      `*Package Tier:* ${tierName}\n` +
      `*Scope:* ${activeTier.scope}\n\n` +
      `I would like to discuss my project drawings and get a timeline quotation.`
    );
    window.open(`${WA_BASE}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* ─── BREADCRUMB & HEADER BAR ─── */}
      <section className="bg-charcoal pt-28 pb-8 text-white relative overflow-hidden cad-grid-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-steel-light font-mono mb-4 flex-wrap">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('home')}>Home</span>
            <ChevronRight size={12} className="text-accent" />
            <span className="hover:text-white transition-colors">Engineering & BIM</span>
            <ChevronRight size={12} className="text-accent" />
            <span className="text-accent font-semibold">Steel Structure Detailing Catalog</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/30 text-accent font-mono font-bold text-[10px] uppercase tracking-[0.2em] mb-2 shadow-xs">
                Project Catalog & Service Packages
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Tekla Steel Detailing | Shop Drawings & 3D BIM Modeling
              </h1>
            </div>

            {/* Upwork Profile Link Badge */}
            <a
              href="https://www.upwork.com/freelancers/julkarnaeem"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/5 border border-white/15 hover:border-[#6FDA44] hover:bg-[#6FDA44]/10 text-white transition-all duration-200 self-start lg:self-auto group shadow-md"
            >
              <UpworkIcon size={18} className="text-[#6FDA44]" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-mono tracking-wider text-steel-lighter">Verified on Upwork</p>
                <p className="text-xs font-bold text-white group-hover:text-[#6FDA44] transition-colors">Top Rated Detailer ↗</p>
              </div>
            </a>
          </div>

          {/* Seller Snapshot Bar */}
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent shadow-md">
                <img src="/images/logo.png" alt="Julkar Naeem" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">{content.profileName}</p>
                <p className="text-xs text-steel-light font-mono">Sr. Tekla Detailer · 9+ Years Experience</p>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-6 text-xs text-steel-light font-mono flex-wrap">
              <span className="flex items-center gap-1.5 text-accent font-semibold">
                ★ 5.0 Rating (150+ Projects)
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <Clock size={13} className="text-accent" /> Response in &lt; 1 Hour
              </span>
              <span className="flex items-center gap-1.5 text-[#22c55e]">
                <ShieldCheck size={14} /> Milestone Escrow Protection
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── UPWORK PROJECT CATALOG MAIN VIEWPORT ─── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Gallery & Drawing Showcase (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Main Model Viewport */}
              <div className="relative bg-[#0e0f17] border border-border overflow-hidden aspect-[16/11] flex items-center justify-center p-4 shadow-2xl group cad-corner-box">
                <img
                  src={CATALOG_GALLERY[activeMediaIndex].img}
                  alt={CATALOG_GALLERY[activeMediaIndex].title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain transition-all duration-300 group-hover:scale-102"
                />
                
                {/* Active Caption */}
                <div className="absolute bottom-3 left-3 z-20 bg-charcoal/90 backdrop-blur-md px-3.5 py-1.5 border-l-2 border-accent text-white shadow-md">
                  <p className="text-[9px] uppercase tracking-wider text-accent font-mono font-bold">Tekla Sample Model</p>
                  <p className="text-xs font-semibold text-white">{CATALOG_GALLERY[activeMediaIndex].title}</p>
                </div>

                {/* Inspect Button */}
                <button
                  onClick={() => {
                    const imgUrl = CATALOG_GALLERY[activeMediaIndex].img;
                    window.open(imgUrl, '_blank');
                  }}
                  className="absolute top-3 right-3 z-20 w-9 h-9 bg-charcoal/80 text-white flex items-center justify-center hover:bg-accent hover:text-charcoal transition-all shadow-md cursor-pointer"
                  title="View Full Resolution Drawing"
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Thumbnail Selector Strip */}
              <div className="grid grid-cols-6 gap-2.5">
                {CATALOG_GALLERY.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`relative aspect-[4/3] bg-surface border-2 overflow-hidden transition-all duration-200 cursor-pointer ${
                      activeMediaIndex === idx
                        ? 'border-accent shadow-md scale-105 ring-2 ring-accent/30'
                        : 'border-border opacity-70 hover:opacity-100 hover:scale-102'
                    }`}
                  >
                    <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>

              {/* Overview & Key Highlights */}
              <div className="p-6 bg-surface border border-border space-y-4 shadow-xs">
                <h3 className="text-base font-bold text-charcoal uppercase tracking-wider font-mono">
                  Catalog Deliverables Summary
                </h3>
                <p className="text-sm text-steel leading-relaxed">
                  Every steel project is modeled precisely in <strong>Tekla Structures 2025</strong> according to AISC and regional engineering guidelines. Deliverables are checked for zero fabrication clashes and labeled with standard part and assembly marks.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { label: 'Model LOD', val: 'LOD 400 BIM' },
                    { label: 'Drawing Units', val: 'Metric & Imperial' },
                    { label: 'Code Standard', val: 'AISC / NSCP / BS' },
                    { label: 'CNC Support', val: 'DSTV, NC, DXF' },
                    { label: 'Revisions', val: 'Included with Tier' },
                    { label: 'Direct Escrow', val: 'Upwork / WhatsApp' },
                  ].map((spec, sIdx) => (
                    <div key={sIdx} className="p-2.5 bg-white border border-border">
                      <p className="text-[10px] text-steel uppercase font-mono">{spec.label}</p>
                      <p className="text-xs font-bold text-charcoal">{spec.val}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Upwork / Fiverr Style Service Tier Selector (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white border-2 border-charcoal shadow-2xl p-6 sm:p-8 relative cad-corner-box">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-accent tracking-widest block">Choose Package</span>
                    <h3 className="text-lg font-bold text-charcoal">Select Service Tier</h3>
                  </div>
                  <span className="text-xs text-steel font-mono">3 Available Tiers</span>
                </div>

                {/* Tier Radio Pill Switcher */}
                <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-surface border border-border">
                  {TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`py-2.5 text-center transition-all duration-200 cursor-pointer ${
                        selectedTier === tier.id
                          ? 'bg-charcoal text-white font-bold shadow-md'
                          : 'text-steel hover:text-charcoal hover:bg-white text-xs font-medium'
                      }`}
                    >
                      <span className="block text-[11px] uppercase tracking-wider">{tier.name.split(' ')[0]}</span>
                      <span className="block text-[9px] text-accent font-mono mt-0.5">{tier.badge}</span>
                    </button>
                  ))}
                </div>

                {/* Active Tier Scope & Metadata Card */}
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 bg-accent text-charcoal text-[9px] uppercase font-mono font-bold mb-1 shadow-xs">
                        {activeTier.badge}
                      </span>
                      <h4 className="text-xl font-extrabold text-charcoal">{activeTier.name}</h4>
                      <p className="text-xs text-steel font-mono font-semibold mt-0.5">{activeTier.scope}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-steel block">Pricing</span>
                      <span className="text-sm font-bold text-charcoal bg-surface px-2.5 py-1 border border-border inline-block">
                        Custom Quote
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-steel leading-relaxed bg-surface p-3 border border-border">
                    {activeTier.description}
                  </p>

                  {/* Delivery & Revisions Stats */}
                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-border text-xs">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-accent" />
                      <div>
                        <p className="text-[10px] uppercase text-steel font-mono">Estimated Delivery</p>
                        <p className="font-bold text-charcoal">{activeTier.delivery}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw size={16} className="text-accent" />
                      <div>
                        <p className="text-[10px] uppercase text-steel font-mono">Revisions</p>
                        <p className="font-bold text-charcoal">{activeTier.revisions}</p>
                      </div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-1">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-charcoal font-mono">Included in this Tier:</p>
                    {activeTier.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 size={15} className="text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-charcoal font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => handleOrderTier(activeTier.name)}
                      className="w-full inline-flex items-center justify-center gap-2 py-4 bg-charcoal text-white text-[12px] uppercase tracking-[0.18em] font-bold btn-tactile-dark shadow-xl hover:bg-accent hover:text-charcoal transition-all duration-300 cursor-pointer"
                    >
                      <WhatsAppIcon size={16} />
                      Request {activeTier.name} on WhatsApp
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 bg-surface border border-border text-charcoal text-[11px] uppercase tracking-[0.15em] font-semibold hover:bg-surface-alt transition-colors cursor-pointer"
                    >
                      Submit Custom Project Brief <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Trust & Guarantee Note */}
                  <div className="pt-4 border-t border-border flex items-center gap-2 text-[11px] text-steel">
                    <ShieldCheck size={18} className="text-[#22c55e] flex-shrink-0" />
                    <span>Direct escrow / milestone payment security. Paid only when drawings are approved.</span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── PACKAGE COMPARISON MATRIX (Upwork / Fiverr Table) ─── */}
      <section className="bg-surface py-16 lg:py-24 border-y border-border cad-grid-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">Detailed Breakdown</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-charcoal mt-1 tracking-tight">
              Compare Service Packages
            </h2>
            <p className="text-sm text-steel mt-2 max-w-xl mx-auto">
              Find the ideal detailing tier for your steel fabrication scope, timeline, and drawing output requirements.
            </p>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-border shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-charcoal text-white border-b border-white/10 font-mono">
                  <th className="p-5 font-bold uppercase tracking-wider text-xs">Deliverables & Features</th>
                  <th className="p-5 font-bold uppercase tracking-wider text-xs border-l border-white/10 text-center">
                    Starter
                    <span className="block text-[9px] text-accent font-normal mt-0.5">Quick Scope</span>
                  </th>
                  <th className="p-5 font-bold uppercase tracking-wider text-xs border-l border-white/10 text-center bg-accent/10 text-accent">
                    Standard ★
                    <span className="block text-[9px] text-white font-normal mt-0.5">Most Popular</span>
                  </th>
                  <th className="p-5 font-bold uppercase tracking-wider text-xs border-l border-white/10 text-center">
                    Advanced
                    <span className="block text-[9px] text-accent font-normal mt-0.5">Full Plant / Tower</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { feature: 'Typical Steel Tonnage', starter: 'Up to 5 Tons', standard: 'Up to 25 Tons', advanced: 'Up to 100+ Tons' },
                  { feature: 'Estimated Delivery Time', starter: '2 Days', standard: '4 Days', advanced: '7–10 Days' },
                  { feature: 'Revisions Included', starter: '1 Revision', standard: '2 Revisions', advanced: '3 Revisions / Priority' },
                  { feature: 'Tekla Structures 3D Model', starter: true, standard: true, advanced: true },
                  { feature: 'Fabrication Shop Drawings', starter: '1–4 Sheets', standard: 'Complete Package', advanced: 'Full Drawing Suite' },
                  { feature: 'General Arrangement (GA) Erection Plans', starter: false, standard: true, advanced: true },
                  { feature: 'Single Part & Assembly Details', starter: true, standard: true, advanced: true },
                  { feature: 'Anchor Bolt & Base Plate Layout', starter: false, standard: true, advanced: true },
                  { feature: 'CNC Machine Files (NC, DSTV, DXF)', starter: false, standard: true, advanced: true },
                  { feature: 'Material Take-off / Bill of Materials (BOM)', starter: 'Basic List', standard: 'Complete BOM', advanced: 'BOM + Bolt Schedule' },
                  { feature: 'Clash Detection & BIM Coordination', starter: false, standard: true, advanced: true },
                ].map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-surface/50'}>
                    <td className="p-4 font-semibold text-charcoal text-xs sm:text-sm">{row.feature}</td>
                    <td className="p-4 text-center border-l border-border text-xs text-steel">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <Check size={16} className="text-accent mx-auto" /> : <Minus size={16} className="text-steel-lighter mx-auto" />
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="p-4 text-center border-l border-border text-xs font-semibold text-charcoal bg-accent/5">
                      {typeof row.standard === 'boolean' ? (
                        row.standard ? <Check size={16} className="text-accent mx-auto" /> : <Minus size={16} className="text-steel-lighter mx-auto" />
                      ) : (
                        row.standard
                      )}
                    </td>
                    <td className="p-4 text-center border-l border-border text-xs text-steel">
                      {typeof row.advanced === 'boolean' ? (
                        row.advanced ? <Check size={16} className="text-accent mx-auto" /> : <Minus size={16} className="text-steel-lighter mx-auto" />
                      ) : (
                        row.advanced
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Inquiry CTA under Table */}
          <div className="mt-8 text-center">
            <p className="text-xs text-steel font-mono mb-3">Have a project with unique specifications or higher tonnage?</p>
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-white text-[11px] uppercase tracking-[0.18em] font-bold btn-tactile-dark hover:bg-accent hover:text-charcoal transition-all shadow-md cursor-pointer"
            >
              Get a Custom Scope Quotation <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* ─── SPECIALIZED CATALOG OFFERINGS ─── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">Specialized Detailing</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-charcoal mt-1 tracking-tight">
              Other Specialized Project Catalogs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Building2 size={24} />,
                title: 'PEB Buildings & Portal Sheds',
                desc: 'Rigid portal frames, purlin/girt layouts, sag rods, bracing systems, and complete GA drawings.',
                badge: 'PEB Specialist',
              },
              {
                icon: <Footprints size={24} />,
                title: 'Stairs, Platforms & Handrails',
                desc: 'Spiral stairs, stringers, checkered plate treads, safety handrails, ladders, and tank walkways.',
                badge: 'Access Steel',
              },
              {
                icon: <Link2 size={24} />,
                title: 'Steel Connection Detailing',
                desc: 'Moment & shear connections, base plates, splices, gusset plates, and heavy truss joints.',
                badge: 'Connection Design',
              },
              {
                icon: <BarChart3 size={24} />,
                title: 'Material Take-off & CNC Data',
                desc: 'Accurate bolt schedules, assembly weights, paint surface reports, and NC/DSTV files.',
                badge: 'Fabrication Data',
              },
              {
                icon: <Wrench size={24} />,
                title: 'Multi-Storey Structural Steel',
                desc: 'Composite beam framing, bracing cross-frames, moment frames, and full erection sequence marks.',
                badge: 'Heavy Structural',
              },
              {
                icon: <ClipboardList size={24} />,
                title: 'As-Built & 2D to 3D BIM Conversion',
                desc: 'Converting 2D CAD architectural drawings into coordinated 3D Tekla BIM models.',
                badge: 'BIM Conversion',
              },
            ].map((cat, cIdx) => (
              <div
                key={cIdx}
                className="p-6 border border-border bg-surface hover:bg-white hover:border-accent hover:shadow-xl transition-all duration-300 cad-corner-box group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-white border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-charcoal transition-colors shadow-xs">
                    {cat.icon}
                  </div>
                  <span className="text-[9px] uppercase font-mono font-bold text-steel bg-white border border-border px-2 py-0.5">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-charcoal mb-2 group-hover:text-accent transition-colors">{cat.title}</h3>
                <p className="text-xs text-steel leading-relaxed mb-4">{cat.desc}</p>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[11px] uppercase tracking-wider text-charcoal font-bold group-hover:text-accent transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Inquire Scope <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── DIRECT CONTRACT GUARANTEE ─── */}
      <section className="bg-charcoal text-white py-16 border-t border-white/10 relative cad-grid-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 bg-accent/10 border border-accent/40 rounded-full flex items-center justify-center mx-auto text-accent shadow-md">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Guaranteed Fabrication Accuracy & Escrow Security
          </h2>
          <p className="text-sm sm:text-base text-steel-light leading-relaxed max-w-2xl mx-auto">
            Work with confidence. Every project includes milestone-based payment safety (via Upwork or direct milestone contracts), zero-clash checking, and post-delivery fabrication support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-accent text-charcoal text-[12px] uppercase tracking-[0.18em] font-bold btn-tactile shadow-xl hover:bg-white hover:text-charcoal transition-all cursor-pointer"
            >
              Start a Project Catalog Order
            </button>
            <a
              href="https://www.upwork.com/freelancers/julkarnaeem"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 border border-white/20 text-white text-[12px] uppercase tracking-[0.18em] font-bold hover:bg-white hover:text-charcoal transition-all cursor-pointer"
            >
              <UpworkIcon size={16} className="text-[#6FDA44]" />
              Hire on Upwork
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
