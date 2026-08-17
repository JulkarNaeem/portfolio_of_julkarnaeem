import { ArrowRight, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <>
      {/* Page Header */}
      <section className="bg-charcoal pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">About</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 tracking-tight">
            Julkar Naeem
          </h1>
          <p className="text-lg text-steel-light mt-4 max-w-2xl">
            Steel Structure Detailer — Tekla Structures Specialist
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div>
              <img
                src="/images/about-portrait.jpg"
                alt="Julkar Naeem"
                className="w-full max-w-lg aspect-[3/4] object-cover"
              />
              <div className="mt-6 flex gap-6">
                <div>
                  <p className="text-3xl font-bold text-charcoal font-mono">150+</p>
                  <p className="text-[11px] uppercase tracking-wider text-steel">Projects</p>
                </div>
                <div className="w-[1px] bg-border" />
                <div>
                  <p className="text-3xl font-bold text-charcoal font-mono">Tekla</p>
                  <p className="text-[11px] uppercase tracking-wider text-steel">Primary Tool</p>
                </div>
                <div className="w-[1px] bg-border" />
                <div>
                  <p className="text-3xl font-bold text-charcoal font-mono">BIM</p>
                  <p className="text-[11px] uppercase tracking-wider text-steel">Modeling</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6 tracking-tight">
                Precision in Every Detail
              </h2>
              <div className="space-y-4 text-steel leading-relaxed">
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
              <div className="mt-10 pt-10 border-t border-border">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-6">
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
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span className="text-sm text-charcoal">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div className="mt-10 pt-10 border-t border-border">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-6">
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
                      className="px-3 py-1.5 bg-surface border border-border text-[11px] uppercase tracking-wider text-charcoal font-medium"
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
      <section className="bg-charcoal py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-accent text-4xl font-serif">"</span>
          <p className="text-xl md:text-2xl text-white leading-relaxed font-light mt-2">
            Good steel detailing isn't about making impressive models — it's about making models that fabricators can trust and build from without confusion.
          </p>
          <p className="text-steel-light text-sm mt-6">— Julkar Naeem</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4 tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-steel mb-8">
            Have a project that needs steel detailing? I'd love to discuss how I can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-charcoal text-[12px] uppercase tracking-[0.15em] font-semibold hover:bg-charcoal hover:text-white transition-all duration-300"
            >
              Contact Me
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                onNavigate('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-charcoal text-charcoal text-[12px] uppercase tracking-[0.15em] font-medium hover:bg-charcoal hover:text-white transition-all duration-300"
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
