import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definition for inquiry
export interface Inquiry {
  id?: string;
  name: string;
  phone: string;
  unit_type?: string;
  message?: string;
  created_at?: string;
}

// Type definition for consultation
export interface Consultation {
  id?: string;
  name: string;
  phone: string;
  message?: string;
  source?: string;
  project?: string;
  project_id?: string;
  created_at?: string;
}

// ============================================
// Multi-Project Builder Types
// ============================================

export interface Template {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  default_settings: Record<string, unknown>;
  default_theme: ThemeConfig;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export interface ProjectSettings {
  showFloatingCTA: boolean;
  showSocialProof: boolean;
  showUrgencyBanner: boolean;
  sections?: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  template_id?: string;
  status: 'draft' | 'published' | 'archived';
  address?: string;
  phone?: string;
  email?: string;
  total_units?: number;
  sale_start_date?: string;
  sale_end_date?: string;
  move_in_date?: string;
  settings: ProjectSettings;
  theme: ThemeConfig;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  created_at: string;
  updated_at: string;
}

export type SectionType =
  | 'hero'
  | 'location'
  | 'units'
  | 'gallery'
  | 'schedule'
  | 'qna'
  | 'contact'
  | 'showroom'
  | 'features'
  | 'floor_info';

export interface ProjectContent {
  id: string;
  project_id: string;
  section_type: SectionType;
  content: Record<string, unknown>;
  is_enabled: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectUnit {
  id: string;
  project_id: string;
  name: string;
  area_exclusive?: number;
  area_supply?: number;
  rooms?: number;
  bathrooms?: number;
  price_min?: number;
  price_max?: number;
  floor_plan_image?: string;
  features: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type ImageCategory =
  | 'hero'
  | 'gallery'
  | 'exterior'
  | 'interior'
  | 'amenity'
  | 'floor_plan'
  | 'location'
  | 'logo'
  | 'og';

export interface ProjectImage {
  id: string;
  project_id: string;
  category: ImageCategory;
  url: string;
  alt?: string;
  title?: string;
  display_order: number;
  created_at: string;
}

export interface ProjectBlog {
  id: string;
  project_id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  thumbnail?: string;
  author?: string;
  tags: string[];
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

// Full project with all related data
export interface ProjectWithContents extends Project {
  contents?: ProjectContent[];
  units?: ProjectUnit[];
  images?: ProjectImage[];
  template?: Template;
}

// Submit inquiry function
export async function submitInquiry(data: Inquiry) {
  const { data: result, error } = await supabase
    .from('inquiries')
    .insert([
      {
        name: data.name,
        phone: data.phone,
        unit_type: data.unit_type,
        message: data.message,
      },
    ])
    .select();

  if (error) {
    console.error('Error submitting inquiry:', error);
    throw error;
  }

  return result;
}

// Submit consultation function
export async function submitConsultation(data: Consultation) {
  const { data: result, error } = await supabase
    .from('consultations')
    .insert([
      {
        name: data.name,
        phone: data.phone,
        message: data.message,
        source: data.source || 'website',
        project: data.project || '염창역더채움',
      },
    ])
    .select();

  if (error) {
    console.error('Error submitting consultation:', error);
    throw error;
  }

  return result;
}
