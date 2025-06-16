import { 
  RegulatoryAgency, 
  ComplianceAlert, 
  RegulatoryUpdate, 
  ComplianceDeadline, 
  CalendarEvent, 
  DocumentTemplate, 
  CountryGuide,
  ComplianceDashboardStats,
  ProcessStep,
  TimelineEstimate,
  FeeStructure,
  LocalContact
} from '../types/compliance';

// Regulatory Agencies Data
export const mockRegulatoryAgencies: RegulatoryAgency[] = [
  {
    id: 'invima-co',
    countryCode: 'CO',
    countryName: 'Colombia',
    agencyName: 'Instituto Nacional de Vigilancia de Medicamentos y Alimentos',
    agencyAcronym: 'INVIMA',
    website: 'https://www.invima.gov.co',
    contactEmail: 'contacto@invima.gov.co',
    phone: '+57 1 294 8700',
    address: 'Carrera 68D No. 17-11/21, Bogotá D.C., Colombia',
    regulatoryFramework: {
      id: 'rf-invima',
      agencyId: 'invima-co',
      registrationTypes: [
        {
          id: 'new-drug-co',
          name: 'Registro Sanitario Medicamento Nuevo',
          description: 'Registro para medicamentos con principio activo nuevo',
          category: 'new_drug',
          estimatedTimelineDays: 180,
          baseFee: 2500000,
          currency: 'COP'
        },
        {
          id: 'generic-co',
          name: 'Registro Sanitario Medicamento Genérico',
          description: 'Registro para medicamentos genéricos',
          category: 'generic',
          estimatedTimelineDays: 120,
          baseFee: 1800000,
          currency: 'COP'
        }
      ],
      requiredDocuments: [],
      timelines: [],
      fees: [],
      lastUpdated: '2024-01-15'
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'cofepris-mx',
    countryCode: 'MX',
    countryName: 'México',
    agencyName: 'Comisión Federal para la Protección contra Riesgos Sanitarios',
    agencyAcronym: 'COFEPRIS',
    website: 'https://www.gob.mx/cofepris',
    contactEmail: 'contacto.cofepris@salud.gob.mx',
    phone: '+52 55 5080 5200',
    address: 'Oklahoma 14, Nápoles, Benito Juárez, 03810 Ciudad de México, CDMX',
    regulatoryFramework: {
      id: 'rf-cofepris',
      agencyId: 'cofepris-mx',
      registrationTypes: [
        {
          id: 'new-drug-mx',
          name: 'Registro Sanitario de Medicamento',
          description: 'Registro sanitario para medicamentos alopáticos',
          category: 'new_drug',
          estimatedTimelineDays: 240,
          baseFee: 45000,
          currency: 'MXN'
        }
      ],
      requiredDocuments: [],
      timelines: [],
      fees: [],
      lastUpdated: '2024-01-10'
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'anvisa-br',
    countryCode: 'BR',
    countryName: 'Brasil',
    agencyName: 'Agência Nacional de Vigilância Sanitária',
    agencyAcronym: 'ANVISA',
    website: 'https://www.gov.br/anvisa',
    contactEmail: 'ouvidoria@anvisa.gov.br',
    phone: '+55 61 3462 6000',
    address: 'SIA Trecho 5, Área Especial 57, Brasília - DF, 71205-050',
    regulatoryFramework: {
      id: 'rf-anvisa',
      agencyId: 'anvisa-br',
      registrationTypes: [
        {
          id: 'new-drug-br',
          name: 'Registro de Medicamento Novo',
          description: 'Registro para medicamentos com princípio ativo novo',
          category: 'new_drug',
          estimatedTimelineDays: 365,
          baseFee: 25000,
          currency: 'BRL'
        }
      ],
      requiredDocuments: [],
      timelines: [],
      fees: [],
      lastUpdated: '2024-01-12'
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },
  {
    id: 'anmat-ar',
    countryCode: 'AR',
    countryName: 'Argentina',
    agencyName: 'Administración Nacional de Medicamentos, Alimentos y Tecnología Médica',
    agencyAcronym: 'ANMAT',
    website: 'https://www.argentina.gob.ar/anmat',
    contactEmail: 'consultas@anmat.gov.ar',
    phone: '+54 11 4340 0800',
    address: 'Av. de Mayo 869, C1084 CABA, Argentina',
    regulatoryFramework: {
      id: 'rf-anmat',
      agencyId: 'anmat-ar',
      registrationTypes: [],
      requiredDocuments: [],
      timelines: [],
      fees: [],
      lastUpdated: '2024-01-08'
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z'
  },
  {
    id: 'digemid-pe',
    countryCode: 'PE',
    countryName: 'Perú',
    agencyName: 'Dirección General de Medicamentos, Insumos y Drogas',
    agencyAcronym: 'DIGEMID',
    website: 'https://www.digemid.minsa.gob.pe',
    contactEmail: 'postmaster@digemid.minsa.gob.pe',
    phone: '+51 1 631 4300',
    address: 'Av. Salaverry 801, Jesús María, Lima, Perú',
    regulatoryFramework: {
      id: 'rf-digemid',
      agencyId: 'digemid-pe',
      registrationTypes: [],
      requiredDocuments: [],
      timelines: [],
      fees: [],
      lastUpdated: '2024-01-05'
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'isp-cl',
    countryCode: 'CL',
    countryName: 'Chile',
    agencyName: 'Instituto de Salud Pública de Chile',
    agencyAcronym: 'ISP',
    website: 'https://www.ispch.cl',
    contactEmail: 'contacto@ispch.cl',
    phone: '+56 2 2575 6000',
    address: 'Marathon 1000, Ñuñoa, Santiago, Chile',
    regulatoryFramework: {
      id: 'rf-isp',
      agencyId: 'isp-cl',
      registrationTypes: [],
      requiredDocuments: [],
      timelines: [],
      fees: [],
      lastUpdated: '2024-01-03'
    },
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
];

// Compliance Alerts Data
export const mockComplianceAlerts: ComplianceAlert[] = [
  {
    id: 'alert-001',
    type: 'regulatory_change',
    severity: 'critical',
    title: 'INVIMA actualiza requisitos para registro de medicamentos biotecnológicos',
    description: 'Nueva resolución 2023-456 establece requisitos adicionales para el registro de medicamentos biotecnológicos, incluyendo estudios de inmunogenicidad obligatorios.',
    countryCode: 'CO',
    countryName: 'Colombia',
    agencyAcronym: 'INVIMA',
    affectedProducts: ['prod-001', 'prod-003'],
    actionRequired: 'Revisar expedientes de productos biotecnológicos y preparar estudios de inmunogenicidad',
    deadline: '2024-03-15',
    sourceUrl: 'https://www.invima.gov.co/resoluciones/2023-456',
    createdAt: '2024-01-20T10:30:00Z',
    isRead: false,
    isArchived: false
  },
  {
    id: 'alert-002',
    type: 'deadline_approaching',
    severity: 'high',
    title: 'Vencimiento de registro sanitario - Paracetamol Plus 500mg',
    description: 'El registro sanitario del producto Paracetamol Plus 500mg vence el 28 de febrero de 2024. Iniciar proceso de renovación.',
    countryCode: 'CO',
    countryName: 'Colombia',
    agencyAcronym: 'INVIMA',
    affectedProducts: ['prod-001'],
    actionRequired: 'Iniciar trámite de renovación de registro sanitario',
    deadline: '2024-02-28',
    createdAt: '2024-01-18T14:15:00Z',
    isRead: false,
    isArchived: false
  },
  {
    id: 'alert-003',
    type: 'fee_change',
    severity: 'medium',
    title: 'COFEPRIS incrementa tarifas para registro de medicamentos genéricos',
    description: 'A partir del 1 de marzo de 2024, las tarifas para registro de medicamentos genéricos aumentan un 15%.',
    countryCode: 'MX',
    countryName: 'México',
    agencyAcronym: 'COFEPRIS',
    actionRequired: 'Actualizar presupuestos para registros en México',
    deadline: '2024-03-01',
    sourceUrl: 'https://www.gob.mx/cofepris/tarifas-2024',
    createdAt: '2024-01-15T09:45:00Z',
    isRead: true,
    isArchived: false
  },
  {
    id: 'alert-004',
    type: 'new_requirement',
    severity: 'high',
    title: 'ANVISA implementa nuevo sistema de farmacovigilancia',
    description: 'Nuevo sistema VigiMed será obligatorio para todos los titulares de registro a partir de abril 2024.',
    countryCode: 'BR',
    countryName: 'Brasil',
    agencyAcronym: 'ANVISA',
    actionRequired: 'Registrarse en el sistema VigiMed y capacitar al equipo',
    deadline: '2024-04-01',
    sourceUrl: 'https://www.gov.br/anvisa/vigimed',
    createdAt: '2024-01-12T16:20:00Z',
    isRead: false,
    isArchived: false
  },
  {
    id: 'alert-005',
    type: 'process_update',
    severity: 'low',
    title: 'ANMAT simplifica proceso de variaciones menores',
    description: 'Nuevo procedimiento permite tramitar variaciones menores de forma electrónica con tiempos reducidos.',
    countryCode: 'AR',
    countryName: 'Argentina',
    agencyAcronym: 'ANMAT',
    actionRequired: 'Revisar procedimientos internos para variaciones menores',
    sourceUrl: 'https://www.argentina.gob.ar/anmat/variaciones-menores',
    createdAt: '2024-01-10T11:30:00Z',
    isRead: true,
    isArchived: false
  }
];

// Regulatory Updates Data
export const mockRegulatoryUpdates: RegulatoryUpdate[] = [
  {
    id: 'update-001',
    countryCode: 'CO',
    countryName: 'Colombia',
    agencyId: 'invima-co',
    agencyAcronym: 'INVIMA',
    updateType: 'guideline_update',
    title: 'Actualización de la Guía de Buenas Prácticas de Manufactura',
    summary: 'INVIMA publica la versión 2024 de la guía de BPM con nuevos requisitos para instalaciones y equipos.',
    fullContent: 'La nueva guía incluye requisitos específicos para la validación de sistemas computarizados, gestión de riesgos de calidad y nuevos estándares para áreas de producción estéril...',
    effectiveDate: '2024-04-01',
    publishedDate: '2024-01-15',
    impactLevel: 'high',
    affectedCategories: ['manufacturing', 'quality_control', 'sterile_products'],
    sourceUrl: 'https://www.invima.gov.co/guias/bpm-2024',
    tags: ['BPM', 'manufactura', 'calidad', 'validación']
  },
  {
    id: 'update-002',
    countryCode: 'MX',
    countryName: 'México',
    agencyId: 'cofepris-mx',
    agencyAcronym: 'COFEPRIS',
    updateType: 'law_change',
    title: 'Reforma al Reglamento de Insumos para la Salud',
    summary: 'Modificaciones importantes al artículo 167 sobre intercambiabilidad de medicamentos genéricos.',
    fullContent: 'Las modificaciones establecen nuevos criterios para demostrar intercambiabilidad, incluyendo estudios de bioequivalencia para formas farmacéuticas de liberación modificada...',
    effectiveDate: '2024-06-01',
    publishedDate: '2024-01-10',
    impactLevel: 'high',
    affectedCategories: ['generic_drugs', 'bioequivalence', 'interchangeability'],
    sourceUrl: 'https://www.gob.mx/cofepris/reglamento-insumos-salud',
    tags: ['intercambiabilidad', 'genéricos', 'bioequivalencia', 'reglamento']
  },
  {
    id: 'update-003',
    countryCode: 'BR',
    countryName: 'Brasil',
    agencyId: 'anvisa-br',
    agencyAcronym: 'ANVISA',
    updateType: 'process_change',
    title: 'Novo processo eletrônico para registro de medicamentos',
    summary: 'ANVISA implementa plataforma digital única para todos os processos de registro de medicamentos.',
    fullContent: 'A nova plataforma "RegMed Digital" permitirá o acompanhamento em tempo real dos processos, submissão eletrônica de documentos e comunicação direta com a agência...',
    effectiveDate: '2024-05-01',
    publishedDate: '2024-01-08',
    impactLevel: 'medium',
    affectedCategories: ['registration_process', 'digital_platform', 'electronic_submission'],
    sourceUrl: 'https://www.gov.br/anvisa/regmed-digital',
    tags: ['processo eletrônico', 'plataforma digital', 'registro', 'medicamentos']
  }
];

// Compliance Deadlines Data
export const mockComplianceDeadlines: ComplianceDeadline[] = [
  {
    id: 'deadline-001',
    productId: 'prod-001',
    productName: 'Paracetamol Plus 500mg',
    countryCode: 'CO',
    countryName: 'Colombia',
      deadlineType: 'registration_renewal',
  title: 'Renovación de Registro Sanitario',
  description: 'Renovación quinquenal del registro sanitario INVIMA RSA-2019-001234',
  dueDate: '2024-02-28',
  priority: 'high',
    status: 'pending',
    assignedTo: 'user-001',
    assignedToName: 'María González',
    reminderDays: [30, 15, 7, 1],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'deadline-002',
    productId: 'prod-002',
    productName: 'Amoxicilina 875mg',
    countryCode: 'MX',
    countryName: 'México',
    deadlineType: 'document_submission',
    title: 'Entrega de Reporte Anual de Farmacovigilancia',
    description: 'Reporte anual de eventos adversos para el período 2023',
    dueDate: '2024-03-31',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'user-002',
    assignedToName: 'Carlos Rodríguez',
    reminderDays: [60, 30, 15, 7],
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'deadline-003',
    countryCode: 'BR',
    countryName: 'Brasil',
    deadlineType: 'fee_payment',
    title: 'Pago de Taxa Anual ANVISA',
    description: 'Taxa anual de vigilância sanitária para produtos registrados',
    dueDate: '2024-04-30',
    priority: 'medium',
    status: 'pending',
    reminderDays: [90, 60, 30, 15],
    createdAt: '2024-01-10T00:00:00Z'
  }
];

// Calendar Events Data
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'event-001',
    title: 'Congreso Latinoamericano de Asuntos Regulatorios',
    description: 'Evento anual que reúne a profesionales de asuntos regulatorios de toda Latinoamérica',
    eventType: 'conference',
    startDate: '2024-05-15',
    endDate: '2024-05-17',
    countryCode: 'CO',
    location: 'Bogotá, Colombia',
    isVirtual: false,
    registrationUrl: 'https://www.congreso-regulatorio-latam.com',
    priority: 'high',
    tags: ['regulatorio', 'networking', 'capacitación', 'LATAM']
  },
  {
    id: 'event-002',
    title: 'Webinar COFEPRIS: Nuevos Requisitos de Intercambiabilidad',
    description: 'Sesión informativa sobre las modificaciones al reglamento de intercambiabilidad',
    eventType: 'workshop',
    startDate: '2024-02-20',
    countryCode: 'MX',
    isVirtual: true,
    registrationUrl: 'https://www.gob.mx/cofepris/webinar-intercambiabilidad',
    priority: 'high',
    tags: ['COFEPRIS', 'intercambiabilidad', 'genéricos', 'webinar']
  },
  {
    id: 'event-003',
    title: 'Entrada en vigor: Nueva Guía BPM INVIMA',
    description: 'Fecha efectiva de la nueva guía de Buenas Prácticas de Manufactura',
    eventType: 'regulatory_change',
    startDate: '2024-04-01',
    countryCode: 'CO',
    isVirtual: false,
    priority: 'high',
    tags: ['INVIMA', 'BPM', 'manufactura', 'regulación']
  }
];

// Document Templates Data
export const mockDocumentTemplates: DocumentTemplate[] = [
  {
    id: 'template-001',
    templateName: 'Solicitud de Registro Sanitario - INVIMA',
    description: 'Formato oficial para solicitud de registro sanitario de medicamentos ante INVIMA',
    countryCode: 'CO',
    countryName: 'Colombia',
    agencyAcronym: 'INVIMA',
    documentType: 'application_form',
    category: 'registration',
    language: 'es',
    fileFormat: 'docx',
    fileSize: 245760,
    version: '2024.1',
    lastUpdated: '2024-01-15',
    downloadUrl: '/templates/invima-registro-sanitario-2024.docx',
    previewUrl: '/templates/preview/invima-registro-sanitario-2024.pdf',
    isPopular: true,
    downloadCount: 156,
    tags: ['INVIMA', 'registro sanitario', 'solicitud', 'medicamentos']
  },
  {
    id: 'template-002',
    templateName: 'Certificado de Análisis - Formato COFEPRIS',
    description: 'Plantilla para certificado de análisis según especificaciones COFEPRIS',
    countryCode: 'MX',
    countryName: 'México',
    agencyAcronym: 'COFEPRIS',
    documentType: 'certificate_of_analysis',
    category: 'quality_control',
    language: 'es',
    fileFormat: 'xlsx',
    fileSize: 89432,
    version: '2023.3',
    lastUpdated: '2024-01-10',
    downloadUrl: '/templates/cofepris-certificado-analisis.xlsx',
    isPopular: true,
    downloadCount: 203,
    tags: ['COFEPRIS', 'certificado análisis', 'control calidad', 'especificaciones']
  },
  {
    id: 'template-003',
    templateName: 'Relatório de Farmacovigilância - ANVISA',
    description: 'Modelo para relatório anual de farmacovigilância conforme RDC 4/2009',
    countryCode: 'BR',
    countryName: 'Brasil',
    agencyAcronym: 'ANVISA',
    documentType: 'pharmacovigilance_report',
    category: 'safety',
    language: 'pt',
    fileFormat: 'docx',
    fileSize: 178945,
    version: '2024.1',
    lastUpdated: '2024-01-08',
    downloadUrl: '/templates/anvisa-relatorio-farmacovigilancia.docx',
    isPopular: false,
    downloadCount: 67,
    tags: ['ANVISA', 'farmacovigilância', 'relatório anual', 'segurança']
  }
];

// Dashboard Stats Data
export const mockDashboardStats: ComplianceDashboardStats = {
  totalAlerts: 12,
  criticalAlerts: 3,
  unreadAlerts: 8,
  upcomingDeadlines: 5,
  overdueDeadlines: 1,
  recentUpdates: 7,
  subscribedCountries: 6,
  complianceScore: 78,
  alertsByCountry: [
    { countryCode: 'CO', countryName: 'Colombia', count: 4 },
    { countryCode: 'MX', countryName: 'México', count: 3 },
    { countryCode: 'BR', countryName: 'Brasil', count: 2 },
    { countryCode: 'AR', countryName: 'Argentina', count: 2 },
    { countryCode: 'PE', countryName: 'Perú', count: 1 }
  ],
  alertsBySeverity: [
    { severity: 'critical', count: 3, color: '#ef4444' },
    { severity: 'high', count: 4, color: '#f97316' },
    { severity: 'medium', count: 3, color: '#eab308' },
    { severity: 'low', count: 2, color: '#22c55e' }
  ],
  deadlinesByMonth: [
    { month: 'Feb 2024', count: 2 },
    { month: 'Mar 2024', count: 3 },
    { month: 'Apr 2024', count: 1 },
    { month: 'May 2024', count: 2 }
  ],
  updatesByType: [
    { type: 'guideline_update', count: 3, color: '#3b82f6' },
    { type: 'law_change', count: 2, color: '#8b5cf6' },
    { type: 'process_change', count: 2, color: '#06b6d4' },
    { type: 'fee_change', count: 1, color: '#10b981' }
  ]
};

// Country Guides Data
export const mockCountryGuides: CountryGuide[] = [
  {
    id: 'guide-co',
    countryCode: 'CO',
    countryName: 'Colombia',
    agencyInfo: mockRegulatoryAgencies[0],
    overview: 'Colombia cuenta con un marco regulatorio robusto para medicamentos, liderado por INVIMA. El proceso de registro sanitario es riguroso pero eficiente, con tiempos promedio de 4-6 meses para medicamentos genéricos.',
    keyRequirements: [
      'Certificado de Buenas Prácticas de Manufactura (BPM)',
      'Estudios de estabilidad según condiciones climáticas zona IVa',
      'Certificado de Producto Farmacéutico (CPP) del país de origen',
      'Información técnica en formato CTD simplificado',
      'Pago de derechos de evaluación'
    ],
    registrationProcess: [
      {
        stepNumber: 1,
        title: 'Preparación de Documentación',
        description: 'Compilar toda la documentación técnica, administrativa y de calidad requerida',
        estimatedDays: 30,
        requiredDocuments: ['Formulario de solicitud', 'Información técnica', 'Certificados BPM'],
        tips: ['Verificar vigencia de certificados', 'Traducir documentos al español'],
        commonIssues: ['Certificados vencidos', 'Traducciones no oficiales']
      },
      {
        stepNumber: 2,
        title: 'Radicación ante INVIMA',
        description: 'Presentación formal de la solicitud con toda la documentación',
        estimatedDays: 5,
        requiredDocuments: ['Documentación completa', 'Comprobante de pago'],
        tips: ['Verificar completitud antes de radicar', 'Conservar recibo de radicación'],
        commonIssues: ['Documentación incompleta', 'Errores en formularios']
      },
      {
        stepNumber: 3,
        title: 'Evaluación Técnica',
        description: 'INVIMA evalúa la documentación técnica y de calidad',
        estimatedDays: 90,
        requiredDocuments: [],
        tips: ['Estar disponible para aclaraciones', 'Monitorear estado en línea'],
        commonIssues: ['Solicitudes de información adicional', 'Demoras en respuestas']
      },
      {
        stepNumber: 4,
        title: 'Resolución y Expedición',
        description: 'Emisión de la resolución de registro sanitario',
        estimatedDays: 15,
        requiredDocuments: [],
        tips: ['Verificar datos en la resolución', 'Solicitar correcciones si es necesario'],
        commonIssues: ['Errores en datos del producto', 'Demoras en expedición']
      }
    ],
    timelineEstimate: {
      minDays: 120,
      maxDays: 180,
      averageDays: 140,
      factors: ['Complejidad del producto', 'Completitud de documentación', 'Carga de trabajo INVIMA']
    },
    feeStructure: {
      baseFee: 1800000,
      additionalFees: [
        { name: 'Evaluación acelerada', amount: 900000, description: 'Reducción de tiempos de evaluación', isOptional: true },
        { name: 'Modificación de solicitud', amount: 450000, description: 'Cambios posteriores a radicación', isOptional: true }
      ],
      currency: 'COP',
      paymentMethods: ['PSE', 'Consignación bancaria', 'Tarjeta de crédito'],
      notes: ['Tarifas actualizadas enero 2024', 'No incluye IVA', 'Válidas hasta diciembre 2024']
    },
    localContacts: [
      {
        id: 'contact-co-001',
        name: 'Ana María Rodríguez',
        company: 'Consultores Regulatorios Andinos',
        role: 'Directora de Asuntos Regulatorios',
        email: 'amrodriguez@cra-consultores.com',
        phone: '+57 1 234 5678',
        specialties: ['Registro de medicamentos', 'BPM', 'Farmacovigilancia'],
        languages: ['Español', 'Inglés'],
        isVerified: true,
        rating: 4.8,
        reviewCount: 23
      }
    ],
    recentUpdates: [mockRegulatoryUpdates[0]],
    lastUpdated: '2024-01-20'
  }
];

// Export all mock data
export const complianceMockData = {
  agencies: mockRegulatoryAgencies,
  alerts: mockComplianceAlerts,
  updates: mockRegulatoryUpdates,
  deadlines: mockComplianceDeadlines,
  calendarEvents: mockCalendarEvents,
  documentTemplates: mockDocumentTemplates,
  dashboardStats: mockDashboardStats,
  countryGuides: mockCountryGuides
}; 