import { create } from 'zustand';
import { Product, Workflow, User, DashboardStats, ProductRegistration } from '../types';

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
  
  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // User state
  user: {
    id: '1',
    email: 'admin@pharmaflow.com',
    fullName: 'Dr. María González',
    role: 'admin',
    department: 'Asuntos Regulatorios',
    isActive: true,
  },
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
  
  // UI state
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));