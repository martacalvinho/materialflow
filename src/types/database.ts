export interface User {
  id: string;
  email: string;
  created_at: string;
  role: 'admin' | 'user';
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  client_id: string;
  type: string;
  status: 'draft' | 'processing' | 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  manufacturer_id: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaterialInstance {
  id: string;
  material_id: string;
  project_id: string;
  location: string;
  area: number | null;
  quantity: number | null;
  price_per_unit: number | null;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  content: string;
  manufacturer_id: string;
  project_id: string | null;
  created_at: string;
  updated_at: string;
}