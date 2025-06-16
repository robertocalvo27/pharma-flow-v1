import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ActivityItem {
  id: string;
  type: 'workflow_completed' | 'workflow_started' | 'registration_expiring' | 'document_uploaded';
  title: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'workflow_completed',
    title: 'Workflow Completado',
    description: 'Paracetamol Plus 500mg - Registro en Colombia',
    timestamp: '2024-01-20T16:00:00Z',
    status: 'success'
  },
  {
    id: '2',
    type: 'workflow_started',
    title: 'Nuevo Workflow Iniciado',
    description: 'Amoxicilina 875mg - Registro en Colombia',
    timestamp: '2024-01-19T10:30:00Z',
    status: 'info'
  },
  {
    id: '3',
    type: 'registration_expiring',
    title: 'Registro Próximo a Vencer',
    description: 'Ibuprofeno 400mg - México (30 días)',
    timestamp: '2024-01-18T09:00:00Z',
    status: 'warning'
  },
  {
    id: '4',
    type: 'document_uploaded',
    title: 'Documento Cargado',
    description: 'Certificado de Análisis - Lote ABC123',
    timestamp: '2024-01-17T14:45:00Z',
    status: 'info'
  }
];

export const RecentActivity: React.FC = () => {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'workflow_completed':
        return CheckCircle;
      case 'workflow_started':
        return Clock;
      case 'registration_expiring':
        return AlertCircle;
      case 'document_uploaded':
        return FileText;
      default:
        return FileText;
    }
  };
  
  const getBadgeVariant = (status?: ActivityItem['status']) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };
  
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
          Ver todo
        </a>
      </div>
      <div className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  {activity.status && (
                    <Badge variant={getBadgeVariant(activity.status)} size="sm">
                      {activity.status === 'success' && 'Completado'}
                      {activity.status === 'warning' && 'Pendiente'}
                      {activity.status === 'error' && 'Error'}
                      {activity.status === 'info' && 'Info'}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {format(new Date(activity.timestamp), 'PPpp', { locale: es })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};