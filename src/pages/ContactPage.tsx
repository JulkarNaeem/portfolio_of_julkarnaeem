import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { LinkedInIcon } from '../components/SocialIcons';
import { useCms } from '../context/CmsContext';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate: _onNavigate }: ContactPageProps) {
  const { content } = useCms();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: '',
      message: '',
    });
    setSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0a0e17] text-white pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-mono font-bold">
            {content.contact.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
            {content.contact.title}
          </h1>
          <p className="text-base md:text-lg text-steel-light mt-4 max-w-2xl">
            {content.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-[#0a0e17] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-white mb-6">
                Project Inquiry
              </h2>
              <p className="text-steel-light text-sm leading-relaxed mb-8">
                Share your project scope, drawings, or specifications, and I'll provide a clear timeline and approach for your steel detailing needs.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-mono text-accent mb-1">Email</p>
                    <p className="text-sm text-white font-semibold">
                      {content.contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-mono text-accent mb-1">Location</p>
                    <p className="text-sm text-white font-semibold">
                      {content.contact.location}
                    </p>
                    <p className="text-xs text-steel-light">
                      {content.contact.remoteNotice}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                    <LinkedInIcon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-mono text-accent mb-1">LinkedIn</p>
                    <a href="#" className="text-sm text-white font-semibold hover:text-accent transition-colors">
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* What to include */}
              <div className="mt-10 pt-10 border-t border-white/10">
                <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider mb-4">
                  What to Include
                </h3>
                <div className="space-y-3">
                  {[
                    'Project type & structure description',
                    'Approximate tonnage or scope',
                    'Available drawings (GA, structural)',
                    'Deliverable requirements',
                    'Timeline expectations',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-steel-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-[#121824] border border-white/10 p-12 text-center">
                  <div className="w-16 h-16 bg-accent/10 border border-accent/40 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Message Sent Successfully</h3>
                  <p className="text-steel-light text-sm max-w-md mx-auto">
                    Thank you for your inquiry. I'll review your project details and get back to you within 24 hours with a response.
                  </p>
                  <button
                    onClick={handleReset}
                    className="btn-clicky mt-6 px-6 py-3 bg-accent text-charcoal font-bold text-[12px] uppercase tracking-[0.15em] hover:bg-white transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#121824] border border-white/10 p-8 lg:p-12 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-8">Send a Project Inquiry</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-accent font-mono font-bold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0a0e17] border border-white/20 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-accent font-mono font-bold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0a0e17] border border-white/20 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                        placeholder="email@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-accent font-mono font-bold mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0a0e17] border border-white/20 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-accent font-mono font-bold mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0a0e17] border border-white/20 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                      >
                        <option value="">Select project type</option>
                        <option value="structural-steel">Structural Steel Detailing</option>
                        <option value="peb">PEB / Industrial Building</option>
                        <option value="platform">Platform / Access Structure</option>
                        <option value="connection">Connection Detailing</option>
                        <option value="shop-drawings">Shop Drawing Production</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-[10px] uppercase tracking-wider text-accent font-mono font-bold mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0a0e17] border border-white/20 text-white text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Describe your project scope, tonnage, deliverables needed, timeline, and any other relevant details..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-clicky group inline-flex items-center gap-2 px-8 py-4 bg-accent text-charcoal text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.25)]"
                  >
                    Send Inquiry
                    <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
