// Compliance Center Types
export interface RegulatoryAgency {
  id: string;
  countryCode: string;
  countryName: string;
  agencyName: string;
  agencyAcronym: string;
  website: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
  regulatoryFramework: RegulatoryFramework;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegulatoryFramework {
  id: string;
  agencyId: string;
  registrationTypes: RegistrationType[];
  requiredDocuments: RequiredDocument[];
  timelines: RegulatoryTimeline[];
  fees: RegulatoryFee[];
  lastUpdated: string;
}

export interface RegistrationType {
  id: string;
  name: string;
  description: string;
  category: 'new_drug' | 'generic' | 'biosimilar' | 'otc' | 'medical_device';
  estimatedTimelineDays: number;
  baseFee: number;
  currency: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  category: string;
  isMandatory: boolean;
  templateAvailable: boolean;
  language: 'es' | 'pt' | 'en';
}

export interface RegulatoryTimeline {
  id: string;
  phase: string;
  description: string;
  estimatedDays: number;
  dependencies: string[];
}

export interface RegulatoryFee {
  id: string;
  feeType: string;
  description: string;
  amount: number;
  currency: string;
  applicableFor: string[];
}

export interface ComplianceAlert {
  id: string;
  type: 'regulatory_change' | 'deadline_approaching' | 'document_expiring' | 'fee_change' | 'new_requirement' | 'process_update';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  countryCode: string;
  countryName: string;
  agencyAcronym: string;
  affectedProducts?: string[];
  actionRequired: string;
  deadline?: string;
  sourceUrl?: string;
  createdAt: string;
  isRead: boolean;
  isArchived: boolean;
}

export interface RegulatoryUpdate {
  id: string;
  countryCode: string;
  countryName: string;
  agencyId: string;
  agencyAcronym: string;
  updateType: 'law_change' | 'guideline_update' | 'fee_change' | 'process_change' | 'deadline_extension' | 'new_requirement';
  title: string;
  summary: string;
  fullContent: string;
  effectiveDate: string;
  publishedDate: string;
  impactLevel: 'low' | 'medium' | 'high';
  affectedCategories: string[];
  sourceUrl: string;
  tags: string[];
}

export interface ComplianceDeadline {
  id: string;
  productId?: string;
  productName?: string;
  countryCode: string;
  countryName: string;
  deadlineType: 'registration_renewal' | 'document_submission' | 'fee_payment' | 'inspection' | 'response_required';
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignedTo?: string;
  assignedToName?: string;
  reminderDays: number[];
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  eventType: 'deadline' | 'conference' | 'workshop' | 'regulatory_change' | 'industry_event';
  startDate: string;
  endDate?: string;
  countryCode?: string;
  location?: string;
  isVirtual: boolean;
  registrationUrl?: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

export interface DocumentTemplate {
  id: string;
  templateName: string;
  description: string;
  countryCode: string;
  countryName: string;
  agencyAcronym: string;
  documentType: string;
  category: string;
  language: 'es' | 'pt' | 'en';
  fileFormat: 'docx' | 'pdf' | 'xlsx' | 'pptx';
  fileSize: number;
  version: string;
  lastUpdated: string;
  downloadUrl: string;
  previewUrl?: string;
  isPopular: boolean;
  downloadCount: number;
  tags: string[];
}

export interface CountryGuide {
  id: string;
  countryCode: string;
  countryName: string;
  agencyInfo: RegulatoryAgency;
  overview: string;
  keyRequirements: string[];
  registrationProcess: ProcessStep[];
  timelineEstimate: TimelineEstimate;
  feeStructure: FeeStructure;
  localContacts: LocalContact[];
  recentUpdates: RegulatoryUpdate[];
  lastUpdated: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  estimatedDays: number;
  requiredDocuments: string[];
  tips: string[];
  commonIssues: string[];
}

export interface TimelineEstimate {
  minDays: number;
  maxDays: number;
  averageDays: number;
  factors: string[];
}

export interface FeeStructure {
  baseFee: number;
  additionalFees: AdditionalFee[];
  currency: string;
  paymentMethods: string[];
  notes: string[];
}

export interface AdditionalFee {
  name: string;
  amount: number;
  description: string;
  isOptional: boolean;
}

export interface LocalContact {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone?: string;
  specialties: string[];
  languages: string[];
  isVerified: boolean;
  rating: number;
  reviewCount: number;
}

export interface AlertPreferences {
  enabledCountries: string[];
  alertTypes: ComplianceAlert['type'][];
  severityLevels: ComplianceAlert['severity'][];
  channels: NotificationChannel[];
  frequency: 'immediate' | 'daily' | 'weekly';
  quietHours: {
    start: string;
    end: string;
    timezone: string;
  };
  emailDigest: boolean;
  smsAlerts: boolean;
}

export interface NotificationChannel {
  type: 'email' | 'sms' | 'push' | 'webhook' | 'slack';
  enabled: boolean;
  config?: Record<string, any>;
}

export interface ComplianceDashboardStats {
  totalAlerts: number;
  criticalAlerts: number;
  unreadAlerts: number;
  upcomingDeadlines: number;
  overdueDeadlines: number;
  recentUpdates: number;
  subscribedCountries: number;
  complianceScore: number;
  alertsByCountry: { countryCode: string; countryName: string; count: number }[];
  alertsBySeverity: { severity: string; count: number; color: string }[];
  deadlinesByMonth: { month: string; count: number }[];
  updatesByType: { type: string; count: number; color: string }[];
}

export interface ComplianceReport {
  id: string;
  reportType: 'compliance_score' | 'gap_analysis' | 'timeline_compliance' | 'cost_analysis' | 'risk_assessment';
  title: string;
  description: string;
  generatedAt: string;
  generatedBy: string;
  parameters: Record<string, any>;
  data: Record<string, any>;
  charts: ChartData[];
  exportFormats: ('pdf' | 'excel' | 'csv')[];
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'area' | 'scatter';
  title: string;
  data: any[];
  config: Record<string, any>;
}

// Store interfaces
export interface ComplianceState {
  // Data
  agencies: RegulatoryAgency[];
  regulatoryUpdates: RegulatoryUpdate[];
  complianceAlerts: ComplianceAlert[];
  upcomingDeadlines: ComplianceDeadline[];
  regulatoryCalendar: CalendarEvent[];
  documentTemplates: DocumentTemplate[];
  countryGuides: CountryGuide[];
  
