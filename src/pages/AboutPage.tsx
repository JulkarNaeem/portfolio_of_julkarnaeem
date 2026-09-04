import { ArrowRight, Award, ExternalLink, MapPin, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../components/SocialIcons';
import { portfolioData } from '../data/portfolioData';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const CERTIFICATIONS = [
  {
    title: 'Tekla Structures Steel Fundamentals',
    provider: 'Trimble Solutions',
    issued: 'May 2025 · Credential ID: 144852093',
    credentialUrl: 'https://credentials.tekla.com/5f3110c9-0e39-4f2e-ae5b-74eb43e03acf#acc.Lp7oBXI4',
    badge: 'TRIMBLE',
    color: '#F5C400',
  },
  {
    title: 'AISC Detailer Training Series',
    provider: 'AISC (American Institute of Steel Construction)',
    issued: 'March 2025',
    credentialUrl: 'https://dts.aisc.org/courses/dts/',
    badge: 'AISC',
    color: '#164E80',
  },
];

const SOFTWARE = [
  {
    name: 'Tekla Structures 2025',
    vendor: 'Trimble',
    category: 'Primary BIM Software',
    badge: 'Expert · Certified',
    img: '/images/icons/tekla.jpg',
  },
  {
    name: 'Autodesk AutoCAD',
    vendor: 'Autodesk',
    category: '2D Drafting & GA Plans',
    badge: 'Advanced',
    img: '/images/icons/autocad.jpg',
  },
];

const EXPERIENCE = [
  {
    role: 'Sr. Detailing Engineer',
    company: 'SES Steel Structure Ltd, Dhaka',
    period: 'Feb 2025 – Present',
    current: true,
    responsibilities: [
      'Lead and manage the structural steel detailing workflow using Tekla Structures 2025 for industrial & PEB projects.',
      'Produce fabrication-ready 3D BIM models with millimeter precision adhering to AISC and CISC standards.',
      'Deliver complete fabrication shop drawings, GA erection plans, anchor bolt layouts, and automated BOM reports.',
    ],
  },
  {
    role: 'Detailing Engineer',
    company: 'SES Steel Structure Ltd',
    period: 'Feb 2023 – Feb 2025',
    current: false,
    responsibilities: [
      'Developed 3D models and shop drawings for industrial sheds, platforms, and steel frames.',
      'Extracted NC and DSTV machine files for CNC cutting, drilling, and plate fabrication.',
      'Resolved connection clashes and coordinated detailing queries with project engineering teams.',
    ],
  },
  {
    role: 'Detailing Engineer',
    company: 'NDE Steel Structures Ltd',
    period: 'Feb 2022 – Feb 2023',
    current: false,
    responsibilities: [
      'Detailed steel structures using Tekla Structures and AutoCAD in accordance with project specifications.',
      'Prepared single-part, assembly, and erection drawings with full welding and bolting details.',
      'Ensured all drawing deliverables matched fabrication and site erection requirements.',
    ],
  },
  {
    role: 'Quality Assurance Engineer',
    company: 'Confidence Steel Ltd',
    period: 'Nov 2017 – Nov 2019',
    current: false,
    responsibilities: [
      'Inspected daily fabrication of structural steel members to enforce quality, dimensional, and weld integrity standards.',
      'Checked fit-up clearance, bolt holes, and weld preparations before dispatch and erection.',
      'Coordinated shop floor quality compliance to prevent site fit-up and erection clashes.',
    ],
  },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const content = portfolioData;

  return (
    <>
      {/* Page Header */}
      <section className="bg-charcoal pt-32 pb-16 lg:pt-36 lg:pb-20 text-white relative overflow-hidden cad-grid-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-safety-yellow font-bold font-mono">Profile & Background</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
            {content.about.name || content.profileName}
          </h1>
          <p className="text-base sm:text-lg text-[#F3F4F6]/90 mt-4 max-w-2xl leading-relaxed">
            {content.about.subtitle}
          </p>
        </div>
      </section>

      {/* Main Bio + Image Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Photo & Badges */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-border bg-surface overflow-hidden shadow-2xl cad-corner-box group">
                <img
                  src={content.about.portraitImg || '/images/about-portrait.jpg'}
                  alt={content.profileName}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>

              {/* Verified Credentials Box */}
              <div className="p-6 bg-surface border border-border space-y-4 shadow-sm">
                <span className="text-[11px] uppercase tracking-[0.2em] text-steel-blue font-bold font-mono">
                  Verified Certifications
                </span>
                {CERTIFICATIONS.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-white border border-border hover:border-steel-blue hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <Award size={18} className="text-steel-blue flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-charcoal group-hover:text-steel-blue transition-colors">{cert.title}</p>
                        <p className="text-[10px] text-charcoal/70 font-mono">{cert.provider} · {cert.issued}</p>
                      </div>
                    </div>
                    <ExternalLink size={13} className="text-steel-blue/60 group-hover:text-steel-blue transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Bio Content */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-steel-blue font-bold">About Detailer</span>
                <h2 className="text-3xl font-extrabold text-charcoal mt-2 mb-3 tracking-tight">
                  High-Precision Steel Detailing for Global Fabricators
                </h2>
                <p className="text-charcoal/80 text-sm flex items-center gap-1.5 font-medium mb-6">
                  <MapPin size={14} className="text-steel-blue" />
                  Dhaka, Bangladesh · Remote Detailing Worldwide
                </p>
                <div className="space-y-4 text-charcoal/80 leading-relaxed text-base">
                  {content.about.bioParagraphs && content.about.bioParagraphs.length > 0 ? (
                    content.about.bioParagraphs.map((para, i) => <p key={i}>{para}</p>)
                  ) : (
                    <p>
                      I am Julkar Naeem, a Steel Structure Detailer based in Dhaka, Bangladesh, with 9+ years of professional experience specializing in Tekla Structures.
                    </p>
                  )}
                </div>

                {/* Standards & Compliance Block (B2) */}
                <div className="p-4 bg-surface border-l-4 border-safety-yellow border-t border-r border-b border-border">
                  <p className="text-xs uppercase font-mono tracking-wider font-bold text-steel-blue mb-1">
                    Standards &amp; Compliance
                  </p>
                  <p className="text-sm font-semibold text-charcoal">
                    I detail to AISC and CISC practice, following your engineer's design and the project specification.
                  </p>
                </div>
              </div>

              {/* Quote Block */}
              {content.about.quoteText && (
                <div className="p-6 bg-charcoal text-white border-l-4 border-safety-yellow shadow-lg">
                  <p className="text-base italic text-[#F3F4F6]/90 leading-relaxed">
                    "{content.about.quoteText}"
                  </p>
                  <p className="text-xs uppercase tracking-widest text-safety-yellow font-bold mt-2 font-mono">
                    — Julkar Naeem
                  </p>
                </div>
              )}

              {/* Software Proficiency Logos Section */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-steel-blue uppercase tracking-wider font-mono">
                    Software Ecosystem
                  </h3>
                  <span className="text-[10px] uppercase font-mono text-charcoal/70">Industry Standard BIM Tools</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SOFTWARE.map((sw, i) => (
                    <div
                      key={i}
                      className="p-4 bg-surface border border-border hover:border-steel-blue hover:bg-white hover:shadow-md transition-all duration-300 flex items-center gap-3.5 group cad-corner-box cursor-default"
                    >
                      {/* Software Brand Logo Icon */}
                      <div className="w-12 h-12 flex-shrink-0 bg-white border border-border p-1.5 flex items-center justify-center shadow-xs overflow-hidden rounded-xs">
                        <img
                          src={sw.img}
                          alt={sw.name}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* Info & Category */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-extrabold text-charcoal truncate group-hover:text-steel-blue transition-colors">
                            {sw.name}
                          </p>
                        </div>
                        <p className="text-[10px] text-charcoal/70 font-mono truncate">{sw.vendor} · {sw.category}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-white border border-border text-[9px] uppercase font-mono font-bold text-steel-blue">
                          {sw.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── VIDEO INTRODUCTION SPOTLIGHT ─── */}
      <section className="bg-charcoal text-white py-16 lg:py-20 border-t border-white/10 cad-grid-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-5/12 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-safety-yellow font-bold font-mono">
                Video Introduction
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Watch My Detailer Introduction
              </h2>
              <p className="text-sm text-[#F3F4F6]/90 leading-relaxed">
                Get an inside look into my background, BIM modeling approach in Tekla Structures, and dedication to delivering accurate fabrication drawings for steel contractors worldwide.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/8801739411586?text=Hi%20Julkar!%20I%20watched%20your%20video%20intro%20and%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-safety-yellow text-charcoal text-xs uppercase tracking-widest font-bold btn-tactile hover:bg-steel-blue hover:text-white transition-all shadow-md cursor-pointer"
                >
                  <WhatsAppIcon size={16} /> Connect On WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:w-7/12 w-full">
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
          </div>
        </div>
      </section>

      {/* ─── PROFESSIONAL EXPERIENCE SECTION ─── */}
      <section className="bg-surface py-20 lg:py-28 border-t border-border cad-grid-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-steel-blue font-bold">Career History & Milestones</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mt-1 tracking-tight">
                Professional Experience
              </h2>
              <p className="text-sm text-charcoal/80 mt-2 max-w-xl">
                Over 9+ years of hands-on structural steel detailing, quality assurance, and Tekla BIM modeling across leading steel fabrication companies.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-xs font-mono font-bold text-charcoal self-start md:self-auto shadow-xs">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-ping" />
              <span>9+ Years Total Industry Experience</span>
            </div>
          </div>

          {/* 3-Column Experience Grid spanning full width */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className={`bg-white border p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cad-corner-box hover:-translate-y-1 ${
                  exp.current
                    ? 'border-steel-blue shadow-2xl ring-1 ring-steel-blue/30'
                    : 'border-border hover:border-steel-blue hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Top Header & Period Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-border">
                    <span className={`px-2.5 py-1 text-[10px] uppercase font-mono font-bold tracking-wider ${
                      exp.current
                        ? 'bg-steel-blue text-white shadow-xs'
                        : 'bg-surface text-charcoal/70 border border-border'
                    }`}>
                      {exp.period}
                    </span>
                    {exp.current && (
                      <span className="text-[10px] uppercase font-mono font-bold text-[#22c55e] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
                        Current
                      </span>
                    )}
                  </div>

                  {/* Role & Company */}
                  <h3 className="text-xl font-bold text-charcoal mb-1 tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="text-xs uppercase font-mono font-bold text-steel-blue tracking-wider mb-6">
                    {exp.company}
                  </p>

                  {/* Responsibilities Checklist */}
                  <ul className="space-y-3 mb-6">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs text-charcoal/80 leading-relaxed">
                        <CheckCircle2 size={15} className="text-steel-blue flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Badges */}
                <div className="pt-4 border-t border-border/70 flex flex-wrap gap-1.5">
                  {i === 0 && (
                    <>
                      <span className="text-[9px] uppercase font-mono bg-surface text-steel-blue font-semibold px-2 py-0.5 border border-border">Tekla 2025</span>
                      <span className="text-[9px] uppercase font-mono bg-surface text-steel-blue font-semibold px-2 py-0.5 border border-border">AISC Standards</span>
                      <span className="text-[9px] uppercase font-mono bg-surface text-steel-blue font-semibold px-2 py-0.5 border border-border">BOM & CNC</span>
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <span className="text-[9px] uppercase font-mono bg-surface text-steel-blue font-semibold px-2 py-0.5 border border-border">3D BIM Modeling</span>
                      <span className="text-[9px] uppercase font-mono bg-surface text-steel-blue font-semibold px-2 py-0.5 border border-border">AutoCAD 2D</span>
                      <span className="text-[9px] uppercase font-mono bg-surface text-steel-blue font-semibold px-2 py-0.5 border border-border">Shop Drawings</span>
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <span className="text-[9px] uppercase font-mono bg-surface text-steel-blue font-semibold px-2 py-0.5 border border-border">QA & Inspection</span>
                      <span className="text-[9px] uppercase font-mono bg-surface text-steel-blue font-semibold px-2 py-0.5 border border-border">Weld Verification</span>
                      <span className="text-[9px] uppercase font-mono bg-surface text-steel-blue font-semibold px-2 py-0.5 border border-border">Erection QA</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Career Stats Strip */}
          <div className="mt-12 p-6 bg-white border border-border shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-extrabold text-charcoal font-mono">150+</p>
              <p className="text-[10px] uppercase font-mono text-charcoal/70 tracking-wider">Projects Detailing</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-steel-blue font-mono">9+ Yrs</p>
              <p className="text-[10px] uppercase font-mono text-charcoal/70 tracking-wider">Tekla Experience</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-charcoal font-mono">Worldwide</p>
              <p className="text-[10px] uppercase font-mono text-charcoal/70 tracking-wider">Clients Served</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#22c55e] font-mono">100%</p>
              <p className="text-[10px] uppercase font-mono text-charcoal/70 tracking-wider">Fabrication Accuracy</p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-charcoal text-white py-20 border-t border-white/10 text-center relative cad-grid-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
            Let's Collaborate on Your Steel Structure
          </h2>
          <p className="text-[#F3F4F6]/90 mb-8 text-base">
            Get accurate, fabrication-ready drawings and Tekla BIM models delivered with clear timelines.
          </p>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-safety-yellow text-charcoal text-[12px] uppercase tracking-[0.16em] font-bold btn-tactile shadow-xl hover:bg-steel-blue hover:text-white transition-all duration-300 cursor-pointer"
          >
            Contact Julkar Naeem
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </section>
    </>
  );
}
