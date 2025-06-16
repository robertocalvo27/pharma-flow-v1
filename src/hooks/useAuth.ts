import { useState, useEffect } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { useStore } from '../store'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

interface UserProfile {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'manager' | 'analyst' | 'viewer'
  company: string
  is_active: boolean
}

// Crear suscripción Enterprise trial por defecto
const createEnterpriseTrialSubscription = () => {
  const now = new Date();
  const trialEnd = new Date(now.getTime() + (15 * 24 * 60 * 60 * 1000)); // 15 días
  
  return {
    id: 'sub-1',
    userId: '1',
    planId: 'enterprise',
    planName: 'enterprise' as const,
    status: 'trial' as const,
    trialEndsAt: trialEnd.toISOString(),
    currentPeriodStart: now.toISOString(),
    currentPeriodEnd: trialEnd.toISOString(),
    limits: {
      maxProducts: 100,
      maxUsers: 25,
      maxStorageGB: 500,
      maxApiCalls: 100000,
      maxCountries: -1
    },
    features: {
      basicWorkflows: true,
      advancedWorkflows: true,
      customWorkflows: true,
      basicReports: true,
      advancedReports: true,
      apiIntegrations: true,
      prioritySupport: true,
      sso: true,
      whiteLabeling: true,
      auditLogs: true,
      customFields: true,
      bulkOperations: true
    }
  };
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  })
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  
  // Store hooks
  const { setUser, initializeOnboarding } = useStore()

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false
      })
      
      if (session?.user) {
        fetchUserProfile(session.user.id)
      }
    })

    // Escuchar cambios de autenticación
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false
      })

      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setUserProfile(null)
        setUser(null) // Limpiar el store cuando se desautentica
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setUserProfile(data)
      
      // Sincronizar con el store
      const storeUser = {
        id: data.id,
        email: data.email,
        fullName: data.full_name,
        role: data.role,
        department: data.company,
        isActive: data.is_active,
        subscription: createEnterpriseTrialSubscription(),
        onboardingCompleted: data.onboarding_completed || false, // Usar valor de la DB o false por defecto
        trialStartDate: new Date().toISOString()
      }
      
      setUser(storeUser)
      initializeOnboarding(storeUser)
      
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signUp = async (email: string, password: string, userData: {
    full_name: string
    company: string
    role?: 'admin' | 'manager' | 'analyst' | 'viewer'
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })

    // Si el registro es exitoso, crear el perfil del usuario
    if (data.user && !error) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: userData.full_name,
          company: userData.company,
          role: userData.role || 'viewer'
        })

      if (profileError) {
        console.error('Error creating user profile:', profileError)
      }
    }

    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!authState.user) return { error: new Error('No user logged in') }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', authState.user.id)
      .select()
      .single()

    if (!error && data) {
      setUserProfile(data)
      
      // Actualizar también el store
      const storeUser = {
        id: data.id,
        email: data.email,
        fullName: data.full_name,
        role: data.role,
        department: data.company,
        isActive: data.is_active,
        subscription: createEnterpriseTrialSubscription(),
        onboardingCompleted: data.onboarding_completed || false,
        trialStartDate: new Date().toISOString()
      }
      setUser(storeUser)
    }

    return { data, error }
  }

  return {
    user: authState.user,
    session: authState.session,
    userProfile,
    loading: authState.loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    isAuthenticated: !!authState.user,
    isAdmin: userProfile?.role === 'admin',
    isManager: userProfile?.role === 'manager' || userProfile?.role === 'admin'
  }
} 