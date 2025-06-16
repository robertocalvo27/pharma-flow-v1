import React from 'react';
import { FileText, Calendar, MapPin } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const Registrations: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Registros Sanitarios</h1>
        <p className="text-gray-600 mt-1">
          Gestiona los registros sanitarios por país y jurisdicción
        </p>
      </div>
      
      <Card>
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Módulo en Desarrollo
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Esta sección permitirá gestionar todos los registros sanitarios por país,
            incluyendo fechas de vencimiento, renovaciones y documentación asociada.
          </p>
        </div>
      </Card>
    </div>
  );
};