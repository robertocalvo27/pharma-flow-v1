import React from 'react';
import { FileText, ExternalLink, Calendar, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useComplianceStore } from '../../store/complianceStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const RegulatoryUpdates: React.FC = () => {
  const { 
    regulatoryUpdates, 
    isLoadingUpdates 
  } = useComplianceStore();

  const recentUpdates = regulatoryUpdates.slice(0, 4); // Show only first 4

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case 'law_change': return 'error';
      case 'guideline_update': return 'info';
      case 'fee_change': return 'warning';
      case 'process_change': return 'success';
      case 'deadline_extension': return 'neutral';
      case 'new_requirement': return 'warning';
      default: return 'neutral';
    }
  };

  const getUpdateTypeText = (type: string) => {
    switch (type) {
      case 'law_change': return 'Cambio de Ley';
      case 'guideline_update': return 'Actualización de Guía';
      case 'fee_change': return 'Cambio de Tarifas';
      case 'process_change': return 'Cambio de Proceso';
      case 'deadline_extension': return 'Extensión de Plazo';
      case 'new_requirement': return 'Nuevo Requisito';
      default: return type;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getImpactText = (impact: string) => {
    switch (impact) {
      case 'high': return 'Alto Impacto';
      case 'medium': return 'Impacto Medio';
      case 'low': return 'Bajo Impacto';
      default: return impact;
    }
  };

  if (isLoadingUpdates) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
          <FileText className="w-5 h-5 text-blue-500" />
          Actualizaciones Regulatorias
        </h3>
        <Badge variant="info">
          {regulatoryUpdates.length} actualizaciones
        </Badge>
      </div>

      {recentUpdates.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No hay actualizaciones recientes</p>
          <p className="text-sm">Las actualizaciones aparecerán aquí cuando estén disponibles</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentUpdates.map((update) => (
            <div
              key={update.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getUpdateTypeColor(update.updateType) as any}>
                      {getUpdateTypeText(update.updateType)}
                    </Badge>
                    <Badge variant="neutral">
                      {update.agencyAcronym}
                    </Badge>
                    <Badge variant="neutral">
                      {update.countryName}
                    </Badge>
                    <span className={`text-xs font-medium ${getImpactColor(update.impactLevel)}`}>
                      {getImpactText(update.impactLevel)}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {update.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {update.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Publicado: {formatDistanceToNow(new Date(update.publishedDate), { 
                          addSuffix: true, 
                          locale: es 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Efectivo: {new Date(update.effectiveDate).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                  
                  {update.affectedCategories.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">
                        Categorías afectadas:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {update.affectedCategories.slice(0, 3).map((category, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded"
                          >
                            {category}
                          </span>
                        ))}
                        {update.affectedCategories.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                            +{update.affectedCategories.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-1 ml-4">
                  {update.sourceUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(update.sourceUrl, '_blank')}
                      className="p-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {regulatoryUpdates.length > 4 && (
            <div className="text-center pt-4">
              <Button variant="secondary" size="sm">
                Ver todas las actualizaciones ({regulatoryUpdates.length})
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}; 