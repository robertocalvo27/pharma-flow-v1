import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle, Clock, Circle, XCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { WorkflowStep } from '../../types';

interface WorkflowStepsProps {
  steps: WorkflowStep[];
  onUpdateStep: (stepId: string, status: string) => void;
}

export const WorkflowSteps: React.FC<WorkflowStepsProps> = ({
  steps,
  onUpdateStep
}) => {
  const getStepIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-6 h-6 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };
  
  const getStatusBadge = (status: WorkflowStep['status']) => {
    const variants = {
      pending: { variant: 'neutral' as const, label: 'Pendiente' },
      in_progress: { variant: 'warning' as const, label: 'En Proceso' },
      completed: { variant: 'success' as const, label: 'Completado' },
      rejected: { variant: 'error' as const, label: 'Rechazado' }
    };
    
    const config = variants[status];
    return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
  };
  
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Pasos del Workflow</h3>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4">
            {/* Step Icon */}
            <div className="flex-shrink-0 relative">
              {getStepIcon(step.status)}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-3 w-0.5 h-12 bg-gray-300" />
              )}
            </div>
            
            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">
                  {step.stepName}
                </h4>
                {getStatusBadge(step.status)}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                Asignado a: {step.assignedToName}
              </p>
              
              {step.completedAt && (
                <p className="text-xs text-gray-500">
                  Completado: {format(new Date(step.completedAt), 'PPpp', { locale: es })}
                </p>
              )}
              
              {step.notes && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{step.notes}</p>
                </div>
              )}
              
              {/* Step Actions */}
              {step.status === 'in_progress' && (
                <div className="flex space-x-2 mt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onUpdateStep(step.id, 'completed')}
                  >
                    Completar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onUpdateStep(step.id, 'rejected')}
                  >
                    Rechazar
                  </Button>
                </div>
              )}
              
              {step.status === 'pending' && index === steps.findIndex(s => s.status !== 'completed') && (
                <div className="flex space-x-2 mt-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onUpdateStep(step.id, 'in_progress')}
                  >
                    Iniciar
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};