import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
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
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      }
    };

    if (window.location.hash === '#admin') {
      setCurrentPage('admin');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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

      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-charcoal text-white hover:bg-accent hover:text-charcoal flex items-center justify-center shadow-xl border border-white/20 transition-all duration-300 transform hover:scale-105"
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
