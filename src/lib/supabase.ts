import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytxummsamnnpukmmhafo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eHVtbXNhbW5ucHVrbW1oYWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzIzMjQsImV4cCI6MjA2NTY0ODMyNH0.6v-BGsdeenzWjy2X_OZ2hoxEXXgjSawRcCqQcAmXeX4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'manager' | 'analyst' | 'viewer'
          company: string
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          role?: 'admin' | 'manager' | 'analyst' | 'viewer'
          company: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'manager' | 'analyst' | 'viewer'
          company?: string
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
    }
  }
} 