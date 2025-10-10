import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

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
