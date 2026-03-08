import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Durante la generación estática (build) en Vercel, estas variables pueden no estar disponibles.
// Usamos valores temporales para evitar que el build falle, pero advertimos al usuario.
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ ATENCIÓN: NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY no están configuradas.');
    console.warn('El build continuará, pero las funciones de Supabase (como subida de archivos) no funcionarán hasta que se configuren en Vercel.');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder-project.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);
