export type ProjectStatus = 'Completed' | 'In progress' | 'On hold' | 'Quotation' | 'Cancelled';
export type RfiStatus = 'Open' | 'Answered' | 'Closed';

export interface DbTask {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
}

export interface DbRfi {
  id: string;
  question: string;
  answer?: string;
  status: RfiStatus;
  createdAt: string;
}

export interface DbProject {
  id: string; // e.g. 'JN-001'
  projectNumber?: string;
  type: string;
  title: string;
  description: string;
  weight_tons: number;
  area_sqm: number;
  area_sqft: number;
  status: ProjectStatus;
  location: string;
  designStandard: string;
  image: string;
  createdAt: string;
  tasks: DbTask[];
  rfis: DbRfi[];
}

export const PROJECT_STATUSES: readonly ProjectStatus[] = [
  'Completed',
  'In progress',
  'On hold',
  'Quotation',
  'Cancelled',
] as const;

export const PROJECT_TYPES = [
  'Shed Buildings',
  'Multi-storied Buildings',
  'Stairs',
  'Industrial Building',
  'Structural extensions',
  'Platform / Walkway',
  'Footbridge',
  'Connections',
  'Infrastructure',
  'Other',
] as const;

export const DESIGN_STANDARDS = [
  'AISC',
  'CISC',
  'BS / Eurocode',
  'IS',
  'Other / Not specified',
] as const;

export const PRESET_PROJECT_IMAGES = [
  '/images/Project Photos/Carver Rafter Shed industrial.png',
  '/images/Project Photos/Multistoried Building.png',
  '/images/Project Photos/Spiral Stair.png',
  '/images/Project Photos/3d Drawing View of Flyover Support member.png',
  '/images/Project Photos/Roof Top Structure.png',
  '/images/Project Photos/Carve Walkaway Platform.png',
  '/images/Project Photos/Bridge.png',
  '/images/Project Photos/Connection Details.png',
  '/images/Project Photos/Metrorail Station Structure with stair.png',
  '/images/Project Photos/structural steel detailing.png',
  '/images/Project Photos/Building Extension Shed.png',
  '/images/Project Photos/Shed Building With Mezzanine, Stair & Canopy.png',
  '/images/Project Photos/Multistoried Building with Rooftop Shed & stair.png',
  '/images/Project Photos/3d Render View of Flyover Support member.png',
  '/images/Project Photos/Stair.png',
] as const;
