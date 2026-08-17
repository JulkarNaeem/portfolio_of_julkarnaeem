import { ArrowRight, CheckCircle, Award, ExternalLink } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const CERTIFICATIONS = [
  {
    title: 'Tekla Structures Steel Fundamentals',
    provider: 'Tekla (Trimble)',
    issued: 'May 2025',
    credentialUrl: 'https://credentials.tekla.com/5f3110c9-0e39-4f2e-ae5b-74eb43e03acf#acc.Lp7oBXI4',
    badge: 'TEKLA',
    color: '#e8b100',
  },
  {
    title: 'Detailer Training Series (DTS)',
    provider: 'AISC (American Institute of Steel Construction)',
    issued: 'March 2025',
    credentialUrl: 'https://dts.aisc.org/courses/dts/',
    badge: 'AISC',
    color: '#2563eb',
  },
];

const SOFTWARE = [
  { name: 'Tekla Structures 2025', level: 95, category: 'Primary' },
  { name: 'AutoCAD', level: 85, category: 'Drafting' },
  { name: 'Revit', level: 70, category: 'BIM' },
  { name: 'Advance Steel', level: 65, category: 'Modeling' },
  { name: 'STAAD.Pro', level: 50, category: 'Analysis' },
  { name: 'Navisworks', level: 60, category: 'Coordination' },
  { name: 'SketchUp', level: 55, category: 'Visualization' },
  { name: 'MS Office / Excel', level: 90, category: 'Reporting' },
];

const STATS = [
  { value: '150+', label: 'Projects Completed' },
  { value: '9+',   label: 'Years Experience' },
  { value: '4+',   label: 'Countries Served' },
  { value: '2025', label: 'Tekla Version' },
];

