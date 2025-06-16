import { create } from 'zustand';
import { Product, Workflow, User, DashboardStats, ProductRegistration, OnboardingState, UserSubscription } from '../types';
import { SUBSCRIPTION_PLANS, ONBOARDING_STEPS } from '../utils/constants';

interface AppState {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Products state
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Workflows state
  workflows: Workflow[];
  setWorkflows: (workflows: Workflow[]) => void;
  updateWorkflowStep: (workflowId: string, stepId: string, status: string) => void;
  
  // Dashboard state
  dashboardStats: DashboardStats | null;
  setDashboardStats: (stats: DashboardStats) => void;
  
  // Onboarding state
  onboarding: OnboardingState;
  setOnboardingStep: (step: number) => void;
  completeOnboardingStep: (stepId: string) => void;
  showOnboarding: (show: boolean) => void;
  skipOnboarding: () => void;
  initializeOnboarding: (user: User) => void;
  
  // Subscription state
  updateSubscription: (subscription: Partial<UserSubscription>) => void;
  
  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// Crear suscripción Enterprise trial por defecto
const createEnterpriseTrialSubscription = (): UserSubscription => {
  const now = new Date();
  const trialEnd = new Date(now.getTime() + (15 * 24 * 60 * 60 * 1000)); // 15 días
  
  return {
    id: 'sub-1',
    userId: '1',
    planId: 'enterprise',
    planName: 'enterprise',
    status: 'trial',
    trialEndsAt: trialEnd.toISOString(),
    currentPeriodStart: now.toISOString(),
    currentPeriodEnd: trialEnd.toISOString(),
    limits: SUBSCRIPTION_PLANS.ENTERPRISE.limits,
    features: SUBSCRIPTION_PLANS.ENTERPRISE.features
  };
};

export const useStore = create<AppState>((set, get) => ({
  // User state - Inicialmente null, se establecerá desde la autenticación
  user: null,
  setUser: (user) => set({ user }),
  
  // Products state
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id)
  })),
  
  // Workflows state
  workflows: [],
  setWorkflows: (workflows) => set({ workflows }),
  updateWorkflowStep: (workflowId, stepId, status) => set((state) => ({
    workflows: state.workflows.map(w => 
      w.id === workflowId 
        ? {
            ...w,
            steps: w.steps.map(s => 
              s.id === stepId 
                ? { ...s, status: status as any, completedAt: status === 'completed' ? new Date().toISOString() : undefined }
                : s
            ),
            progress: Math.round((w.steps.filter(s => s.status === 'completed').length / w.steps.length) * 100)
          }
        : w
    )
  })),
  
  // Dashboard state
  dashboardStats: null,
  setDashboardStats: (stats) => set({ dashboardStats: stats }),
  
  // Onboarding state
  onboarding: {
    currentStep: 0,
    totalSteps: ONBOARDING_STEPS.length,
    steps: ONBOARDING_STEPS.map(step => ({ ...step })),
    showOnboarding: false, // Inicialmente false, se activará según el usuario
    skipAvailable: true
  },
  setOnboardingStep: (step) => set((state) => ({
    onboarding: { ...state.onboarding, currentStep: step }
  })),
  completeOnboardingStep: (stepId) => set((state) => ({
    onboarding: {
      ...state.onboarding,
      steps: state.onboarding.steps.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    }
  })),
  showOnboarding: (show) => set((state) => ({
    onboarding: { ...state.onboarding, showOnboarding: show }
  })),
  skipOnboarding: () => set((state) => ({
    onboarding: { ...state.onboarding, showOnboarding: false },
    user: state.user ? { ...state.user, onboardingCompleted: true } : null
  })),
  initializeOnboarding: (user) => set((state) => ({
    onboarding: {
      ...state.onboarding,
      showOnboarding: !user.onboardingCompleted
    }
  })),
  
  // Subscription state
  updateSubscription: (subscriptionUpdate) => set((state) => ({
    user: state.user ? {
      ...state.user,
      subscription: state.user.subscription ? 
        { ...state.user.subscription, ...subscriptionUpdate } : 
        undefined
    } : null
  })),
  
  // UI state
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));