import React from 'react';
import { CheckCircle, Clock, AlertCircle, Calendar, User, FileText } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TimelineStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'rejected';
  assignedTo?: string;
  completedAt?: string;
  estimatedDuration?: string;
  notes?: string;
  documents?: number;
}

interface DossierTimelineProps {
  dossierId: string;
  countryName: string;
}

export const DossierTimeline: React.FC<DossierTimelineProps> = ({ dossierId, countryName }) => {
  // Datos de ejemplo basados en el diagrama de flujo
  const timelineSteps: TimelineStep[] = [
    {
      id: 'step-1',
      stepNumber: 1,
      title: 'Solicitud y Definición de Diseño a I&D',
      description: 'Definición inicial del producto por PS, MK, GG o VI',
      status: 'completed',
      assignedTo: 'Dr. Carlos Mendoza',
      completedAt: '2024-01-10T08:00:00Z',
      estimatedDuration: '2 semanas',
      documents: 3
    },
    {
      id: 'step-2',
      stepNumber: 2,
      title: 'Evaluación de la solicitud',
      description: 'Evaluación por I&D, AR, Legal y GG',
      status: 'completed',
      assignedTo: 'Ana Torres',
      completedAt: '2024-01-15T16:00:00Z',
      estimatedDuration: '1 semana',
      documents: 5
    },
    {
      id: 'step-3',
      stepNumber: 3,
      title: 'Aprobación final y definición de fecha',
      description: 'Aprobación final y definición de fecha de inicio del desarrollo por I&D y GG',
      status: 'completed',
      assignedTo: 'Luis Ramírez',
      completedAt: '2024-01-18T09:30:00Z',
      estimatedDuration: '3 días',
      documents: 2
    },
    {
      id: 'step-4',
      stepNumber: 4,
      title: 'Desarrollo del producto',
      description: 'Desarrollo desde el desarrollo galénico hasta la conclusión de EE por parte de I & D',
      status: 'in_progress',
      assignedTo: 'Dra. Patricia Silva',
      estimatedDuration: '14 meses',
      documents: 8,
      notes: 'Actualmente en fase de desarrollo galénico'
    },
    {
      id: 'step-5',
      stepNumber: 5,
      title: 'Entrega de documentación técnica',
      description: 'Entrega de EE, fórmula, EPT, método analítico y validación, muestra a AR por I&D',
      status: 'pending',
      assignedTo: 'Equipo I&D',
      estimatedDuration: '1 mes',
      documents: 0
    },
    {
      id: 'step-6',
      stepNumber: 6,
      title: 'Preparación y entrega del expediente',
      description: 'Preparación y entrega del expediente en el MS por parte de AR',
      status: 'pending',
      assignedTo: 'Departamento AR',
      estimatedDuration: '2 meses',
      documents: 0
    },
    {
      id: 'step-7',
      stepNumber: 7,
      title: 'Aprobación por Ministerio de Salud',
      description: 'Aprobación por parte de Ministerio de Salud',
      status: 'pending',
      estimatedDuration: '6 meses',
      documents: 0
    },
    {
      id: 'step-8',
      stepNumber: 8,
      title: 'Preparación y entrega del expediente en Oferentes',
      description: 'Preparación y entrega del expediente en Oferentes de C.C.S.S. por parte de AR',
      status: 'pending',
      estimatedDuration: '1 mes',
      documents: 0
    },
    {
      id: 'step-9',
      stepNumber: 9,
      title: 'Aprobación por Oferentes de la C.C.S.S',
      description: 'Aprobación final por parte de Oferentes de la C.C.S.S',
      status: 'pending',
      estimatedDuration: '2 meses',
      documents: 0
    }
  ];

  const getStatusIcon = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />;
    }
  };

  const getStatusBadge = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completado</Badge>;
      case 'in_progress':
        return <Badge variant="info">En Progreso</Badge>;
      case 'pending':
        return <Badge variant="neutral">Pendiente</Badge>;
      case 'rejected':
        return <Badge variant="error">Rechazado</Badge>;
      default:
        return <Badge variant="neutral">Pendiente</Badge>;
    }
  };

  const getStepColor = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'in_progress':
        return 'border-blue-200 bg-blue-50';
      case 'pending':
        return 'border-gray-200 bg-gray-50';
      case 'rejected':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header del Timeline */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Timeline de Aprobación - {countryName}
        </h3>
        <p className="text-sm text-gray-600">
          Seguimiento del proceso de registro sanitario desde la solicitud inicial hasta la aprobación final
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {/* Línea vertical del timeline */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-6">
          {timelineSteps.map((step, index) => (
            <div key={step.id} className="relative flex items-start">
              {/* Icono del paso */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-full">
                {getStatusIcon(step.status)}
              </div>

              {/* Contenido del paso */}
              <div className="ml-6 flex-1">
                <Card className={`p-4 ${getStepColor(step.status)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          Paso {step.stepNumber}
                        </span>
                        {getStatusBadge(step.status)}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {step.assignedTo && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          <strong>Responsable:</strong> {step.assignedTo}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        <strong>Duración:</strong> {step.estimatedDuration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        <strong>Documentos:</strong> {step.documents}
                      </span>
                    </div>
                  </div>

                  {/* Fecha de completado */}
                  {step.completedAt && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Completado el {format(new Date(step.completedAt), 'PPp', { locale: es })}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Notas */}
                  {step.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600">
                        <strong>Notas:</strong> {step.notes}
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen del progreso */}
      <Card className="p-4 bg-blue-50 border border-blue-200 mt-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Estado Actual del Proceso</h4>
            <p className="text-blue-800 text-sm mb-2">
              El dossier se encuentra actualmente en la fase de desarrollo del producto (Paso 4 de 9).
            </p>
            <div className="text-xs text-blue-700">
              <strong>Tiempo estimado restante:</strong> Aproximadamente 18-20 meses para completar todo el proceso
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}; 