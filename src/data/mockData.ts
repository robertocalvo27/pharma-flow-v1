import { Product, Workflow, DashboardStats, Country, Dossier, DossierSection } from '../types';
import { DOSSIER_SECTIONS } from '../utils/constants';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Paracetamol Plus 500mg',
    activeIngredient: 'Paracetamol + Cafeína',
    pharmaceuticalForm: 'Comprimidos',
    concentration: '500mg + 50mg',
    manufacturerId: 'mfg-1',
    manufacturerName: 'Laboratorios Farmex S.A.',
    therapeuticClass: 'Analgésicos y Antipiréticos',
    atcCode: 'N02BE51',
    status: 'approved',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    registrations: [
      {
        id: 'reg-1',
        productId: '1',
        countryCode: 'CO',
        countryName: 'Colombia',
        registrationNumber: 'INVIMA-2024-001234',
        registrationDate: '2024-01-20',
        expiryDate: '2029-01-20',
        status: 'approved',
        regulatoryPathway: 'Registro Sanitario Nacional',
        workflowId: 'wf-1'
      },
      {
        id: 'reg-2',
        productId: '1',
        countryCode: 'PE',
        countryName: 'Perú',
        registrationNumber: 'DIGEMID-2024-5678',
        registrationDate: '2024-02-10',
        expiryDate: '2029-02-10',
        status: 'approved',
        regulatoryPathway: 'Registro Sanitario'
      }
    ]
  },
  {
    id: '2',
    name: 'Amoxicilina 875mg',
    activeIngredient: 'Amoxicilina',
    pharmaceuticalForm: 'Comprimidos recubiertos',
    concentration: '875mg',
    manufacturerId: 'mfg-2',
    manufacturerName: 'Biotech Pharmaceuticals Ltd.',
    therapeuticClass: 'Antibióticos betalactámicos',
    atcCode: 'J01CA04',
    status: 'submitted',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-15T16:45:00Z',
    registrations: [
      {
        id: 'reg-3',
        productId: '2',
        countryCode: 'CO',
        countryName: 'Colombia',
        registrationNumber: 'INVIMA-2024-002345',
        registrationDate: '2024-02-15',
        expiryDate: '2029-02-15',
        status: 'pending',
        regulatoryPathway: 'Registro Sanitario Nacional',
        workflowId: 'wf-2'
      }
    ]
  },
  {
    id: '3',
    name: 'Ibuprofeno 400mg',
    activeIngredient: 'Ibuprofeno',
    pharmaceuticalForm: 'Cápsulas blandas',
    concentration: '400mg',
    manufacturerId: 'mfg-1',
    manufacturerName: 'Laboratorios Farmex S.A.',
    therapeuticClass: 'Antiinflamatorios no esteroideos',
    atcCode: 'M01AE01',
    status: 'approved',
    createdAt: '2023-11-10T11:20:00Z',
    updatedAt: '2024-01-05T13:10:00Z',
    registrations: [
      {
        id: 'reg-4',
        productId: '3',
        countryCode: 'MX',
        countryName: 'México',
        registrationNumber: 'COFEPRIS-2023-98765',
        registrationDate: '2023-12-01',
        expiryDate: '2024-12-01',
        status: 'renewal_required',
        regulatoryPathway: 'Registro Sanitario',
        workflowId: 'wf-3'
      }
    ]
  }
];

