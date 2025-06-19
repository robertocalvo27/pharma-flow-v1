# Documento Técnico - Sistema SaaS de Gestión de Productos Farmacéuticos

## 1. Resumen Ejecutivo

### 1.1 Descripción del Proyecto
Sistema SaaS diseñado para modernizar la gestión de registros de productos farmacéuticos, reemplazando el uso tradicional de Excel y Google Drive con una plataforma integral que permite administrar información comercial, técnica y legal de productos farmacéuticos a nivel nacional e internacional.

### 1.2 Problema Identificado
- Las empresas farmacéuticas dependen de Excel y Google Drive para la gestión de registros
- **Gestión manual de Dossiers**: Carpetas de Google Drive con 12 secciones estándar por producto/país/fabricante
- Falta de estructura moderna para el seguimiento de estados de aprobación y renovación
- Ausencia de workflows automatizados para procesos regulatorios
- Dificultad para centralizar información técnica, legal y de registro por país
- **Sin trazabilidad de documentos**: Versiones, comentarios y estados dispersos

### 1.3 Solución Propuesta
Plataforma web que centraliza la información de productos farmacéuticos con:
- Dashboard intuitivo para visualización de todos los productos
- **Sistema de Dossiers digitales**: Reemplaza carpetas de Google Drive con gestión inteligente
- **12 secciones estándar por Dossier**: Monografía, GMP, Certificados, Fórmulas, etc.
- Sistema de workflow para aprobaciones y renovaciones
- Gestión por países y regulaciones específicas
- **Versionado y trazabilidad completa** de documentos
- Interfaz moderna y fácil de usar

## 2. Objetivos del Sistema

### 2.1 Objetivos Principales
- **Centralización**: Unificar toda la información de productos farmacéuticos en una sola plataforma
- **Digitalización de Dossiers**: Reemplazar completamente las carpetas de Google Drive
- **Automatización**: Implementar workflows para procesos de aprobación y renovación
- **Visibilidad**: Proporcionar dashboards con estados en tiempo real
- **Trazabilidad**: Control completo de versiones, comentarios y cambios en documentos
- **Escalabilidad**: Soportar operaciones a nivel nacional e internacional
- **Compliance**: Mantener registros auditables para cumplimiento regulatorio

### 2.2 Objetivos Específicos
- Reemplazar el uso de Excel/Google Drive en la gestión de registros
- Reducir tiempo de procesamiento de solicitudes en 60%
- Mejorar trazabilidad y control de versiones de documentos
- Facilitar reporting regulatorio automatizado
- Implementar notificaciones automáticas para renovaciones

## 3. Arquitectura del Sistema

### 3.1 Arquitectura General
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Base de       │
│   (React)       │◄──►│   (Node.js)     │◄──►│   Datos         │
│                 │    │                 │    │   (Supabase)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 3.2 Componentes Principales
1. **Frontend (React + Tailwind)**
   - Dashboard principal
   - Módulos de gestión de productos
   - Sistema de workflow visual
   - Reportes y analytics

2. **Backend (Node.js)**
   - API REST
   - Lógica de negocio
   - Gestión de workflows
   - Servicios de notificación

3. **Base de Datos (Supabase)**
   - PostgreSQL para datos estructurados
   - Sistema de autenticación
   - Almacenamiento de archivos
   - Real-time subscriptions

## 4. Stack Tecnológico

### 4.1 Frontend
- **Framework**: React 18+
- **Styling**: Tailwind CSS
- **State Management**: Zustand o Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **UI Components**: Headless UI + Custom Components
- **Charts**: Recharts o Chart.js
- **Date Handling**: date-fns

### 4.2 Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Authentication**: Supabase Auth
- **Validation**: Joi o Zod
- **File Upload**: Multer + Supabase Storage
- **Email**: Resend o SendGrid
- **Cron Jobs**: node-cron
- **PDF Generation**: Puppeteer

### 4.3 Base de Datos y Servicios
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime
- **Hosting**: Vercel (Frontend) + Railway/Render (Backend)

