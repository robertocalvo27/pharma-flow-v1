import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, User, Flag } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Workflow } from '../../types';

interface WorkflowCardProps {
  workflow: Workflow;
  onView: (workflow: Workflow) => void;
  onUpdateStep: (workflowId: string, stepId: string, status: string) => void;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  workflow,
  onView,
  onUpdateStep
}) => {
  const getStatusBadge = (status: Workflow['status']) => {
    const variants = {
      pending: { variant: 'neutral' as const, label: 'Pendiente' },
      in_progress: { variant: 'warning' as const, label: 'En Proceso' },
      completed: { variant: 'success' as const, label: 'Completado' },
      rejected: { variant: 'error' as const, label: 'Rechazado' },
      paused: { variant: 'neutral' as const, label: 'Pausado' }
    };
    
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };
  
  const getWorkflowTypeBadge = (type: Workflow['workflowType']) => {
    const variants = {
      registration: { variant: 'info' as const, label: 'Registro' },
      renewal: { variant: 'warning' as const, label: 'Renovación' },
      variation: { variant: 'neutral' as const, label: 'Variación' }
    };
    
    const config = variants[type];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };
  
  const isOverdue = new Date(workflow.dueDate) < new Date();
  
  return (
    <Card hover>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg">
              {workflow.productName}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {workflow.countryName} • {workflow.currentStep}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {getStatusBadge(workflow.status)}
            {getWorkflowTypeBadge(workflow.workflowType)}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progreso</span>
            <span>{workflow.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${workflow.progress}%` }}
            />
          </div>
        </div>
        
        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{workflow.assignedToName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                {format(new Date(workflow.dueDate), 'PPp', { locale: es })}
              </span>
              {isOverdue && <Flag className="w-4 h-4 text-red-600" />}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" size="sm" onClick={() => onView(workflow)}>
            Ver Detalles
          </Button>
          {workflow.status === 'in_progress' && (
            <Button size="sm" onClick={() => onView(workflow)}>
              Gestionar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};