export const mockWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    productId: '1',
    productName: 'Paracetamol Plus 500mg',
    countryCode: 'CO',
    countryName: 'Colombia',
    workflowType: 'registration',
    currentStep: 'Área Aprobadores',
    status: 'completed',
    assignedTo: 'user-1',
    assignedToName: 'Dr. Carlos Mendoza',
    dueDate: '2024-01-25',
    createdAt: '2024-01-15T10:00:00Z',
    progress: 100,
    steps: [
      {
        id: 'step-1',
        workflowId: 'wf-1',
        stepName: 'Generado',
        stepOrder: 1,
        status: 'completed',
        assignedTo: 'user-1',
        assignedToName: 'Dr. Carlos Mendoza',
        completedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'step-2',
        workflowId: 'wf-1',
        stepName: 'CDA Administración',
        stepOrder: 2,
        status: 'completed',
        assignedTo: 'user-2',
        assignedToName: 'Ana Torres',
        completedAt: '2024-01-16T14:30:00Z'
      },
      {
        id: 'step-3',
        workflowId: 'wf-1',
        stepName: 'SGDMA Patrimonial',
        stepOrder: 3,
        status: 'completed',
        assignedTo: 'user-3',
        assignedToName: 'Luis Ramírez',
        completedAt: '2024-01-17T11:45:00Z'
      },
      {
        id: 'step-4',
        workflowId: 'wf-1',
        stepName: 'Área Aprobadores',
        stepOrder: 4,
        status: 'completed',
        assignedTo: 'user-4',
        assignedToName: 'Dra. Patricia Silva',
        completedAt: '2024-01-20T16:00:00Z'
      }
    ]
  },
  {
    id: 'wf-2',
    productId: '2',
    productName: 'Amoxicilina 875mg',
    countryCode: 'CO',
    countryName: 'Colombia',
    workflowType: 'registration',
    currentStep: 'Gestión Social',
    status: 'in_progress',
    assignedTo: 'user-5',
    assignedToName: 'María Rodríguez',
    dueDate: '2024-03-15',
    createdAt: '2024-02-01T09:15:00Z',
    progress: 60,
    steps: [
      {
        id: 'step-5',
        workflowId: 'wf-2',
        stepName: 'Generado',
        stepOrder: 1,
        status: 'completed',
        assignedTo: 'user-1',
        assignedToName: 'Dr. Carlos Mendoza',
        completedAt: '2024-02-01T09:15:00Z'
      },
      {
        id: 'step-6',
        workflowId: 'wf-2',
        stepName: 'CDA Administración',
        stepOrder: 2,
        status: 'completed',
        assignedTo: 'user-2',
        assignedToName: 'Ana Torres',
        completedAt: '2024-02-03T10:20:00Z'
      },
      {
        id: 'step-7',
        workflowId: 'wf-2',
        stepName: 'SGDMA Patrimonial',
        stepOrder: 3,
        status: 'completed',
        assignedTo: 'user-3',
        assignedToName: 'Luis Ramírez',
        completedAt: '2024-02-05T15:30:00Z'
      },
      {
        id: 'step-8',
        workflowId: 'wf-2',
        stepName: 'Gestión Social',
        stepOrder: 4,
        status: 'in_progress',
        assignedTo: 'user-5',
        assignedToName: 'María Rodríguez'
      },
      {
        id: 'step-9',
        workflowId: 'wf-2',
        stepName: 'Salud Ocupacional',
        stepOrder: 5,
        status: 'pending',
        assignedTo: 'user-6',
        assignedToName: 'Dr. Roberto Cruz'
      }
    ]
  },
  {
    id: 'wf-3',
    productId: '3',
    productName: 'Ibuprofeno 400mg',
    countryCode: 'MX',
    countryName: 'México',
    workflowType: 'renewal',
    currentStep: 'Documentación Técnica',
    status: 'in_progress',
    assignedTo: 'user-7',
    assignedToName: 'Ing. Sofia López',
    dueDate: '2024-11-01',
    createdAt: '2024-10-01T08:00:00Z',
    progress: 25,
    steps: [
      {
        id: 'step-10',
        workflowId: 'wf-3',
        stepName: 'Solicitud de Renovación',
        stepOrder: 1,
        status: 'completed',
        assignedTo: 'user-7',
        assignedToName: 'Ing. Sofia López',
        completedAt: '2024-10-01T08:00:00Z'
      },
      {
        id: 'step-11',
        workflowId: 'wf-3',
        stepName: 'Documentación Técnica',
        stepOrder: 2,
        status: 'in_progress',
        assignedTo: 'user-7',
        assignedToName: 'Ing. Sofia López'
      },
      {
        id: 'step-12',
        workflowId: 'wf-3',
        stepName: 'Revisión Regulatoria',
        stepOrder: 3,
        status: 'pending',
        assignedTo: 'user-8',
        assignedToName: 'Dr. Fernando Vega'
      },
      {
        id: 'step-13',
        workflowId: 'wf-3',
        stepName: 'Aprobación Final',
        stepOrder: 4,
        status: 'pending',
        assignedTo: 'user-4',
        assignedToName: 'Dra. Patricia Silva'
      }
    ]
  }
];

// Helper function to create dossier sections
const createDossierSections = (dossierId: string): DossierSection[] => {
  return DOSSIER_SECTIONS.map((section, index) => ({
    id: `${dossierId}-section-${index + 1}`,
    dossierId,
    sectionNumber: section.number,
    sectionName: section.name,
    description: section.description,
    status: Math.random() > 0.3 ? 'completed' : Math.random() > 0.5 ? 'in_progress' : 'pending',
    documents: [],
    completedAt: Math.random() > 0.3 ? new Date().toISOString() : undefined,
    notes: Math.random() > 0.7 ? 'Sección completada satisfactoriamente' : undefined
  }));
};

