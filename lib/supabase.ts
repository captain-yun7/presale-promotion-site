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
  source?: string;
  project?: string;
  created_at?: string;
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
