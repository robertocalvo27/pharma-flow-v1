# Documento Técnico - Sistema SaaS de Gestión de Productos Farmacéuticos

## 1. Resumen Ejecutivo

### 1.1 Descripción del Proyecto
Sistema SaaS diseñado para modernizar la gestión de registros de productos farmacéuticos, reemplazando el uso tradicional de Excel y Google Drive con una plataforma integral que permite administrar información comercial, técnica y legal de productos farmacéuticos a nivel nacional e internacional.

### 1.2 Problema Identificado
- Las empresas farmacéuticas dependen de Excel y Google Drive para la gestión de registros
- Falta de estructura moderna para el seguimiento de estados de aprobación y renovación
- Ausencia de workflows automatizados para procesos regulatorios
- Dificultad para centralizar información técnica, legal y de registro por país

### 1.3 Solución Propuesta
Plataforma web que centraliza la información de productos farmacéuticos con:
- Dashboard intuitivo para visualización de todos los productos
- Sistema de workflow para aprobaciones y renovaciones
- Gestión por países y regulaciones específicas
- Interfaz moderna y fácil de usar

## 2. Objetivos del Sistema

### 2.1 Objetivos Principales
- **Centralización**: Unificar toda la información de productos farmacéuticos en una sola plataforma
- **Automatización**: Implementar workflows para procesos de aprobación y renovación
- **Visibilidad**: Proporcionar dashboards con estados en tiempo real
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

## 6. Modelo de Datos

### 6.1 Entidades Principales

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

#### Workflows (Flujos de Trabajo)
```sql
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  country_code VARCHAR(2),
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

## 7. Funcionalidades Principales

### 7.1 Dashboard Principal
- **Vista General de Productos**: Lista completa con filtros y búsqueda
- **Estados de Workflows**: Visualización del progreso de aprobaciones
- **Métricas Clave**: KPIs de registros, renovaciones y vencimientos
- **Alertas**: Notificaciones de fechas próximas de vencimiento

### 7.2 Gestión de Productos
- **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- **Información Técnica**: Ingredientes activos, forma farmacéutica, concentración
- **Información Comercial**: Fabricante, clase terapéutica, código ATC
- **Registro por Países**: Múltiples registros por producto
- **Historial de Cambios**: Trazabilidad completa de modificaciones

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