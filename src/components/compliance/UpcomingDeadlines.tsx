import React from 'react';
import { Calendar, Clock, AlertTriangle, User, Package } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useComplianceStore } from '../../store/complianceStore';
import { formatDistanceToNow, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

export const UpcomingDeadlines: React.FC = () => {
  const { 
    upcomingDeadlines, 
    isLoadingDeadlines 
  } = useComplianceStore();

  const sortedDeadlines = upcomingDeadlines
    .filter(deadline => deadline.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 6); // Show only first 6

  const getDeadlineTypeText = (type: string) => {
    switch (type) {
      case 'registration_renewal': return 'Renovación de Registro';
      case 'document_submission': return 'Entrega de Documentos';
      case 'fee_payment': return 'Pago de Tarifas';
      case 'inspection': return 'Inspección';
      case 'response_required': return 'Respuesta Requerida';
      default: return type;
    }
  };

  const getDeadlineTypeIcon = (type: string) => {
    switch (type) {
      case 'registration_renewal': return <Package className="w-4 h-4" />;
      case 'document_submission': return <Calendar className="w-4 h-4" />;
      case 'fee_payment': return <Clock className="w-4 h-4" />;
      case 'inspection': return <AlertTriangle className="w-4 h-4" />;
      case 'response_required': return <User className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string, daysUntilDue: number) => {
    if (daysUntilDue < 0) return 'error'; // Overdue
    if (daysUntilDue <= 7) return 'error'; // Critical
    if (priority === 'high' || daysUntilDue <= 30) return 'warning';
    if (priority === 'medium') return 'info';
    return 'success';
  };

  const getPriorityText = (priority: string, daysUntilDue: number) => {
    if (daysUntilDue < 0) return 'Vencido';
    if (daysUntilDue <= 7) return 'Urgente';
    if (daysUntilDue <= 30) return 'Próximo';
    return priority === 'high' ? 'Alta' : priority === 'medium' ? 'Media' : 'Baja';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'info';
      case 'overdue': return 'error';
      case 'pending': return 'neutral';
      default: return 'neutral';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in_progress': return 'En Progreso';
      case 'overdue': return 'Vencido';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  if (isLoadingDeadlines) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-500" />
          Próximos Vencimientos
        </h3>
        <Badge variant="info">
          {upcomingDeadlines.filter(d => d.status !== 'completed').length} pendientes
        </Badge>
      </div>

      {sortedDeadlines.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No hay vencimientos próximos</p>
          <p className="text-sm">¡Excelente! Todos los deadlines están bajo control</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedDeadlines.map((deadline) => {
            const daysUntilDue = differenceInDays(new Date(deadline.dueDate), new Date());
            const isOverdue = daysUntilDue < 0;
            
            return (
              <div
                key={deadline.id}
                className={`p-4 rounded-lg border-l-4 ${
                  isOverdue ? 'border-red-500 bg-red-50' :
                  daysUntilDue <= 7 ? 'border-orange-500 bg-orange-50' :
                  daysUntilDue <= 30 ? 'border-yellow-500 bg-yellow-50' :
                  'border-green-500 bg-green-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getPriorityColor(deadline.priority, daysUntilDue) as any}>
                        {getDeadlineTypeIcon(deadline.deadlineType)}
                        {getPriorityText(deadline.priority, daysUntilDue)}
                      </Badge>
                      <Badge variant={getStatusColor(deadline.status) as any}>
                        {getStatusText(deadline.status)}
                      </Badge>
                      <Badge variant="neutral">
                        {deadline.countryName}
                      </Badge>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {deadline.title}
                    </h4>
                    
                    {deadline.productName && (
                      <p className="text-sm text-blue-600 mb-2 flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        {deadline.productName}
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {deadline.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Vence: {new Date(deadline.dueDate).toLocaleDateString('es-ES')}
                        </span>
                        <span className={`font-medium ${
                          isOverdue ? 'text-red-600' :
                          daysUntilDue <= 7 ? 'text-orange-600' :
                          'text-gray-600'
                        }`}>
                          {isOverdue 
                            ? `Vencido hace ${Math.abs(daysUntilDue)} días`
                            : daysUntilDue === 0 
                              ? 'Vence hoy'
                              : `${daysUntilDue} días restantes`
                          }
                        </span>
                      </div>
                      {deadline.assignedToName && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {deadline.assignedToName}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1"
                    >
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {upcomingDeadlines.filter(d => d.status !== 'completed').length > 6 && (
            <div className="text-center pt-4">
              <Button variant="secondary" size="sm">
                Ver todos los vencimientos ({upcomingDeadlines.filter(d => d.status !== 'completed').length})
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}; 