### 4.4 Herramientas de Desarrollo
- **Version Control**: Git + GitHub
- **Package Manager**: npm/yarn
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

## 5. Estructura del Codebase

### 5.1 Estructura Frontend
```
src/
├── components/
│   ├── ui/                 # Componentes base (botones, inputs, etc.)
│   ├── layout/             # Layout components (header, sidebar, etc.)
│   ├── forms/              # Formularios reutilizables
│   └── charts/             # Componentes de gráficos
├── pages/
│   ├── dashboard/          # Dashboard principal
│   ├── products/           # Gestión de productos
│   ├── workflows/          # Gestión de workflows
│   ├── reports/            # Reportes y analytics
│   └── settings/           # Configuraciones
├── hooks/                  # Custom hooks
├── services/               # API calls y servicios
├── store/                  # Estado global
├── utils/                  # Utilidades y helpers
├── types/                  # TypeScript types
└── constants/              # Constantes de la aplicación
```

### 5.2 Estructura Backend
```
src/
├── controllers/            # Controladores de rutas
├── middleware/             # Middlewares personalizados
├── models/                 # Modelos de datos
├── routes/                 # Definición de rutas
├── services/               # Lógica de negocio
├── utils/                  # Utilidades
├── validation/             # Schemas de validación
├── config/                 # Configuración
└── types/                  # TypeScript types
```

## 6. Sistema de Dossiers - Funcionalidad Central

### 6.1 Concepto de Dossier
Un **Dossier** representa la combinación única de:
- **Producto farmacéutico** (ej: Paracetamol 500mg)
- **Fabricante** (ej: Laboratorios Farmex S.A.)
- **País de registro** (ej: Costa Rica)

Cada Dossier contiene **12 secciones estándar** con documentos técnicos y legales requeridos para el registro farmacéutico.

### 6.2 Las 12 Secciones Estándar del Dossier
1. **Monografía** - Información detallada del producto farmacéutico
2. **GMP** - Certificado de Buenas Prácticas de Manufactura
3. **Certificado de Libre Venta** - Documento de comercialización libre
4. **Fórmula CualiCuantitativa** - Composición exacta del producto
5. **Método de Análisis** - Procedimientos de control de calidad
6. **Validación** - Estudios de validación de procesos
7. **Especificaciones Producto Terminado** - Características finales
8. **Estudio de Estabilidad** - Análisis de vida útil
9. **Declaración Patentes y Datos de Prueba** - Aspectos legales
10. **Artes** - Diseños de etiquetas y empaques
11. **Poderes y Documentos Aclaratorios** - Documentación legal
12. **Pago y Solicitud** - Comprobantes y formularios oficiales

### 6.3 Estados del Dossier y Secciones
- **Draft** (Borrador) - En preparación inicial
- **In Progress** (En Progreso) - Documentos siendo completados
- **Completed** (Completado) - Todas las secciones finalizadas
- **Submitted** (Enviado) - Presentado a autoridades
- **Approved** (Aprobado) - Registro otorgado
- **Rejected** (Rechazado) - Requiere correcciones

### 6.4 Funcionalidades del Sistema de Dossiers

#### **Modal de Lista de Dossiers**
- Vista de todos los dossiers por producto
- Filtros por país, fabricante, estado
- Barras de progreso visual (% completado)
- Contadores de secciones completadas (ej: 8/12)
- Búsqueda inteligente

#### **Modal de Detalle de Dossier**
- **Header informativo**: Producto, país, fabricante, progreso general
- **Lista expandible de secciones**: Click para ver detalles
- **Gestión de documentos por sección**:
  - Upload múltiple de archivos
  - Versionado automático
  - Preview de documentos
  - Estados por documento
- **Sistema de comentarios**: Notas y observaciones por sección
- **Cambio de estados**: Marcar secciones como completadas
- **Navegación fluida**: Entre lista y detalle

#### **Gestión de Documentos**
- **Tipos soportados**: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, TIFF
- **Versionado**: Control automático de versiones
- **Metadatos**: Fecha, usuario, comentarios
- **Organización**: Por sección del dossier
- **Búsqueda**: Full-text en nombres y contenido

