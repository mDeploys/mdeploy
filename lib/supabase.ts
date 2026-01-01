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

// Admin client getter - ONLY for server-side use
export function getSupabaseAdmin() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseServiceKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is missing')
    return null
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export type Quote = {
  id: string
  quote_number: number
  quote_id: string
  full_name: string
  email: string
  company?: string
  phone?: string
  notes?: string
  status: 'pending' | 'reviewed' | 'converted' | 'rejected'
  total_price: number
  details: any
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  name: string
  description: string
  type: 'website' | 'web_app' | 'mobile_app' | 'desktop_app'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  client_name: string
  client_email: string
  price: number
  client_phone?: string
  client_company?: string
  details?: any
  created_at: string
  updated_at: string
}

export type App = {
  id: string
  name: string
  thumbnail_url: string
  url?: string
  preview_url?: string
  description?: string
  download_url?: string
  created_at: string
}

export type PricingItem = {
  key: string
  value: number
  label: string
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

export async function signInWithEmail(email: string, password: string, captchaToken?: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken }
  })
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
