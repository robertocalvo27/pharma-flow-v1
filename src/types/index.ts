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

export interface Dossier {
  id: string;
  productId: string;
  productName: string;
  manufacturerId: string;
  manufacturerName: string;
  countryCode: string;
  countryName: string;
  status: 'draft' | 'in_progress' | 'completed' | 'submitted' | 'approved' | 'rejected';
  completionPercentage: number;
  createdAt: string;
  updatedAt: string;
  sections: DossierSection[];
  workflowId?: string;
}

export interface DossierSection {
  id: string;
  dossierId: string;
  sectionNumber: number;
  sectionName: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected';
  documents: DossierDocument[];
  completedAt?: string;
  notes?: string;
}

export interface DossierDocument {
  id: string;
  sectionId: string;
  dossierId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  version: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: string;
  notes?: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  country: string;
  address: string;
  contactEmail: string;
  certifications: string[];
  isActive: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  activeRegistrations: number;
  pendingWorkflows: number;
  expiringRegistrations: number;
  totalDossiers: number;
  completedDossiers: number;
  workflowDistribution: { name: string; value: number; color: string }[];
  statusDistribution: { name: string; value: number; color: string }[];
  monthlyRegistrations: { month: string; registrations: number; renewals: number }[];
  dossierProgress: { country: string; completed: number; total: number; percentage: number }[];
}