### 6.5 Flujo de Trabajo con Dossiers
1. **Creación**: Nuevo dossier para producto + fabricante + país
2. **Completado por secciones**: Upload progresivo de documentos
3. **Revisión interna**: Comentarios y validaciones
4. **Envío a autoridades**: Cambio de estado a "Submitted"
5. **Seguimiento**: Tracking del proceso regulatorio
6. **Aprobación/Rechazo**: Estado final del registro

## 7. Modelo de Datos

### 7.1 Entidades Principales

#### Products (Productos)
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  active_ingredient VARCHAR NOT NULL,
  pharmaceutical_form VARCHAR NOT NULL,
  concentration VARCHAR NOT NULL,
  manufacturer_id UUID REFERENCES manufacturers(id),
  therapeutic_class VARCHAR,
  atc_code VARCHAR,
  status VARCHAR NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Product_Registrations (Registros por País)
```sql
CREATE TABLE product_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  country_code VARCHAR(2) NOT NULL,
  registration_number VARCHAR,
  registration_date DATE,
  expiry_date DATE,
  status VARCHAR NOT NULL,
  regulatory_pathway VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Dossiers (Expedientes Regulatorios)
```sql
CREATE TABLE dossiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  manufacturer_id UUID REFERENCES manufacturers(id),
  country_code VARCHAR(2) NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'draft', -- 'draft', 'in_progress', 'completed', 'submitted', 'approved', 'rejected'
  completion_percentage INTEGER DEFAULT 0,
  workflow_id UUID REFERENCES workflows(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Dossier_Sections (Secciones del Dossier)
```sql
CREATE TABLE dossier_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dossier_id UUID REFERENCES dossiers(id),
  section_number INTEGER NOT NULL, -- 1-12
  section_name VARCHAR NOT NULL,
  description TEXT,
  status VARCHAR NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'approved', 'rejected'
  completed_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Dossier_Documents (Documentos del Dossier)
```sql
CREATE TABLE dossier_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES dossier_sections(id),
  dossier_id UUID REFERENCES dossiers(id),
  file_name VARCHAR NOT NULL,
  file_type VARCHAR NOT NULL,
  file_size INTEGER,
  file_path VARCHAR NOT NULL,
  version INTEGER DEFAULT 1,
  status VARCHAR NOT NULL DEFAULT 'draft',
  uploaded_by UUID REFERENCES users(id),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);
