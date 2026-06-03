import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Para o backend, se tiver a service_role_key, preferimos usá-la para ignorar RLS nas operações da API
// Caso contrário, usamos a anon_key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Variáveis do Supabase não configuradas no .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
