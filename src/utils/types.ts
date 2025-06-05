export interface MaterialUsage {
  name: string;
  locations: string[];
  area?: number;
  quantity?: number;
}

export interface Project {
  id: number;
  name: string;
  client: string;
  type: string;
  materials: MaterialUsage[];
  status: 'Active' | 'Completed';
}

export interface ProjectUsage {
  name: string;
  locations: string[];
  area?: number;
  quantity?: number;
}

export interface Material {
  id: number;
  name: string;
  category: string;
  supplier: string;
  usage: number;
  projects: ProjectUsage[];
}

export interface Manufacturer {
  id: number;
  name: string;
  materials: string[];
  reliability: string;
  leadTime: string;
}