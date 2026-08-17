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
      <section className="bg-charcoal pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">What I Do</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 tracking-tight">
            Services
          </h1>
          <p className="text-lg text-steel-light mt-4 max-w-2xl">
            I provide end-to-end steel structure detailing using Tekla Structures — from BIM modeling to fabrication-ready shop drawings and material reports.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((svc, i) => {
              const IconComponent = iconMap[svc.iconName] || Wrench;
              return (
                <div
                  key={svc.id || i}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-12 border border-border hover:border-accent/30 transition-colors"
                >
                  <div className="lg:col-span-1">
                    <div className="text-accent mb-4">
                      <IconComponent size={28} />
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal">{svc.title}</h3>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-steel leading-relaxed mb-6">{svc.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.includes.map((item, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle size={14} className="text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-charcoal">{item}</span>
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
      <section className="bg-surface border-t border-border py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">Tools</span>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mt-2 tracking-tight">
              Software & Standards
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Tekla Structures 2025', type: 'Primary BIM Software' },
              { name: 'AutoCAD', type: 'Support Drafting' },
              { name: 'AISC / NSCP', type: 'Connection Standards' },
              { name: 'IFC / DSTV', type: 'Data Exchange Formats' },
            ].map((tool, i) => (
              <div key={i} className="bg-white border border-border p-6 text-center">
                <p className="font-semibold text-charcoal text-sm mb-1">{tool.name}</p>
                <p className="text-[11px] text-steel uppercase tracking-wider">{tool.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-border py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4 tracking-tight">
            Ready to Start Your Steel Project?
          </h2>
          <p className="text-steel mb-8">
            Share your project details and let's discuss how I can help with your steel detailing needs.
          </p>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-charcoal text-[12px] uppercase tracking-[0.15em] font-semibold hover:bg-charcoal hover:text-white transition-all duration-300"
          >
            Get in Touch
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </>
  );
}
