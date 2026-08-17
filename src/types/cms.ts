export interface HeroContent {
  badge: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3: string;
  subtitle: string;
  projectsCountText: string;
  heroImage: string;
  softwareBadgeTitle: string;
  softwareBadgeSub: string;
}

export interface ProjectItem {
  id: string;
  img: string;
  title: string;
  category: string;
  desc: string;
  tonnage: string;
  gallery?: string[];
  videoUrl?: string;
  software?: string | string[];
  deliverables?: string[];
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  desc: string;
  includes: string[];
}

export interface AboutContent {
  name: string;
  titleTag: string;
  subtitle: string;
  portraitImg: string;
  statsProjects: string;
  statsTool: string;
  statsBim: string;
  bioParagraphs: string[];
  competencies: string[];
  focusAreas: string[];
  quoteText: string;
}

export interface ContactContent {
  badge: string;
  title: string;
  subtitle: string;
  email: string;
  location: string;
  remoteNotice: string;
  linkedinUrl: string;
  whatToInclude: string[];
}

export interface NavLinkItem {
  label: string;
  page: string;
  visible: boolean;
}

export interface NavSettings {
  brandInitials: string;
  brandName: string;
  brandRole: string;
  ctaLabel: string;
  ctaPage: string;
  navLinks: NavLinkItem[];
}

export interface SiteContent {
  profileName: string;
  profileRole: string;
  adminPasscode?: string;
  navSettings?: NavSettings;
  hero: HeroContent;
  projects: ProjectItem[];
  services: ServiceItem[];
  about: AboutContent;
  contact: ContactContent;
}
