import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Phone, Clock } from 'lucide-react';
import { LinkedInIcon, UpworkIcon, BehanceIcon, PinterestIcon, WhatsAppIcon } from '../components/SocialIcons';
import { useCms } from '../context/CmsContext';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const WA_NUMBER = '8801739411586';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

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
    const text = encodeURIComponent(
      `Hi Julkar! I found your portfolio and have a project inquiry.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Company:* ${formData.company || '—'}\n` +
      `*Project Type:* ${formData.projectType || '—'}\n\n` +
      `*Details:*\n${formData.message}`
    );
    window.open(`${WA_BASE}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
    setSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { Icon: LinkedInIcon,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/julkarnaeem/', color: '#0A66C2' },
    { Icon: UpworkIcon,    label: 'Upwork',    href: 'https://www.upwork.com/freelancers/julkarnaeem', color: '#6FDA44' },
    { Icon: BehanceIcon,   label: 'Behance',   href: 'https://www.behance.net/julkarnaeem', color: '#1769FF' },
    { Icon: PinterestIcon, label: 'Pinterest', href: 'https://www.pinterest.com/julkar_naeem', color: '#E60023' },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-charcoal pt-32 pb-16 lg:pt-36 lg:pb-20 text-white relative overflow-hidden cad-grid-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">
            {content.contact.badge || 'Get in Touch'}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
            {content.contact.title || 'Contact Julkar Naeem'}
          </h1>
          <p className="text-base sm:text-lg text-steel-light mt-4 max-w-2xl leading-relaxed">
            {content.contact.subtitle}
          </p>
          <a
            href={`${WA_BASE}?text=${encodeURIComponent('Hi Julkar! I would like to book a quick call to discuss a steel detailing project.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-[12px] uppercase tracking-[0.16em] font-bold btn-tactile shadow-xl hover:bg-[#1ebe5d] transition-all duration-300"
          >
            <WhatsAppIcon size={16} />
            Book a Call via WhatsApp
          </a>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">Direct Channels</span>
                <h2 className="text-2xl font-extrabold text-charcoal mt-1 mb-4 tracking-tight">
                  Project Inquiry Details
                </h2>
                <p className="text-steel text-sm leading-relaxed mb-8">
                  Share your project scope, drawings, or specifications, and I will provide a clear estimate, turnaround timeline, and deliverable list.
                </p>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 bg-surface border border-border">
                    <div className="w-10 h-10 bg-white border border-border flex items-center justify-center text-accent flex-shrink-0 shadow-xs">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-steel font-mono font-medium">Direct Email</p>
                      <a href="mailto:hello@julkarnaeem.com" className="text-sm font-bold text-charcoal hover:text-accent transition-colors">
                        hello@julkarnaeem.com
                      </a>
                    </div>
                  </div>

                  {/* Location & Timezone */}
                  <div className="flex items-start gap-4 p-4 bg-surface border border-border">
                    <div className="w-10 h-10 bg-white border border-border flex items-center justify-center text-accent flex-shrink-0 shadow-xs">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-steel font-mono font-medium">Location</p>
                      <p className="text-sm font-bold text-charcoal">Dhaka, Bangladesh</p>
                      <p className="text-xs text-steel">Remote Worldwide (UTC +6)</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4 p-4 bg-surface border border-border">
                    <div className="w-10 h-10 bg-white border border-border flex items-center justify-center text-[#25D366] flex-shrink-0 shadow-xs">
                      <WhatsAppIcon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-steel font-mono font-medium">Instant Messaging</p>
                      <a href={WA_BASE} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-charcoal hover:text-[#25D366] transition-colors">
                        +880 1739-411586
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3">Professional Profiles</p>
                <div className="flex gap-3">
                  {socialLinks.map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-surface border border-border flex items-center justify-center text-charcoal hover:bg-accent hover:border-accent hover:text-charcoal transition-all duration-200 shadow-xs"
                      title={label}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-surface border border-border p-8 lg:p-10 shadow-xl cad-corner-box">
                <span className="text-[10px] uppercase font-mono font-bold text-accent tracking-widest block mb-1">Interactive Form</span>
                <h3 className="text-xl font-bold text-charcoal mb-6">Send a Project Brief</h3>

                {submitted ? (
                  <div className="text-center py-12 space-y-4 animate-scale-in">
                    <div className="w-14 h-14 bg-[#22c55e]/10 text-[#22c55e] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-charcoal">Inquiry Ready!</h4>
                    <p className="text-sm text-steel max-w-md mx-auto">
                      Your message has been compiled into WhatsApp. If your chat didn't open automatically, click the button below.
                    </p>
                    <div className="flex justify-center gap-3 pt-4">
                      <button
                        onClick={handleReset}
                        className="px-6 py-2.5 bg-surface border border-border text-charcoal text-xs uppercase font-bold tracking-wider hover:bg-surface-alt transition-all"
                      >
                        Send Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1.5 font-mono">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. John Smith"
                          className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm text-charcoal transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1.5 font-mono">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm text-charcoal transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1.5 font-mono">
                          Company / Fabricator
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Company Ltd."
                          className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm text-charcoal transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1.5 font-mono">
                          Structure Type
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm text-charcoal transition-all"
                        >
                          <option value="">Select Project Type</option>
                          <option value="PEB Building / Warehouse">PEB Building / Warehouse</option>
                          <option value="Industrial Shed / Platform">Industrial Shed / Platform</option>
                          <option value="Multi-storey Structural Steel">Multi-storey Structural Steel</option>
                          <option value="Stairs, Platforms & Handrails">Stairs, Platforms & Handrails</option>
                          <option value="Bridge / Infrastructure Steel">Bridge / Infrastructure Steel</option>
                          <option value="Connection Detailing Only">Connection Detailing Only</option>
                          <option value="Other Steel Scope">Other Steel Scope</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-1.5 font-mono">
                        Project Scope & Requirements *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe approximate tonnage, design drawings available, required timeline..."
                        className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-sm text-charcoal transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-charcoal text-white text-[12px] uppercase tracking-[0.18em] font-bold btn-tactile-dark shadow-xl hover:bg-accent hover:text-charcoal transition-all duration-300 cursor-pointer"
                    >
                      <Send size={15} />
                      Send Inquiry via WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