const EXPERIENCE = [
  {
    role: 'Sr. Structural Steel Detailer',
    company: 'SES Steel Structure Ltd.',
    period: 'Feb 2023 — Present',
    current: true,
    responsibilities: [
      'Led and managed the steel detailing process using Tekla Structures and AutoCAD for various projects.',
      'Produced precise 3D models, ensuring accuracy and adherence to project specifications.',
      'Generated comprehensive fabrication drawings with detailed dimensions, welding information, and material specifications.',
      'Developed accurate Bills of Materials (BOMs) to streamline material procurement and production.',
      'Collaborated with engineers, fabricators, and erection teams for seamless project execution.',
    ],
  },
  {
    role: 'Structural Steel Detailer',
    company: 'NDE Steel Structure Ltd.',
    period: 'Feb 2022 — Feb 2023',
    current: false,
    responsibilities: [
      'Created detailed 3D models of steel structures using Tekla Structures and AutoCAD.',
      'Developed fabrication drawings and BOMs in accordance with project requirements and industry standards.',
      'Ensured accuracy and quality of detailing outputs for efficient steel structure production.',
    ],
  },
  {
    role: 'Quality Assurance Engineer',
    company: 'Confidence Steel Structure Ltd.',
    period: 'Nov 2017 — Dec 2019',
    current: false,
    responsibilities: [
      'Monitored daily production of steel structures to ensure adherence to quality standards.',
      'Conducted inspections to identify and rectify defects in fabricated steel members.',
      'Verified defect-free structures for dispatch and erection.',
    ],
  },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const { content } = useCms();

  return (
    <>
      {/* Page Header */}
      <section className="bg-charcoal pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">About</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 tracking-tight">
            {content.about.name || content.profileName}
          </h1>
          <p className="text-lg text-steel-light mt-4 max-w-2xl">
            {content.about.subtitle}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-accent py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-charcoal font-mono">{s.value}</p>
                <p className="text-[11px] uppercase tracking-wider text-charcoal/70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image + Location card */}
            <div>
              <img
                src="/images/about-portrait.jpg"
                alt="Julkar Naeem"
                className="w-full max-w-lg aspect-[3/4] object-cover"
              />
              {/* Location badge */}
              <div className="mt-4 flex items-center gap-3 p-4 bg-surface border border-border">
                <span className="text-2xl">🇧🇩</span>
                <div>
                  <p className="text-sm font-semibold text-charcoal">Dhaka, Bangladesh</p>
                  <p className="text-xs text-steel">UTC+6 · Remote worldwide delivery</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6 tracking-tight">
                Precision in Every Detail
              </h2>
              <div className="space-y-4 text-steel leading-relaxed">
                {content.about.bioParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Skills */}
              <div className="mt-10 pt-10 border-t border-border">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-6">
                  Core Competencies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.about.competencies.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span className="text-sm text-charcoal">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>



            </div>
          </div>
        </div>
      </section>
      {/* Work Experience */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">Career</span>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mt-2 tracking-tight">
              Work Experience
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-[140px] top-0 bottom-0 w-px bg-border" />

            <div className="space-y-0">
              {EXPERIENCE.map((job, i) => (
                <div key={i} className="relative flex flex-col md:flex-row gap-0 md:gap-10">

                  {/* Period column (left side on md+) */}
                  <div className="hidden md:flex flex-col items-end w-[140px] flex-shrink-0 pt-6 pr-8">
                    <span className="text-[11px] uppercase tracking-wider text-steel text-right leading-snug">
                      {job.period}
                    </span>
                    {job.current && (
                      <span className="mt-2 px-2 py-0.5 bg-accent text-charcoal text-[9px] uppercase tracking-wider font-bold">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Dot on the timeline */}
                  <div className="absolute left-[-4px] md:left-[136px] mt-8 w-2.5 h-2.5 rounded-full border-2 border-accent bg-white flex-shrink-0" />

                  {/* Content card */}
                  <div className="ml-6 md:ml-10 pb-10 flex-1">
                    <div className="bg-white border border-border p-6 hover:border-accent transition-colors duration-200 group">
                      {/* Mobile period */}
                      <div className="flex items-center gap-3 mb-3 md:hidden">
                        <span className="text-[11px] uppercase tracking-wider text-steel">{job.period}</span>
                        {job.current && (
                          <span className="px-2 py-0.5 bg-accent text-charcoal text-[9px] uppercase tracking-wider font-bold">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Role & Company */}
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                        <h3 className="text-base font-bold text-charcoal">{job.role}</h3>
                        <span className="text-steel text-sm">|</span>
                        <span className="text-sm font-semibold text-accent">{job.company}</span>
                      </div>

                      {/* Responsibilities */}
                      <ul className="space-y-2">
                        {job.responsibilities.map((point, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-accent flex-shrink-0 rounded-full" />
                            <span className="text-sm text-steel leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">Credentials</span>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mt-2 tracking-tight">
              Certifications
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="bg-white border border-border p-6 flex gap-5 group hover:border-accent transition-colors duration-200">
                <div
                  className="w-14 h-14 flex items-center justify-center flex-shrink-0 font-bold text-xs text-white"
                  style={{ backgroundColor: cert.color }}
                >
                  {cert.badge}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-charcoal text-sm leading-snug">{cert.title}</p>
                      <p className="text-xs text-steel mt-1">{cert.provider}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Award size={11} className="text-accent" />
                        <span className="text-[11px] uppercase tracking-wider text-steel">Issued {cert.issued}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-accent font-medium hover:underline"
                  >
                    View Credential <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Proficiency */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">Tools</span>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mt-2 tracking-tight">
              Software Proficiency
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOFTWARE.map((sw, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-charcoal">{sw.name}</span>
                    <span className="text-[10px] uppercase tracking-wider text-steel bg-surface border border-border px-2 py-0.5">
                      {sw.category}
                    </span>
                  </div>
                  <span className="text-xs text-steel font-mono">{sw.level}%</span>
                </div>
                <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-700"
                    style={{ width: `${sw.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-charcoal py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-accent text-4xl font-serif">"</span>
          <p className="text-xl md:text-2xl text-white leading-relaxed font-light mt-2">
            {content.about.quoteText}
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
