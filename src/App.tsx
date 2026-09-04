import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { WhatsAppIcon } from './components/SocialIcons';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import PrivacyModal from './components/PrivacyModal';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { portfolioData } from './data/portfolioData';

const VALID_PAGES = ['home', 'projects', 'services', 'about', 'contact'];

const getPageFromHash = (): string => {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  return VALID_PAGES.includes(hash) ? hash : 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(getPageFromHash);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const navigateToPage = (page: string) => {
    if (VALID_PAGES.includes(page)) {
      setCurrentPage(page);
      if (window.location.hash.replace(/^#\/?/, '').toLowerCase() !== page) {
        window.location.hash = page;
      }
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      home: `${portfolioData.profileName} — ${portfolioData.profileRole} | Tekla BIM & Fabrication Drawings`,
      projects: `Projects — ${portfolioData.profileName} | Tekla BIM Models & Steel Detailing`,
      services: `Services — ${portfolioData.profileName} | Steel Structure Detailing & Shop Drawings`,
      about: `About — ${portfolioData.profileName} | Tekla Structures Specialist`,
      contact: `Contact — ${portfolioData.profileName} | Steel Detailing Inquiries`,
    };
    document.title = titles[currentPage] || titles.home;
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateToPage} />;
      case 'projects':
        return <ProjectsPage onNavigate={navigateToPage} />;
      case 'services':
        return <ServicesPage onNavigate={navigateToPage} />;
      case 'about':
        return <AboutPage onNavigate={navigateToPage} />;
      case 'contact':
        return <ContactPage onNavigate={navigateToPage} />;
      default:
        return <HomePage onNavigate={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-charcoal relative">
      <Navbar currentPage={currentPage} onNavigate={navigateToPage} />
      <main>{renderPage()}</main>
      <Footer onNavigate={navigateToPage} />

      {/* WhatsApp Floating Button — always visible */}
      <a
        href="https://wa.me/8801739411586?text=Hi%20Julkar!%20I%20found%20your%20portfolio%20and%20have%20a%20project%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-[#25D366] text-white hover:bg-[#1ebe5d] flex items-center justify-center shadow-xl rounded-full transition-all duration-300 hover:scale-110"
      >
        <WhatsAppIcon size={22} />
      </a>

      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-charcoal text-white hover:bg-steel-blue hover:text-white flex items-center justify-center shadow-xl border border-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Cookie & Privacy Compliance Banner */}
      <CookieBanner onOpenPrivacy={() => setPrivacyModalOpen(true)} />

      {/* Global Privacy & Terms Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        defaultTab="privacy"
      />
    </div>
  );
}
