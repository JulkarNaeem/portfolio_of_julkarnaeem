import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, ProjectItem, ServiceItem } from '../types/cms';

const STORAGE_KEY = 'julkarnaeem_portfolio_cms_v1';

export const defaultSiteContent: SiteContent = {
  profileName: 'Julkar Naeem',
  profileRole: 'Steel Detailer',
  adminPasscode: 'admin123',
  navSettings: {
    brandInitials: 'JN',
    brandName: 'Julkar Naeem',
    brandRole: 'Steel Detailer',
    ctaLabel: 'Inquire Now',
    ctaPage: 'contact',
    navLinks: [
      { label: 'Home', page: 'home', visible: true },
      { label: 'Projects', page: 'projects', visible: true },
      { label: 'Services', page: 'services', visible: true },
      { label: 'About', page: 'about', visible: true },
      { label: 'Contact', page: 'contact', visible: true },
    ],
  },
  hero: {
    badge: 'Steel Structure Detailer',
    headlineLine1: 'Steel Structures,',
    headlineLine2: 'Detailed for',
    headlineLine3: 'Fabrication',
    subtitle: 'I create accurate Tekla BIM models and fabrication-ready shop drawings for PEB, industrial steel, platforms, stairs, and structural steel projects.',
    projectsCountText: '150+ Steel Projects Delivered',
    heroImage: '/images/hero-steel.jpg',
    softwareBadgeTitle: 'Tekla Structures 2025',
    softwareBadgeSub: 'Fabrication-Ready BIM',
  },
  projects: [
    {
      id: 'proj-1',
      img: '/images/project-1.jpg',
      title: 'Curved Industrial Steel Walkway Platform',
      category: 'Industrial Platform',
      desc: 'Full Tekla BIM model with curved steel walkway, handrails, grating, and connection details for an industrial plant.',
      tonnage: '45 tons',
      gallery: ['/images/project-1.jpg', '/images/project-3.jpg', '/images/hero-steel.jpg'],
    },
    {
      id: 'proj-2',
      img: '/images/project-2.jpg',
      title: 'PEB Warehouse Portal Frame',
      category: 'PEB',
      desc: 'Complete portal frame modeling with purlins, bracing, and girts for a 40m span PEB warehouse facility.',
      tonnage: '120 tons',
      gallery: ['/images/project-2.jpg', '/images/project-5.jpg'],
    },
    {
      id: 'proj-3',
      img: '/images/project-3.jpg',
      title: 'Industrial Steel Platform & Handrail',
      category: 'Industrial Platform',
      desc: 'Multi-level access platform with checkered plate flooring, stairs, and safety handrails for process equipment access.',
      tonnage: '32 tons',
      gallery: ['/images/project-3.jpg', '/images/project-1.jpg', '/images/project-4.jpg'],
    },
    {
      id: 'proj-4',
      img: '/images/project-4.jpg',
      title: 'Steel Stair and Guardrail System',
      category: 'Access Structures',
      desc: 'Detailed stair stringers, treads, guardrail posts, and mid-rails with fabrication-ready shop drawings.',
      tonnage: '18 tons',
      gallery: ['/images/project-4.jpg', '/images/project-3.jpg'],
    },
    {
      id: 'proj-5',
      img: '/images/project-5.jpg',
      title: 'Multi-storey Steel Building Framing',
      category: 'Structural Steel',
      desc: 'Full structural steel framing model for a 4-storey commercial building with composite deck connections.',
      tonnage: '280 tons',
      gallery: ['/images/project-5.jpg', '/images/hero-steel.jpg', '/images/project-2.jpg'],
    },
    {
      id: 'proj-6',
      img: '/images/project-6.jpg',
      title: 'Heavy Steel Connection Details',
      category: 'Connection Design',
      desc: 'Moment connections, base plates, splice joints, and bracing gussets modeled with full bolt and weld details.',
      tonnage: '—',
      gallery: ['/images/project-6.jpg', '/images/project-5.jpg'],
    },
    {
      id: 'proj-7',
      img: '/images/project-1.jpg',
      title: 'Chemical Plant Pipe Rack Platform',
      category: 'Industrial Platform',
      desc: 'Complex pipe rack support structure with multiple access levels, grating, and kick plates for a chemical processing facility.',
      tonnage: '65 tons',
      gallery: ['/images/project-1.jpg', '/images/hero-steel.jpg'],
    },
    {
      id: 'proj-8',
      img: '/images/project-2.jpg',
      title: 'Cold Storage PEB Facility',
      category: 'PEB',
      desc: 'Insulated pre-engineered building with specialized panel connections and crane beam provisions for cold storage operations.',
      tonnage: '95 tons',
      gallery: ['/images/project-2.jpg', '/images/project-1.jpg'],
    },
    {
      id: 'proj-9',
      img: '/images/project-5.jpg',
      title: 'Steel Bridge Girder System',
      category: 'Structural Steel',
      desc: 'Plate girder bridge structure with cross-bracing, stiffener details, and bearing connection assemblies.',
      tonnage: '180 tons',
      gallery: ['/images/project-5.jpg', '/images/project-6.jpg'],
    },
  ],
  services: [
    {
      id: 'svc-1',
      iconName: 'Wrench',
      title: 'Structural Steel Detailing',
      desc: 'Complete detailing of structural steel members, assemblies, and connections using Tekla Structures.',
      includes: [
        'Primary & secondary structural members',
        'Assembly & part mark numbering',
        'Bolt and weld detail coordination',
        'Erection & assembly sequence marks',
      ],
    },
    {
      id: 'svc-2',
      iconName: 'Building2',
      title: 'PEB & Industrial Modeling',
      desc: 'Pre-engineered building frames, portal structures, and industrial steel modeling for fabrication.',
      includes: [
        'Portal frame & rigid frame modeling',
        'Purlin, girt, and sag rod layout',
        'Bracing systems & crane beams',
        'Mezzanine & canopy structures',
      ],
    },
    {
      id: 'svc-3',
      iconName: 'ClipboardList',
      title: 'Shop Drawing Production',
      desc: 'Fabrication-ready shop drawings with dimensions, bolt details, weld symbols, and material lists.',
      includes: [
        'General Arrangement (GA) drawings',
        'Anchor bolt layout plans',
        'Individual member shop drawings',
        'Assembly drawings with sections',
      ],
    },
    {
      id: 'svc-4',
      iconName: 'Link2',
      title: 'Steel Connection Detailing',
      desc: 'Moment connections, shear connections, base plates, splices, and bracing connections — fully detailed.',
      includes: [
        'Moment & shear connections',
        'Base plate & anchor bolt details',
        'Splice & field connection details',
        'Bracing gusset plates & cleats',
      ],
    },
    {
      id: 'svc-5',
      iconName: 'BarChart3',
      title: 'Material Take-Off / Reports',
      desc: 'Accurate material quantity reports, bolt lists, and assembly summaries extracted from the Tekla model.',
      includes: [
        'Material quantity summaries',
        'Bolt & nut lists with grades',
        'Assembly weight reports',
        'Paint area / surface treatment data',
      ],
    },
    {
      id: 'svc-6',
      iconName: 'Footprints',
      title: 'Stairs, Platforms & Access',
      desc: 'Steel staircases, walkway platforms, handrails, ladders, and access structures — detailed for fabrication.',
      includes: [
        'Stair stringers, treads, and nosing',
        'Handrails, mid-rails & kick plates',
        'Grating & checker plate flooring',
        'Ladder & cage details',
      ],
    },
  ],
  about: {
    name: 'Julkar Naeem',
    titleTag: 'About',
    subtitle: 'Steel Structure Detailer & Tekla Structures Specialist — Dhaka, Bangladesh',
    portraitImg: '/images/about-portrait.jpg',
    statsProjects: '150+',
    statsTool: 'Tekla',
    statsBim: 'BIM',
    bioParagraphs: [
      "I am Julkar Naeem, a Steel Structure Detailer based in Dhaka, Bangladesh, with 9+ years of professional experience specializing in Tekla Structures. I focus on clean, organized, fabrication-oriented steel models and drawings that help fabricators and contractors execute with clarity.",
      "With over 150 successfully completed steel structure projects across 4+ countries, I've worked across a wide range of structural typologies — from PEB buildings and industrial sheds to multi-storey steel buildings, platforms, walkways, stairs, handrails, grating, bridges, and complex steel accessories.",
      "My core offer is simple: fabrication-ready BIM models combined with clear shop drawings, GA drawings, and connection details. Every model I build is organized for easy fabrication extraction, and every drawing I produce is designed to minimize questions on the shop floor.",
      "I work directly with steel fabricators, contractors, structural engineers, PEB companies, and industrial clients worldwide who need accurate steel detailing they can rely on — delivered remotely with full precision."
    ],
    competencies: [
      'Tekla Structures BIM Modeling',
      'Steel Connection Detailing',
      'Shop Drawing Production',
      'GA Drawing Layouts',
      'Material Take-Off Reports',
      'PEB Building Detailing',
      'Industrial Platform Design',
      'Stair & Handrail Systems',
      'Bridge Steel Detailing',
      'Multi-storey Framing',
    ],
    focusAreas: [
      'PEB Buildings',
      'Industrial Steel Structures',
      'Sheds',
      'Multi-storey Steel Buildings',
      'Platforms',
      'Walkways',
      'Stairs',
      'Handrails',
      'Grating',
      'Bridges',
      'Steel Accessories',
    ],
    quoteText: "Good steel detailing isn't about making impressive models — it's about making models that fabricators can trust and build from without confusion.",
  },
  contact: {
    badge: 'Get in Touch',
    title: 'Contact',
    subtitle: "Have a steel project that needs detailing? Let's discuss your requirements and how I can deliver accurate, fabrication-ready deliverables — remotely from Dhaka, Bangladesh.",
    email: 'hello@julkarnaeem.com',
    location: 'Dhaka, Bangladesh',
    remoteNotice: 'Remote delivery worldwide • UTC+6',
    linkedinUrl: 'https://www.linkedin.com/in/julkarnaeem/',
    whatToInclude: [
      'Project type & structure description',
      'Approximate tonnage or scope',
      'Available drawings (GA, structural)',
      'Deliverable requirements',
      'Timeline expectations',
    ],
  },
};

interface CmsContextType {
  content: SiteContent;
  isAdminOpen: boolean;
  setIsAdminOpen: (val: boolean) => void;
  updateContent: (newContent: SiteContent) => void;
  updateField: (path: string, value: any) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  resetToDefaults: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultSiteContent;
    } catch (e) {
      return defaultSiteContent;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save CMS state to localStorage', e);
    }
  }, [content]);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    setContent((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      let current = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const addProject = (projectData: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...projectData,
      id: `proj-${Date.now()}`,
    };
    setContent((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addService = (serviceData: Omit<ServiceItem, 'id'>) => {
    const newSvc: ServiceItem = {
      ...serviceData,
      id: `svc-${Date.now()}`,
    };
    setContent((prev) => ({
      ...prev,
      services: [...prev.services, newSvc],
    }));
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteService = (id: string) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const resetToDefaults = () => {
    setContent(defaultSiteContent);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const exportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `julkar_naeem_portfolio_cms_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.hero && Array.isArray(parsed.projects)) {
        setContent(parsed);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        isAdminOpen,
        setIsAdminOpen,
        updateContent,
        updateField,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        resetToDefaults,
        exportJson,
        importJson,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return ctx;
};
