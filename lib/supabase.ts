import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !supabaseUrl.includes('placeholder') &&
  supabaseAnonKey !== 'placeholder-key'

export function assertSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    )
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Project = {
  id: string
  name: string
  description: string
  type: 'website' | 'web_app' | 'mobile_app' | 'desktop_app'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  client_name: string
  client_email: string
  price: number
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'user'
  created_at: string
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })
}

export async function signInWithEmail(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return await supabase.auth.signOut()
}

export async function getSession() {
  return await supabase.auth.getSession()
}

export async function getUser() {
  return await supabase.auth.getUser()
}
