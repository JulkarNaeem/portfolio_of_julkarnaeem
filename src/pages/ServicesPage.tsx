import {
  ArrowRight,
  Wrench,
  Building2,
  ClipboardList,
  Link2,
  BarChart3,
  Footprints,
  CheckCircle,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, any> = {
  Wrench: Wrench,
  Building2: Building2,
  ClipboardList: ClipboardList,
  Link2: Link2,
  BarChart3: BarChart3,
  Footprints: Footprints,
};

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { content } = useCms();
  const services = content.services;

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0a0e17] text-white pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-mono font-bold">What I Do</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
            Detailing Services & Deliverables
          </h1>
          <p className="text-base md:text-lg text-steel-light mt-4 max-w-2xl">
            End-to-end steel structure detailing using Tekla Structures — from 3D BIM modeling to fabrication-ready shop drawings, NC/DSTV data, and material bolt reports.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-[#0a0e17] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-10">
            {services.map((svc, i) => {
              const IconComponent = iconMap[svc.iconName] || Wrench;
              return (
                <div
                  key={svc.id || i}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-10 bg-[#121824] border border-white/10 hover:border-accent/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.1)]"
                >
                  <div className="lg:col-span-1">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-4">
                      <IconComponent size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{svc.title}</h3>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-sm text-steel-light leading-relaxed mb-6">{svc.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.includes.map((item, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <CheckCircle size={14} className="text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-white font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Software & Tools */}
      <section className="bg-[#0f172a] text-white border-t border-white/10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-mono font-bold">Industry Stack</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
              Software & Standards
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Tekla Structures 2025', type: 'Primary BIM Software' },
              { name: 'AutoCAD', type: 'Support Drafting' },
              { name: 'AISC / NISD', type: 'Connection Standards' },
              { name: 'IFC / DSTV / NC', type: 'Direct CNC Output' },
            ].map((tool, i) => (
              <div key={i} className="bg-[#161e2e] border border-white/10 p-6 text-center hover:border-accent/40 transition-colors">
                <p className="font-bold text-white text-sm mb-1">{tool.name}</p>
                <p className="text-[10px] text-accent uppercase tracking-wider font-mono">{tool.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0e17] text-white border-t border-white/10 py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Start Your Steel Project?
          </h2>
          <p className="text-steel-light mb-8">
            Share your project details and let's discuss how I can help with your steel detailing needs.
          </p>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-clicky group inline-flex items-center gap-2 px-8 py-4 bg-accent text-charcoal text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.25)]"
          >
            Get in Touch
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </>
  );
}
