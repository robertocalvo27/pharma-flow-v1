// Secciones estándar del Dossier basadas en la estructura del cliente
export const DOSSIER_SECTIONS = [
  {
    number: 1,
    name: 'Monografía',
    description: 'Información detallada del producto farmacéutico',
    required: true
  },
  {
    number: 2,
    name: 'GMP',
    description: 'Certificado de Buenas Prácticas de Manufactura',
    required: true
  },
  {
    number: 3,
    name: 'Certificado de Libre Venta',
    description: 'Certificado que autoriza la comercialización',
    required: true
  },
  {
    number: 4,
    name: 'Fórmula CualiCuantitativa',
    description: 'Composición detallada del producto',
    required: true
  },
  {
    number: 5,
    name: 'Método de Análisis',
    description: 'Procedimientos analíticos del producto',
    required: true
  },
  {
    number: 6,
    name: 'Validación',
    description: 'Validación de métodos analíticos',
    required: true
  },
  {
    number: 7,
    name: 'Especificaciones Producto Terminado',
    description: 'Especificaciones técnicas finales',
    required: true
  },
  {
    number: 8,
    name: 'Estudio de Estabilidad',
    description: 'Estudios de estabilidad del producto',
    required: true
  },
  {
    number: 9,
    name: 'Declaración Patentes y Datos de Prueba',
    description: 'Información sobre patentes y datos de prueba',
    required: false
  },
  {
    number: 10,
    name: 'Artes',
    description: 'Etiquetas y material de empaque',
    required: true
  },
  {
    number: 11,
    name: 'Poderes y Documentos Aclaratorios',
    description: 'Documentos legales y aclaratorios',
    required: false
  },
  {
    number: 12,
    name: 'Pago y Solicitud',
    description: 'Comprobantes de pago y formularios de solicitud',
    required: true
  }
] as const;

export const DOSSIER_STATUS = {
  DRAFT: 'draft',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export const DOSSIER_STATUS_LABELS = {
  [DOSSIER_STATUS.DRAFT]: 'Borrador',
  [DOSSIER_STATUS.IN_PROGRESS]: 'En Progreso',
  [DOSSIER_STATUS.COMPLETED]: 'Completado',
  [DOSSIER_STATUS.SUBMITTED]: 'Enviado',
  [DOSSIER_STATUS.APPROVED]: 'Aprobado',
  [DOSSIER_STATUS.REJECTED]: 'Rechazado'
} as const;

export const DOSSIER_STATUS_COLORS = {
  [DOSSIER_STATUS.DRAFT]: 'gray',
  [DOSSIER_STATUS.IN_PROGRESS]: 'blue',
  [DOSSIER_STATUS.COMPLETED]: 'green',
  [DOSSIER_STATUS.SUBMITTED]: 'yellow',
  [DOSSIER_STATUS.APPROVED]: 'green',
  [DOSSIER_STATUS.REJECTED]: 'red'
} as const;

export const DOCUMENT_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export const DOCUMENT_STATUS_LABELS = {
  [DOCUMENT_STATUS.DRAFT]: 'Borrador',
  [DOCUMENT_STATUS.SUBMITTED]: 'Enviado',
  [DOCUMENT_STATUS.APPROVED]: 'Aprobado',
  [DOCUMENT_STATUS.REJECTED]: 'Rechazado'
} as const;

export const SUPPORTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'image/tiff'
] as const;

export const FILE_TYPE_EXTENSIONS = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/tiff': '.tiff'
} as const; 