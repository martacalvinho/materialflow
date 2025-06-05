import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Project, Material, Client, Manufacturer } from '../types/database';

interface AppState {
  user: User | null;
  projects: Project[];
  materials: Material[];
  clients: Client[];
  manufacturers: Manufacturer[];
  isLoading: boolean;
  error: string | null;
  
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  
  // Data fetching
  fetchProjects: () => Promise<void>;
  fetchMaterials: () => Promise<void>;
  fetchClients: () => Promise<void>;
  fetchManufacturers: () => Promise<void>;
  
  // CRUD actions
  createProject: (data: Partial<Project>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  createMaterial: (data: Partial<Material>) => Promise<void>;
  updateMaterial: (id: string, data: Partial<Material>) => Promise<void>;
  deleteMaterial: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  projects: [],
  materials: [],
  clients: [],
  manufacturers: [],
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      set({ user: data.user });
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProjects: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      set({ projects: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMaterials: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('name');
      if (error) throw error;
      set({ materials: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchClients: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name');
      if (error) throw error;
      set({ clients: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchManufacturers: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('manufacturers')
        .select('*')
        .order('name');
      if (error) throw error;
      set({ manufacturers: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  createProject: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const { data: project, error } = await supabase
        .from('projects')
        .insert([data])
        .select()
        .single();
      if (error) throw error;
      set(state => ({ projects: [project, ...state.projects] }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProject: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      const { data: project, error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      set(state => ({
        projects: state.projects.map(p => p.id === id ? project : p)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProject: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
      set(state => ({
        projects: state.projects.filter(p => p.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createMaterial: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const { data: material, error } = await supabase
        .from('materials')
        .insert([data])
        .select()
        .single();
      if (error) throw error;
      set(state => ({ materials: [...state.materials, material] }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateMaterial: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      const { data: material, error } = await supabase
        .from('materials')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      set(state => ({
        materials: state.materials.map(m => m.id === id ? material : m)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteMaterial: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', id);
      if (error) throw error;
      set(state => ({
        materials: state.materials.filter(m => m.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));