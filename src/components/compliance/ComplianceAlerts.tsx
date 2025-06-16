import React from 'react';
import { AlertTriangle, Clock, ExternalLink, Eye, Archive } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useComplianceStore } from '../../store/complianceStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const ComplianceAlerts: React.FC = () => {
  const { 
    complianceAlerts, 
    isLoadingAlerts, 
    markAlertAsRead, 
    archiveAlert 
  } = useComplianceStore();

  const unreadAlerts = complianceAlerts.filter(alert => !alert.isRead && !alert.isArchived);
  const displayAlerts = unreadAlerts.slice(0, 5); // Show only first 5

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'neutral';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
      case 'low':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return 'Crítica';
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return severity;
    }
  };

  const handleMarkAsRead = (alertId: string) => {
    markAlertAsRead(alertId);
  };

  const handleArchive = (alertId: string) => {
    archiveAlert(alertId);
  };

  if (isLoadingAlerts) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
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
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Alertas de Cumplimiento
        </h3>
        <Badge variant="info">
          {unreadAlerts.length} sin leer
        </Badge>
      </div>

      {displayAlerts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No hay alertas pendientes</p>
          <p className="text-sm">¡Excelente trabajo manteniendo el cumplimiento!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'critical' ? 'border-red-500 bg-red-50' :
                alert.severity === 'high' ? 'border-orange-500 bg-orange-50' :
                alert.severity === 'medium' ? 'border-blue-500 bg-blue-50' :
                'border-green-500 bg-green-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getSeverityColor(alert.severity) as any}>
                      {getSeverityIcon(alert.severity)}
                      {getSeverityText(alert.severity)}
                    </Badge>
                    <Badge variant="neutral">
                      {alert.agencyAcronym}
                    </Badge>
                    <Badge variant="neutral">
                      {alert.countryName}
                    </Badge>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {alert.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {formatDistanceToNow(new Date(alert.createdAt), { 
                        addSuffix: true, 
                        locale: es 
                      })}
                    </span>
                    {alert.deadline && (
                      <span className="font-medium text-orange-600">
                        Vence: {new Date(alert.deadline).toLocaleDateString('es-ES')}
                      </span>
                    )}
                  </div>
                  
                  {alert.actionRequired && (
                    <div className="mt-3 p-2 bg-white rounded border">
                      <p className="text-sm font-medium text-gray-700">
                        Acción requerida:
                      </p>
                      <p className="text-sm text-gray-600">
                        {alert.actionRequired}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-1 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkAsRead(alert.id)}
                    className="p-1"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleArchive(alert.id)}
                    className="p-1"
                  >
                    <Archive className="w-4 h-4" />
                  </Button>
                  {alert.sourceUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(alert.sourceUrl, '_blank')}
                      className="p-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {unreadAlerts.length > 5 && (
            <div className="text-center pt-4">
              <Button variant="secondary" size="sm">
                Ver todas las alertas ({unreadAlerts.length})
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}; 