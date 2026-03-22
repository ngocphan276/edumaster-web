import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check your .env file.');
}

const url = supabaseUrl || 'https://dummy-project.supabase.co';
const key = supabaseAnonKey || 'dummy-key';

export const supabase = createClient(url, key);