export const mockDossiers: Dossier[] = [
  {
    id: 'dossier-1',
    productId: '1',
    productName: 'Paracetamol Plus 500mg',
    manufacturerId: 'mfg-1',
    manufacturerName: 'Laboratorios Farmex S.A.',
    countryCode: 'CR',
    countryName: 'Costa Rica',
    status: 'approved',
    completionPercentage: 100,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    sections: createDossierSections('dossier-1').map(s => ({ ...s, status: 'completed' as const })),
    workflowId: 'wf-1'
  },
  {
    id: 'dossier-2',
    productId: '1',
    productName: 'Paracetamol Plus 500mg',
    manufacturerId: 'mfg-1',
    manufacturerName: 'Laboratorios Farmex S.A.',
    countryCode: 'GT',
    countryName: 'Guatemala',
    status: 'in_progress',
    completionPercentage: 75,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-15T16:00:00Z',
    sections: createDossierSections('dossier-2')
  },
  {
    id: 'dossier-3',
    productId: '2',
    productName: 'Amoxicilina 875mg',
    manufacturerId: 'mfg-2',
    manufacturerName: 'Biotech Pharmaceuticals Ltd.',
    countryCode: 'CR',
    countryName: 'Costa Rica',
    status: 'draft',
    completionPercentage: 25,
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-02-20T11:30:00Z',
    sections: createDossierSections('dossier-3')
  },
  {
    id: 'dossier-4',
    productId: '1',
    productName: 'Paracetamol Plus 500mg',
    manufacturerId: 'mfg-2',
    manufacturerName: 'Biotech Pharmaceuticals Ltd.',
    countryCode: 'PA',
    countryName: 'Panamá',
    status: 'submitted',
    completionPercentage: 90,
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-02-05T12:00:00Z',
    sections: createDossierSections('dossier-4')
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProducts: 23,
  activeRegistrations: 45,
  pendingWorkflows: 8,
  expiringRegistrations: 3,
  totalDossiers: 42,
  completedDossiers: 18,
  workflowDistribution: [
    { name: 'Registros', value: 12, color: '#2563EB' },
    { name: 'Renovaciones', value: 6, color: '#059669' },
    { name: 'Variaciones', value: 4, color: '#EA580C' },
    { name: 'Completados', value: 18, color: '#10B981' }
  ],
  statusDistribution: [
    { name: 'Aprobados', value: 28, color: '#10B981' },
    { name: 'En Proceso', value: 12, color: '#F59E0B' },
    { name: 'Pendientes', value: 8, color: '#6B7280' },
    { name: 'Próximos a Vencer', value: 3, color: '#EF4444' }
  ],
  monthlyRegistrations: [
    { month: 'Ene', registrations: 4, renewals: 2 },
    { month: 'Feb', registrations: 6, renewals: 1 },
    { month: 'Mar', registrations: 3, renewals: 4 },
    { month: 'Abr', registrations: 8, renewals: 2 },
    { month: 'May', registrations: 5, renewals: 3 },
    { month: 'Jun', registrations: 7, renewals: 1 },
    { month: 'Jul', registrations: 4, renewals: 5 },
    { month: 'Ago', registrations: 9, renewals: 2 },
    { month: 'Sep', registrations: 6, renewals: 3 },
    { month: 'Oct', registrations: 3, renewals: 6 }
  ],
  dossierProgress: [
    { country: 'Costa Rica', completed: 8, total: 12, percentage: 67 },
    { country: 'Guatemala', completed: 5, total: 8, percentage: 63 },
    { country: 'Panamá', completed: 3, total: 6, percentage: 50 },
    { country: 'El Salvador', completed: 2, total: 4, percentage: 50 }
  ]
};

export const mockCountries: Country[] = [
  { code: 'CO', name: 'Colombia', regulatoryAgency: 'INVIMA', isActive: true },
  { code: 'PE', name: 'Perú', regulatoryAgency: 'DIGEMID', isActive: true },
  { code: 'MX', name: 'México', regulatoryAgency: 'COFEPRIS', isActive: true },
  { code: 'AR', name: 'Argentina', regulatoryAgency: 'ANMAT', isActive: true },
  { code: 'CL', name: 'Chile', regulatoryAgency: 'ISP', isActive: true },
  { code: 'EC', name: 'Ecuador', regulatoryAgency: 'ARCSA', isActive: true },
  { code: 'BO', name: 'Bolivia', regulatoryAgency: 'AGEMED', isActive: true },
  { code: 'PY', name: 'Paraguay', regulatoryAgency: 'DINAVISA', isActive: true }
];