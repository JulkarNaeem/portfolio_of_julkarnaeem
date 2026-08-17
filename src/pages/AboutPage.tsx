import { ArrowRight, CheckCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const { content } = useCms();

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#f8fafc] text-slate-900 pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-mono font-bold">About Detailer</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {content.about.name || content.profileName}
          </h1>
          <p className="text-base md:text-lg text-slate-600 mt-4 max-w-2xl">
            {content.about.subtitle}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-white text-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="relative group">
              <div className="absolute -top-3 -right-3 w-full h-full border-2 border-emerald-500/30 rounded-2xl z-0" />
              <img
                src="/images/about-portrait.jpg"
                alt="Julkar Naeem"
                className="w-full max-w-lg aspect-[3/4] object-cover relative z-10 border border-slate-200/80 shadow-2xl rounded-2xl"
              />
              <div className="mt-8 flex gap-6 p-4 bg-[#f8fafc] border border-slate-200/80 rounded-2xl relative z-10">
                <div>
                  <p className="text-3xl font-extrabold text-emerald-600 font-mono">1,200+</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-bold">Tons Detailed</p>
                </div>
                <div className="w-[1px] bg-slate-200" />
                <div>
                  <p className="text-3xl font-extrabold text-slate-900 font-mono">Tekla 2025</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-bold">BIM Engine</p>
                </div>
                <div className="w-[1px] bg-slate-200" />
                <div>
                  <p className="text-3xl font-extrabold text-emerald-600 font-mono">LOD 400</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-bold">Precision</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Precision in Every Steel Connection
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  I am Julkar Naeem, a Steel Structure Detailer specializing in Tekla Structures. I focus on clean, organized, fabrication-oriented steel models and drawings that help fabricators and contractors execute with clarity.
                </p>
                <p>
                  With over 150 successfully completed steel structure projects, I've worked across a wide range of structural typologies — from PEB buildings and industrial sheds to multi-storey steel buildings, platforms, walkways, stairs, handrails, grating, bridges, and complex steel accessories.
                </p>
                <p>
                  My core offer is simple: fabrication-ready BIM models combined with clear shop drawings, GA drawings, and connection details. Every model I build is organized for easy fabrication extraction, and every drawing I produce is designed to minimize questions on the shop floor.
                </p>
                <p>
                  I work directly with steel fabricators, contractors, structural engineers, PEB companies, and industrial clients who need accurate steel detailing they can rely on.
                </p>
              </div>

              {/* Skills */}
              <div className="mt-10 pt-10 border-t border-slate-200/80">
                <h3 className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider mb-6">
                  Core Competencies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Tekla Structures BIM Modeling',
                    'Steel Connection Detailing',
                    'Shop Drawing Production',
                    'GA Drawing Layouts',
                    'Material Take-Off Reports',
                    'PEB Building Detailing',
                    'Industrial Platform Design',
                    'Stair & Handrail Systems',
                    'Bridge Steel Detailing',
                    'Multi-storey Framing',
                  ].map((skill, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle size={14} className="text-emerald-600 flex-shrink-0" />
                      <span className="text-xs text-slate-800 font-bold">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div className="mt-10 pt-10 border-t border-slate-200/80">
                <h3 className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider mb-6">
                  Project Focus Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'PEB Buildings',
                    'Industrial Steel Structures',
                    'Sheds',
                    'Multi-storey Steel Buildings',
                    'Platforms',
                    'Walkways',
                    'Stairs',
                    'Handrails',
                    'Grating',
                    'Bridges',
                    'Steel Accessories',
                  ].map((area, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#f8fafc] border border-slate-200 text-[10px] uppercase tracking-wider text-slate-800 font-semibold font-mono hover:border-emerald-500/40 transition-colors rounded-md"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-slate-900 text-white py-20 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-emerald-400 text-4xl font-serif">"</span>
          <p className="text-xl md:text-2xl text-white leading-relaxed font-light mt-2">
            Good steel detailing isn't about making impressive models — it's about making models that fabricators can trust and build from without confusion.
          </p>
          <p className="text-emerald-400 font-mono text-xs mt-6 uppercase tracking-wider font-bold">— Julkar Naeem</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white text-slate-900 py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-slate-600 mb-8">
            Have a project that needs steel detailing? I'd love to discuss how I can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-clicky group inline-flex items-center justify-center gap-2 px-9 py-4 bg-emerald-500 text-white text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-emerald-600 transition-all duration-300 rounded-xl shadow-xl shadow-emerald-500/25"
            >
              Contact Me
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                onNavigate('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-clicky group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-800 font-bold text-[12px] uppercase tracking-[0.15em] hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 rounded-xl shadow-xs"
            >
              View Projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
