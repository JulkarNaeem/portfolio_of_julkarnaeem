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
      <section className="bg-[#f8fafc] text-slate-900 pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-600 font-mono font-bold">
            {content.contact.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {content.contact.title}
          </h1>
          <p className="text-base md:text-lg text-slate-600 mt-4 max-w-2xl">
            {content.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-white text-slate-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Project Inquiry
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Share your project scope, drawings, or specifications, and I'll provide a clear timeline and approach for your steel detailing needs.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-mono text-emerald-600 font-bold mb-1">Email</p>
                    <p className="text-sm text-slate-900 font-bold">
                      {content.contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-mono text-emerald-600 font-bold mb-1">Location</p>
                    <p className="text-sm text-slate-900 font-bold">
                      {content.contact.location}
                    </p>
                    <p className="text-xs text-slate-500">
                      {content.contact.remoteNotice}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <LinkedInIcon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-mono text-emerald-600 font-bold mb-1">LinkedIn</p>
                    <a href="#" className="text-sm text-slate-900 font-bold hover:text-emerald-600 transition-colors">
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* What to include */}
              <div className="mt-10 pt-10 border-t border-slate-200/80">
                <h3 className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider mb-4">
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
                      <CheckCircle size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-12 text-center shadow-lg">
                  <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Message Sent Successfully</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you for your inquiry. I'll review your project details and get back to you within 24 hours with a response.
                  </p>
                  <button
                    onClick={handleReset}
                    className="btn-clicky mt-6 px-7 py-3.5 bg-emerald-500 text-white font-bold text-[12px] uppercase tracking-[0.15em] hover:bg-emerald-600 transition-all rounded-xl shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-8 lg:p-12 shadow-xl">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-8">Send a Project Inquiry</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-700 font-mono font-bold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500 rounded-xl transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-700 font-mono font-bold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500 rounded-xl transition-colors"
                        placeholder="email@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-700 font-mono font-bold mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500 rounded-xl transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-700 font-mono font-bold mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500 rounded-xl transition-colors"
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
                    <label className="block text-[10px] uppercase tracking-wider text-slate-700 font-mono font-bold mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500 rounded-xl transition-colors resize-none"
                      placeholder="Describe your project scope, tonnage, deliverables needed, timeline, and any other relevant details..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-clicky group inline-flex items-center gap-2 px-9 py-4 bg-emerald-500 text-white text-[12px] uppercase tracking-[0.15em] font-extrabold hover:bg-emerald-600 transition-all duration-300 rounded-xl shadow-xl shadow-emerald-500/25"
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
