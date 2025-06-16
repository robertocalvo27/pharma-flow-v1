export interface Product {
  id: string;
  name: string;
  activeIngredient: string;
  pharmaceuticalForm: string;
  concentration: string;
  manufacturerId: string;
  manufacturerName: string;
  therapeuticClass: string;
  atcCode: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'expired';
  createdAt: string;
  updatedAt: string;
  registrations: ProductRegistration[];
}

export interface ProductRegistration {
  id: string;
  productId: string;
  countryCode: string;
  countryName: string;
  registrationNumber: string;
  registrationDate: string;
  expiryDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired' | 'renewal_required';
  regulatoryPathway: string;
  workflowId?: string;
}

export interface Workflow {
  id: string;
  productId: string;
  productName: string;
  countryCode: string;
  countryName: string;
  workflowType: 'registration' | 'renewal' | 'variation';
  currentStep: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected' | 'paused';
  assignedTo: string;
  assignedToName: string;
  dueDate: string;
  createdAt: string;
  steps: WorkflowStep[];
  progress: number;
}

export interface WorkflowStep {
  id: string;
  workflowId: string;
  stepName: string;
  stepOrder: number;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  assignedTo: string;
  assignedToName: string;
  completedAt?: string;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
  isActive: boolean;
}

export interface Country {
  code: string;
  name: string;
  regulatoryAgency: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalProducts: number;
  activeRegistrations: number;
  pendingWorkflows: number;
  expiringRegistrations: number;
  workflowDistribution: { name: string; value: number; color: string }[];
  statusDistribution: { name: string; value: number; color: string }[];
  monthlyRegistrations: { month: string; registrations: number; renewals: number }[];
}