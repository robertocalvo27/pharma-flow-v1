import React from 'react';
import { Settings as SettingsIcon, Database, Globe } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const Settings: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-1">
          Configuración general del sistema y preferencias
        </p>
      </div>
      
      <Card>
        <div className="text-center py-12">
          <SettingsIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Configuración del Sistema
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Panel de configuración en desarrollo: configuración de países,
            agencias regulatorias, tipos de workflow y preferencias del sistema.
          </p>
        </div>
      </Card>
    </div>
  );
};