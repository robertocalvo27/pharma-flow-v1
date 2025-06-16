import React from 'react';
import { BarChart3, TrendingUp, FileText } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const Reports: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes y Analytics</h1>
        <p className="text-gray-600 mt-1">
          Analíticas avanzadas y reportes regulatorios
        </p>
      </div>
      
      <Card>
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Reportes Avanzados
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Próximamente: dashboards interactivos, reportes regulatorios automáticos,
            métricas de rendimiento y exportación de datos.
          </p>
        </div>
      </Card>
    </div>
  );
};