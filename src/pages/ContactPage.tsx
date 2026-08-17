import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, Phone, Clock } from 'lucide-react';
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
    // Build a WhatsApp pre-filled message
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
      <section className="bg-charcoal pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-accent font-medium">
            {content.contact.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 tracking-tight">
            {content.contact.title}
          </h1>
          <p className="text-lg text-steel-light mt-4 max-w-2xl">
            {content.contact.subtitle}
          </p>
          {/* Book a Call CTA */}
          <a
            href={`${WA_BASE}?text=${encodeURIComponent('Hi Julkar! I would like to book a quick call to discuss a steel detailing project.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-[12px] uppercase tracking-[0.15em] font-semibold hover:bg-[#1ebe5d] transition-all duration-200 shadow-lg"
          >
            <WhatsAppIcon size={16} />
            Book a Call via WhatsApp
          </a>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-charcoal mb-6">
                Project Inquiry
              </h2>
              <p className="text-steel text-sm leading-relaxed mb-8">
                Share your project scope, drawings, or specifications, and I'll provide a clear timeline and approach for your steel detailing needs.
              </p>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-surface flex items-center justify-center text-charcoal flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-steel mb-1">Email</p>
                    <a href="mailto:hello@julkarnaeem.com" className="text-sm text-charcoal font-medium hover:text-accent transition-colors block">
                      hello@julkarnaeem.com
                    </a>
                    <a href="mailto:julkarnaeem.me@gmail.com" className="text-xs text-steel hover:text-accent transition-colors">
                      julkarnaeem.me@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-surface flex items-center justify-center text-[#25D366] flex-shrink-0">
                    <WhatsAppIcon size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-steel mb-1">WhatsApp</p>
                    <a
                      href={WA_BASE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-charcoal font-medium hover:text-accent transition-colors"
                    >
                      +880 1739 411 586
                    </a>
                    <p className="text-xs text-steel mt-0.5">Click to message directly</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-surface flex items-center justify-center text-charcoal flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-steel mb-1">Location</p>
                    <p className="text-sm text-charcoal font-medium">Dhaka, Bangladesh</p>
                    <p className="text-xs text-steel">Remote delivery worldwide · UTC+6</p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-surface flex items-center justify-center text-charcoal flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-steel mb-1">Response Time</p>
                    <p className="text-sm text-charcoal font-medium">Within 24 hours</p>
                    <p className="text-xs text-steel">Mon – Sat, 9am – 9pm (BD Time)</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-surface flex items-center justify-center text-charcoal flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-steel mb-1">Phone</p>
                    <a href="tel:+8801739411586" className="text-sm text-charcoal font-medium hover:text-accent transition-colors">
                      +880 1739 411 586
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="mt-10 pt-10 border-t border-border">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
                  Connect Online
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2.5 border border-border text-charcoal text-xs font-medium hover:border-accent hover:text-accent transition-all duration-200"
                    >
                      <Icon size={14} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* What to include */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
                  What to Include
                </h3>
                <div className="space-y-3">
                  {content.contact.whatToInclude.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-steel">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-surface border border-border p-12 text-center">
                  <div className="w-16 h-16 bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6">
                    <WhatsAppIcon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">Opening WhatsApp…</h3>
                  <p className="text-steel max-w-md mx-auto">
                    Your message has been pre-filled in WhatsApp. Just hit Send! If it didn't open,{' '}
                    <a href={WA_BASE} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                      click here
                    </a>.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-6 py-3 border border-charcoal text-charcoal text-[12px] uppercase tracking-[0.15em] font-medium hover:bg-charcoal hover:text-white transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-surface border border-border p-8 lg:p-12">
                  <h3 className="text-xl font-semibold text-charcoal mb-2">Send a Project Inquiry</h3>
                  <p className="text-steel text-sm mb-8">
                    Fill in the form — it will open WhatsApp with your message pre-filled so I receive it instantly.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-steel font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-border text-charcoal text-sm focus:outline-none focus:border-accent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-steel font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-border text-charcoal text-sm focus:outline-none focus:border-accent transition-colors"
                        placeholder="email@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-steel font-medium mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-border text-charcoal text-sm focus:outline-none focus:border-accent transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-steel font-medium mb-2">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-border text-charcoal text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
                      >
                        <option value="">Select project type</option>
                        <option value="Structural Steel Detailing">Structural Steel Detailing</option>
                        <option value="PEB / Industrial Building">PEB / Industrial Building</option>
                        <option value="Platform / Access Structure">Platform / Access Structure</option>
                        <option value="Connection Detailing">Connection Detailing</option>
                        <option value="Shop Drawing Production">Shop Drawing Production</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-[11px] uppercase tracking-wider text-steel font-medium mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-border text-charcoal text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Describe your project scope, tonnage, deliverables needed, timeline, and any other relevant details..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white text-[12px] uppercase tracking-[0.15em] font-semibold hover:bg-[#1ebe5d] transition-all duration-300"
                    >
                      <WhatsAppIcon size={14} />
                      Send via WhatsApp
                      <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                      href="mailto:hello@julkarnaeem.com"
                      className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-charcoal text-charcoal text-[12px] uppercase tracking-[0.15em] font-medium hover:bg-charcoal hover:text-white transition-all duration-300"
                    >
                      <Mail size={14} />
                      Send by Email
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
