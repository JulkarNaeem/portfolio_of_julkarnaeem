import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { WhatsAppIcon } from './components/SocialIcons';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { CmsProvider, useCms } from './context/CmsContext';

function MainLayout() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { content } = useCms();

  useEffect(() => {
    const handleUrlChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setCurrentPage('admin');
      }
    };

    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      setCurrentPage('admin');
    }

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
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
      home: `${content.profileName} — ${content.profileRole} | Tekla BIM & Fabrication Drawings`,
      projects: `Projects — ${content.profileName} | Tekla BIM Models & Steel Detailing`,
      services: `Services — ${content.profileName} | Steel Structure Detailing & Shop Drawings`,
      about: `About — ${content.profileName} | Tekla Structures Specialist`,
      contact: `Contact — ${content.profileName} | Steel Detailing Inquiries`,
      admin: `Admin Control Center — ${content.profileName} Portfolio CMS`,
    };
    document.title = titles[currentPage] || titles.home;
  }, [currentPage, content.profileName, content.profileRole]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'admin') {
    return <AdminPage onNavigate={setCurrentPage} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'projects':
        return <ProjectsPage onNavigate={setCurrentPage} />;
      case 'services':
        return <ServicesPage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-charcoal relative">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />

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
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <MainLayout />
    </CmsProvider>
  );
}