```

#### Workflows (Flujos de Trabajo)
```sql
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dossier_id UUID REFERENCES dossiers(id), -- Ahora vinculado a dossier
  workflow_type VARCHAR NOT NULL, -- 'registration', 'renewal', 'variation'
  current_step VARCHAR NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'pending',
  assigned_to UUID REFERENCES users(id),
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Workflow_Steps (Pasos del Workflow)
```sql
CREATE TABLE workflow_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES workflows(id),
  step_name VARCHAR NOT NULL,
  step_order INTEGER NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'pending',
  assigned_to UUID REFERENCES users(id),
  completed_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6.2 Entidades de Soporte

#### Users (Usuarios)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR NOT NULL,
  role VARCHAR NOT NULL DEFAULT 'user',
  department VARCHAR,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Countries (Países)
```sql
CREATE TABLE countries (
  code VARCHAR(2) PRIMARY KEY,
  name VARCHAR NOT NULL,
  regulatory_agency VARCHAR,
  is_active BOOLEAN DEFAULT true
);
```

#### Documents (Documentos)
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  workflow_id UUID REFERENCES workflows(id),
  document_type VARCHAR NOT NULL,
  file_name VARCHAR NOT NULL,
  file_path VARCHAR NOT NULL,
  version INTEGER DEFAULT 1,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 8. Funcionalidades Principales

### 8.1 Dashboard Principal
- **Vista General de Productos**: Lista completa con filtros y búsqueda
- **Resumen de Dossiers**: Métricas de dossiers por estado y país
- **Estados de Workflows**: Visualización del progreso de aprobaciones
- **Métricas Clave**: KPIs de registros, renovaciones y vencimientos
- **Alertas**: Notificaciones de fechas próximas de vencimiento
- **Progreso Visual**: Gráficos de completado de dossiers

### 8.2 Gestión de Productos
- **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- **Información Técnica**: Ingredientes activos, forma farmacéutica, concentración
- **Información Comercial**: Fabricante, clase terapéutica, código ATC
- **Botón "Ver Dossiers"**: Acceso directo al modal de dossiers por producto
- **Registro por Países**: Múltiples registros por producto
- **Historial de Cambios**: Trazabilidad completa de modificaciones

### 8.3 Sistema de Dossiers (FUNCIONALIDAD CENTRAL)
- **Modal de Lista de Dossiers**:
  - Vista de todos los dossiers por producto
  - Filtros avanzados por país, fabricante, estado
  - Barras de progreso visual con porcentajes
  - Contadores de secciones (ej: 10/12 completadas)
  - Búsqueda inteligente por país o fabricante
  - Resumen estadístico (Total, Aprobados, En Progreso, Borradores)

- **Modal de Detalle de Dossier**:
  - Header con información completa del dossier
  - Barra de progreso general del dossier
  - Lista expandible de las 12 secciones estándar
  - Gestión de documentos por sección:
    * Upload múltiple de archivos
    * Versionado automático
    * Lista de documentos con metadatos
    * Estados por documento
  - Sistema de comentarios y notas por sección
  - Cambio de estados de secciones (Pendiente ↔ Completada)
  - Navegación fluida entre lista y detalle

- **Gestión de Documentos**:
  - Soporte para múltiples formatos (PDF, DOC, XLS, imágenes)
  - Control de versiones automático
  - Metadatos completos (fecha, usuario, tamaño)
  - Preview de documentos
  - Organización por sección del dossier

### 7.3 Sistema de Workflows
- **Tipos de Workflow**:
  - Registro inicial
  - Renovación
  - Variaciones/modificaciones
- **Pasos Configurables**: Definición flexible de pasos por tipo
- **Asignación de Responsables**: Usuarios específicos por paso
- **Seguimiento de Estado**: Progreso visual del workflow
- **Notificaciones Automáticas**: Emails y alertas en la plataforma

### 7.4 Gestión de Documentos
- **Carga Masiva**: Upload múltiple de archivos
- **Versionado**: Control de versiones de documentos
- **Categorización**: Organización por tipo de documento
- **Preview**: Vista previa de documentos en la plataforma
- **Descargas**: Acceso controlado a documentos

### 7.5 Reportes y Analytics
- **Dashboards Interactivos**: Métricas en tiempo real
- **Reportes Regulatorios**: Generación automática de reportes
- **Exportación**: PDF, Excel, CSV
- **Filtros Avanzados**: Por país, producto, fecha, estado
- **Alertas Personalizadas**: Configurables por usuario

## 8. Flujo de Trabajo de Aprobación

### 8.1 Estructura del Workflow (Basado en la imagen)
1. **Generado** (Verde) - Solicitud creada
2. **CDA Administración** (Verde) - Revisión administrativa
3. **SGDMA Patrimonial** (Verde) - Validación patrimonial
4. **Área Aprobadores** (Verde) - Aprobación técnica
5. **Gestión Social** (En proceso) - Revisión social
6. **Salud Ocupacional** (Pendiente) - Validación de salud ocupacional
7. **Transporte PGT** (Pendiente) - Autorización de transporte

### 8.2 Estados de Workflow
- **Pendiente**: Paso no iniciado
- **En Proceso**: Paso en ejecución
- **Completado**: Paso finalizado exitosamente
- **Rechazado**: Paso con observaciones
- **Pausado**: Workflow temporalmente detenido

### 8.3 Automatizaciones
- **Transiciones Automáticas**: Avance automático cuando aplique
- **Notificaciones**: Emails automáticos a responsables
- **Escalamiento**: Alertas por retrasos
- **Reportes**: Status reports automáticos

## 9. Seguridad y Compliance

### 9.1 Autenticación y Autorización
- **Multi-factor Authentication**: Soporte para 2FA
- **Role-based Access Control**: Permisos granulares
- **Session Management**: Gestión segura de sesiones
- **API Security**: JWT tokens con expiración

### 9.2 Protección de Datos
- **Encryption**: Datos sensibles encriptados
- **Audit Logs**: Registro completo de actividades
- **Data Backup**: Respaldos automáticos
- **GDPR Compliance**: Cumplimiento de regulaciones

### 9.3 Validaciones Regulatorias
- **Document Integrity**: Verificación de integridad
- **Digital Signatures**: Soporte para firmas electrónicas
- **Compliance Tracking**: Seguimiento de cumplimiento
- **Regulatory Reporting**: Reportes automáticos

## 10. Implementación y Despliegue

### 10.1 Fases de Desarrollo
**Fase 1 (MVP - 8 semanas)**
- Autenticación y gestión de usuarios
- CRUD básico de productos
- Dashboard principal
- Workflow simple de aprobación

**Fase 2 (4 semanas)**
- Sistema completo de workflows
- Gestión de documentos
- Notificaciones automáticas

**Fase 3 (4 semanas)**
- Reportes y analytics
- Exportaciones
- Optimizaciones de rendimiento

**Fase 4 (2 semanas)**
- Testing exhaustivo
- Documentación
- Deployment a producción

### 10.2 Configuración de Entornos
- **Desarrollo**: Local con Docker
- **Staging**: Réplica de producción para testing
- **Producción**: Despliegue escalable en la nube

### 10.3 CI/CD Pipeline
```yaml
# GitHub Actions workflow
name: Deploy
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: npm run deploy
```

## 11. Monitoreo y Mantenimiento

### 11.1 Métricas de Rendimiento
- **Response Time**: Tiempo de respuesta de APIs
- **Error Rate**: Tasa de errores
- **User Activity**: Actividad de usuarios
- **Database Performance**: Rendimiento de base de datos

### 11.2 Logs y Debugging
- **Application Logs**: Logs estructurados
- **Error Tracking**: Sentry o similar
- **Performance Monitoring**: APM tools
- **Health Checks**: Endpoints de salud

### 11.3 Backup y Recovery
- **Database Backups**: Respaldos automáticos diarios
- **File Storage Backups**: Sincronización con múltiples regiones
- **Disaster Recovery**: Plan de recuperación ante desastres
- **Data Retention**: Políticas de retención de datos

## 12. Costos y Escalabilidad

### 12.1 Estimación de Costos Mensuales
- **Supabase Pro**: $25/mes (base)
- **Vercel Pro**: $20/mes
- **Railway/Render**: $15-30/mes
- **Email Service**: $10-20/mes
- **Total estimado**: $70-95/mes (hasta 1000 usuarios)

### 12.2 Escalabilidad
- **Horizontal Scaling**: Auto-scaling en backend
- **Database Scaling**: Supabase maneja escalamiento automático
- **CDN**: Distribución global de assets
- **Load Balancing**: Balanceadores de carga automáticos

## 13. Próximos Pasos

### 13.1 Preparación del Desarrollo
1. **Setup del Repositorio**: Configuración inicial del proyecto
2. **Configuración de Supabase**: Base de datos y servicios
3. **Prototipo UI/UX**: Diseños y wireframes
4. **Definición de APIs**: Especificación OpenAPI

### 13.2 Validación del Mercado
1. **Demo Funcional**: Prototipo para presentar a clientes potenciales
2. **Feedback Collection**: Recolección de retroalimentación
3. **Pricing Strategy**: Definición de modelo de precios
4. **Go-to-Market**: Estrategia de lanzamiento

---

*Este documento técnico proporciona la base completa para el desarrollo del sistema SaaS de gestión de productos farmacéuticos. La implementación seguirá metodologías ágiles con entregas iterativas para validar funcionalidades con usuarios finales.*