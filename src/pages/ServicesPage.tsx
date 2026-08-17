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
      <section className="bg-[#f8fafc] text-slate-900 pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-mono font-bold">What I Do</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Detailing Services & Deliverables
          </h1>
          <p className="text-base md:text-lg text-slate-600 mt-4 max-w-2xl">
            End-to-end steel structure detailing using Tekla Structures — from 3D BIM modeling to fabrication-ready shop drawings, NC/DSTV data, and material bolt reports.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-white text-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-10">
            {services.map((svc, i) => {
              const IconComponent = iconMap[svc.iconName] || Wrench;
              return (
                <div
                  key={svc.id || i}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-10 bg-white border border-slate-200/80 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="lg:col-span-1">
                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                      <IconComponent size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{svc.title}</h3>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">{svc.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.includes.map((item, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <CheckCircle size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-800 font-bold">{item}</span>
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
      <section className="bg-[#f8fafc] text-slate-900 border-t border-slate-200/80 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-mono font-bold">Industry Stack</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
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
              <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center hover:border-emerald-500/40 transition-colors shadow-xs">
                <p className="font-bold text-slate-900 text-sm mb-1">{tool.name}</p>
                <p className="text-[10px] text-emerald-600 uppercase tracking-wider font-mono font-bold">{tool.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white text-slate-900 border-t border-slate-200/80 py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Ready to Start Your Steel Project?
          </h2>
          <p className="text-slate-600 mb-8">
            Share your project details and let's discuss how I can help with your steel detailing needs.
          </p>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-clicky group inline-flex items-center gap-2 px-9 py-4 bg-emerald-500 text-white text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-emerald-600 transition-all duration-300 rounded-xl shadow-xl shadow-emerald-500/25"
          >
            Get in Touch
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </>
  );
}