  // UI State
  selectedCountry: string | null;
  selectedAgency: string | null;
  alertsFilter: {
    severity: ComplianceAlert['severity'][];
    type: ComplianceAlert['type'][];
    countries: string[];
    isRead: boolean | null;
  };
  
  // User Preferences
  subscribedCountries: string[];
  alertPreferences: AlertPreferences;
  
  // Dashboard Stats
  dashboardStats: ComplianceDashboardStats | null;
  
  // Loading States
  isLoading: boolean;
  isLoadingAlerts: boolean;
  isLoadingUpdates: boolean;
  isLoadingDeadlines: boolean;
  
  // Actions
  fetchDashboardStats: () => Promise<void>;
  fetchRegulatoryUpdates: (countryCode?: string) => Promise<void>;
  fetchComplianceAlerts: () => Promise<void>;
  fetchUpcomingDeadlines: () => Promise<void>;
  fetchDocumentTemplates: (countryCode?: string) => Promise<void>;
  fetchCountryGuides: () => Promise<void>;
  
  markAlertAsRead: (alertId: string) => void;
  archiveAlert: (alertId: string) => void;
  subscribeToCountry: (countryCode: string) => void;
  unsubscribeFromCountry: (countryCode: string) => void;
  updateAlertPreferences: (preferences: Partial<AlertPreferences>) => void;
  
  setSelectedCountry: (countryCode: string | null) => void;
  setSelectedAgency: (agencyId: string | null) => void;
  updateAlertsFilter: (filter: Partial<ComplianceState['alertsFilter']>) => void;
} 