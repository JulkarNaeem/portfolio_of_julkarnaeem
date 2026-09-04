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
import DatabasePage from './pages/DatabasePage';
import { ProjectDbProvider } from './context/ProjectDbContext';
import { portfolioData } from './data/portfolioData';

const VALID_PAGES = ['home', 'projects', 'services', 'about', 'contact', 'database'];

const getPageFromLocation = (): string => {
  // 1. Check Query Parameters (e.g. ?p=dashboard or ?dashboard)
  const search = window.location.search.toLowerCase();
  if (
    search.includes('dashboard') ||
    search.includes('database') ||
    search.includes('admin')
  ) {
    return 'database';
  }
  if (search.includes('projects')) return 'projects';
  if (search.includes('services')) return 'services';
  if (search.includes('about')) return 'about';
  if (search.includes('contact')) return 'contact';

  // 2. Check Pathname (e.g. /dashboard, /database, /admin, /projects)
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (
    path === 'dashboard' ||
    path === 'database' ||
    path === 'admin' ||
    path.endsWith('/dashboard') ||
    path.endsWith('/database') ||
    path.endsWith('/admin')
  ) {
    return 'database';
  }
  for (const p of VALID_PAGES) {
    if (path === p || path.endsWith(`/${p}`)) {
      return p;
    }
  }

  // 3. Check URL Hash (e.g. #dashboard, #/dashboard, #database, #admin, #projects)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (
    hash === 'dashboard' ||
    hash === 'database' ||
    hash === 'admin' ||
    hash.startsWith('dashboard') ||
    hash.startsWith('database') ||
    hash.startsWith('admin')
  ) {
    return 'database';
  }
  for (const p of VALID_PAGES) {
    if (hash === p || hash.startsWith(`${p}/`) || hash.startsWith(`${p}?`)) {
      return p;
    }
  }

  return 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(getPageFromLocation);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const navigateToPage = (page: string) => {
    const targetPage =
      page === 'dashboard' || page === 'admin' ? 'database' : page;
    if (VALID_PAGES.includes(targetPage)) {
      setCurrentPage(targetPage);
      const targetHash = targetPage === 'database' ? 'dashboard' : targetPage;
      if (window.location.hash.replace(/^#\/?/, '').toLowerCase() !== targetHash) {
        window.location.hash = targetHash;
      }
    }
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const page = getPageFromLocation();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
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
      database: `Project Database | ${portfolioData.profileName}`,
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
      case 'database':
        return <DatabasePage onNavigate={navigateToPage} />;
      default:
        return <HomePage onNavigate={navigateToPage} />;
    }
  };

  return (
    <ProjectDbProvider>
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
    </ProjectDbProvider>
  );
}
